

import React, { useRef, useState, useEffect } from 'react';
import { ArrowUp, Mic, Plus, Bot, Brain, Globe, ChevronRight, ChevronLeft, Paperclip, Folder, Wand2, Loader2, Search, X } from 'lucide-react';
import { ModelOption, Attachment } from '../../types/chat';
import { MODELS } from '../../constants/chat';
import { MOCK_PROJECTS } from '../../constants';
import { fileToDataUrl } from '../../utils/fileHelpers';
import { parseCSV, parseJSON } from '../../utils/tableUtils';
import { AttachmentPreview } from './AttachmentPreview';
import { GoogleGenAI } from '@google/genai';

interface InputAreaProps {
  query: string;
  setQuery: (q: string) => void;
  onSend: () => void;
  isGenerating: boolean;
  onStartVoice: () => void;
  selectedModel: ModelOption;
  setSelectedModel: (m: ModelOption) => void;
  useSearch: boolean;
  setUseSearch: (b: boolean) => void;
  isAnalyzeMode: boolean;
  setIsAnalyzeMode: (b: boolean) => void;
  attachments: Attachment[];
  setAttachments: (atts: Attachment[]) => void;
}

// --- Sub-components for the Native Look ---

const ContextPill = ({ active, onClick, icon: Icon, label, className = '' }: any) => (
  <button 
    onClick={onClick} 
    className={`
      flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium transition-all select-none border
      ${active 
        ? 'bg-black dark:bg-white text-white dark:text-black border-transparent shadow-sm' 
        : 'bg-white dark:bg-[#2a2a2a] text-gray-500 dark:text-gray-400 border-gray-200 dark:border-[#333] hover:border-gray-300 dark:hover:border-[#444] hover:text-gray-900 dark:hover:text-gray-200'
      }
      ${className}
    `}
  >
    <Icon size={12} strokeWidth={active ? 2.5 : 2} className={label === "Polishing..." ? "animate-spin" : ""} />
    <span>{label}</span>
  </button>
);

const ActionButton = ({ onClick, icon: Icon, active, disabled, className = '' }: any) => (
  <button 
    onClick={onClick}
    disabled={disabled}
    className={`
      flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 active:scale-90
      ${active 
        ? 'bg-black dark:bg-white text-white dark:text-black shadow-md' 
        : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#333]'
      }
      ${disabled ? 'opacity-50 cursor-not-allowed hover:bg-transparent' : 'cursor-pointer'}
      ${className}
    `}
  >
    <Icon size={20} strokeWidth={2} />
  </button>
);

const MenuOption = ({ icon: Icon, label, subLabel, onClick, hasSubmenu, active, selected }: any) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors group
      ${active || selected ? 'bg-gray-100 dark:bg-[#333]' : 'hover:bg-gray-100 dark:hover:bg-[#333]'}
    `}
  >
    <div className="flex items-center gap-3 overflow-hidden">
      <div className={`flex-shrink-0 w-7 h-7 rounded-md flex items-center justify-center transition-colors ${selected ? 'bg-black dark:bg-white text-white dark:text-black' : 'bg-gray-100 dark:bg-[#252525] text-gray-500 dark:text-gray-400'}`}>
        <Icon size={14} strokeWidth={2} />
      </div>
      <div className="flex flex-col truncate min-w-0">
        <span className={`text-[13px] font-medium truncate leading-tight ${selected ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>{label}</span>
        {subLabel && <span className="text-[10px] text-gray-400 truncate leading-tight">{subLabel}</span>}
      </div>
    </div>
    {hasSubmenu && <ChevronRight size={14} className="text-gray-400 group-hover:translate-x-0.5 transition-transform" />}
    {selected && !hasSubmenu && <div className="w-1.5 h-1.5 rounded-full bg-black dark:bg-white mr-1"></div>}
  </button>
);

export const InputArea: React.FC<InputAreaProps> = (props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuView, setMenuView] = useState<'main' | 'models' | 'projects'>('main');
  const [isRewriting, setIsRewriting] = useState(false);
  
  const menuRef = useRef<HTMLDivElement>(null);
  const taRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Close menu on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => { 
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
        setTimeout(() => setMenuView('main'), 200); 
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Auto-resize Textarea
  useEffect(() => { 
    if (taRef.current) { 
      taRef.current.style.height = '24px'; 
      taRef.current.style.height = `${Math.min(taRef.current.scrollHeight, 160)}px`; 
    } 
  }, [props.query]);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files) as File[];
      const newAttachments = await Promise.all(files.map(async file => {
        const base64 = await fileToDataUrl(file);
        let tableData = undefined;
        if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
          const text = await file.text();
          tableData = parseCSV(text);
        } else if (file.type === 'application/json' || file.name.endsWith('.json')) {
           const text = await file.text();
           tableData = parseJSON(text);
        }
        return {
          file, previewUrl: base64, base64, mimeType: file.type, name: file.name, size: file.size, tableData
        };
      }));
      props.setAttachments([...props.attachments, ...newAttachments]);
      if (fileInputRef.current) fileInputRef.current.value = '';
      setIsMenuOpen(false);
    }
  };

  const handleRewrite = async () => {
    if (!props.query.trim() || isRewriting) return;
    setIsRewriting(true);
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Rewrite the following user input into a single, clear, direct, and professionally formatted paragraph suitable for an AI prompt. Do not add quotes, preambles, or explanations. Output only the refined prompt text. Text: "${props.query}"`,
        });
        if (response.text) props.setQuery(response.text.trim());
    } catch (e) { console.error(e); } 
    finally { setIsRewriting(false); }
  };

  const renderMenuContent = () => {
    if (menuView === 'main') {
      return (
        <div className="p-1.5 space-y-0.5">
          <MenuOption 
            icon={Paperclip} label="Attach File" subLabel="Document, Image, Data"
            onClick={() => fileInputRef.current?.click()}
          />
          <div className="h-px bg-gray-100 dark:bg-[#333] my-1 mx-2" />
          <MenuOption 
            icon={Bot} label="Model" subLabel={props.selectedModel.name} hasSubmenu
            onClick={() => setMenuView('models')}
          />
          <MenuOption 
            icon={Folder} label="Projects" subLabel="Reference context" hasSubmenu
            onClick={() => setMenuView('projects')}
          />
        </div>
      );
    }
    if (menuView === 'models') {
      return (
        <div className="p-1.5">
          <div className="flex items-center gap-2 px-2 py-2 mb-1 text-gray-900 dark:text-white">
            <button onClick={() => setMenuView('main')} className="p-1 -ml-1 hover:bg-gray-100 dark:hover:bg-[#333] rounded-md transition-colors">
              <ChevronLeft size={14} />
            </button>
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Models</span>
          </div>
          <div className="space-y-0.5">
            {MODELS.map(m => (
              <MenuOption 
                key={m.id} icon={Bot} label={m.name} subLabel={m.desc}
                selected={props.selectedModel.id === m.id}
                onClick={() => { props.setSelectedModel(m); setIsMenuOpen(false); setTimeout(() => setMenuView('main'), 200); }}
              />
            ))}
          </div>
        </div>
      );
    }
    if (menuView === 'projects') {
      return (
        <div className="p-1.5">
           <div className="flex items-center gap-2 px-2 py-2 mb-1 text-gray-900 dark:text-white">
            <button onClick={() => setMenuView('main')} className="p-1 -ml-1 hover:bg-gray-100 dark:hover:bg-[#333] rounded-md transition-colors">
              <ChevronLeft size={14} />
            </button>
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Projects</span>
          </div>
          <div className="max-h-48 overflow-y-auto space-y-0.5 custom-scrollbar">
            {MOCK_PROJECTS.map(p => (
              <MenuOption 
                key={p.id} icon={p.icon || Folder} label={p.name} subLabel={p.status}
                onClick={() => { props.setQuery(props.query + ` @[Project: ${p.name}] `); setIsMenuOpen(false); setTimeout(() => setMenuView('main'), 200); }}
              />
            ))}
          </div>
        </div>
      );
    }
  };

  const hasContent = props.query.trim().length > 0 || props.attachments.length > 0;

  return (
    <div className="w-full px-4 pb-6 pt-2 z-10 bg-white/90 dark:bg-[#212121]/90 backdrop-blur-md transition-colors">
      <div className="max-w-3xl mx-auto relative">
        <input type="file" multiple ref={fileInputRef} onChange={handleFileSelect} className="hidden" />

        {/* Floating Context Pills Row */}
        <div className="flex items-center justify-center gap-2 mb-3 animate-in fade-in slide-in-from-bottom-1 duration-300">
           <ContextPill 
              active={props.isAnalyzeMode} 
              onClick={() => props.setIsAnalyzeMode(!props.isAnalyzeMode)} 
              icon={props.isAnalyzeMode ? Brain : Bot} 
              label={props.isAnalyzeMode ? "Analyst Mode" : "Chat Mode"} 
           />
           <ContextPill 
              active={props.useSearch} 
              onClick={() => props.setUseSearch(!props.useSearch)} 
              icon={Globe} 
              label="Web Search" 
           />
           {hasContent && (
             <ContextPill 
                active={false} 
                onClick={handleRewrite} 
                icon={isRewriting ? Loader2 : Wand2} 
                label={isRewriting ? "Polishing..." : "Polish"}
             />
           )}
        </div>
        
        {/* Main Input Bar */}
        <div className="flex items-end gap-2 relative">
          
          {/* Left Action: Plus Menu */}
          <div className="relative flex-shrink-0 mb-1">
             {isMenuOpen && (
               <div ref={menuRef} className="absolute bottom-full left-0 mb-2 w-64 bg-white dark:bg-[#1f1f1f] rounded-xl shadow-2xl border border-gray-200 dark:border-[#333] z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-bottom-left">
                 {renderMenuContent()}
               </div>
             )}
             <ActionButton 
                onClick={() => setIsMenuOpen(!isMenuOpen)} 
                icon={Plus} 
                active={isMenuOpen}
                className="bg-gray-100 dark:bg-[#333] text-gray-500 dark:text-gray-300"
             />
          </div>

          {/* Center: Text Field Pill */}
          <div className="flex-1 bg-[#f2f2f2] dark:bg-[#2C2C2C] rounded-[26px] px-4 py-2.5 min-h-[44px] flex flex-col justify-center border border-transparent focus-within:border-gray-300 dark:focus-within:border-[#444] transition-all duration-200">
            
            <AttachmentPreview attachments={props.attachments} onRemove={(i) => props.setAttachments(props.attachments.filter((_, idx) => idx !== i))} />
            
            <textarea 
              ref={taRef} 
              value={props.query} 
              onChange={e => props.setQuery(e.target.value)} 
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); props.onSend(); } }} 
              placeholder={`Message ${props.selectedModel.name}...`}
              className="w-full bg-transparent border-none focus:ring-0 resize-none text-[15px] text-gray-900 dark:text-white placeholder-gray-500 leading-relaxed p-0 m-0 max-h-[160px] overflow-y-auto no-scrollbar" 
              rows={1} 
            />
          </div>

          {/* Right Actions: Voice & Send */}
          <div className="flex items-end gap-2 mb-1 flex-shrink-0">
             {!hasContent && (
                 <ActionButton 
                    onClick={props.onStartVoice} 
                    icon={Mic}
                 />
             )}
             <ActionButton 
                onClick={props.onSend}
                active={hasContent && !props.isGenerating}
                disabled={(!hasContent) || props.isGenerating}
                icon={props.isGenerating ? Loader2 : ArrowUp}
                className={props.isGenerating ? "animate-spin" : ""}
             />
          </div>

        </div>
        
        <div className="text-center mt-2">
          <p className="text-[10px] text-gray-400 dark:text-gray-600 font-medium tracking-wide">Auxiliary can make mistakes. Check important info.</p>
        </div>
      </div>
    </div>
  );
};