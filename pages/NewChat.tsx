
import React, { useState, useRef, useEffect } from 'react';
import { useChatSession } from '../hooks/useChatSession';
import { useVoiceSession } from '../hooks/useVoiceSession';
import { MODELS } from '../constants/chat';
import { EmptyState } from '../components/chat/EmptyState';
import { MessageItem } from '../components/chat/MessageItem';
import { InputArea } from '../components/chat/InputArea';
import { VoiceOverlay } from '../components/chat/VoiceOverlay';
import { TableDrawer } from '../components/table/TableDrawer';
import { ContextSuggestions } from '../components/chat/ContextSuggestions';
import { Attachment, TableData } from '../types/chat';
import { Plus, X, GripVertical, Upload } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { fileToDataUrl } from '../utils/fileHelpers';
import { parseCSV, parseJSON } from '../utils/tableUtils';

// --- Chat Session Component ---
interface ChatSessionProps {
  id: string;
  isActive: boolean;
  onTitleChange: (id: string, newTitle: string) => void;
  onExpandTable: (data: TableData, fileName: string, visualHint?: string) => void;
  initialData?: { name: string; data: TableData; source?: string };
}

const ChatSession: React.FC<ChatSessionProps> = ({ id, isActive, onTitleChange, onExpandTable, initialData }) => {
  const [query, setQuery] = useState('');
  const [selectedModel, setSelectedModel] = useState(MODELS[0]);
  const [useSearch, setUseSearch] = useState(false);
  const [isAnalyzeMode, setIsAnalyzeMode] = useState(false);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [hasRenamed, setHasRenamed] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  
  // Ref to track if we've ingested the initial data
  const hasIngestedData = useRef(false);

  const chat = useChatSession({ selectedModel, useSearch, isAnalyzeMode });
  const voice = useVoiceSession();

  // Handle Initial Data Ingestion
  useEffect(() => {
    if (initialData && !hasIngestedData.current) {
        hasIngestedData.current = true;
        
        // Auto-enable Analyst Mode for datasets
        setIsAnalyzeMode(true);
        
        // Convert TableData to Attachment
        const attachment: Attachment = {
            file: new File([], initialData.name), // Placeholder
            name: initialData.name,
            previewUrl: '',
            base64: '',
            mimeType: 'application/json',
            size: 0,
            tableData: initialData.data
        };

        // Send hidden/system prompt to load data and Trigger Consultative Mode
        chat.handleSend(
            `I have loaded the dataset "${initialData.name}". Please review the columns and act as a consultant. Do not run a full analysis yet. Instead, propose 4-5 specific analysis options based on the data structure and ask me what I would like to focus on.`, 
            [attachment]
        );
        
        // Update Title
        onTitleChange(id, `Analysis: ${initialData.name}`);
        setHasRenamed(true);
    }
  }, [initialData, chat, id, onTitleChange]);

  useEffect(() => {
      if (isActive) {
          endRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
  }, [chat.messages, chat.isGenerating, isActive]);

  // Auto-Summarize Title Logic
  useEffect(() => {
    const generateTitle = async () => {
        if (chat.messages.length >= 2 && !hasRenamed && !initialData) {
           const userMsg = chat.messages[0];
           const modelMsg = chat.messages[1];
           
           if (userMsg.role === 'user' && modelMsg.role === 'model' && !modelMsg.isStreaming) {
             setHasRenamed(true);
             try {
                const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
                const response = await ai.models.generateContent({
                   model: 'gemini-2.5-flash',
                   contents: `Summarize this user query into a very short, concise title (max 4 words). Do not use quotes. Query: "${userMsg.text}"`,
                });
                const title = response.text?.trim();
                if (title) {
                    onTitleChange(id, title);
                }
             } catch (e) {
                console.error("Failed to auto-summarize title", e);
                const fallbackTitle = userMsg.text.slice(0, 20) + (userMsg.text.length > 20 ? '...' : '');
                onTitleChange(id, fallbackTitle);
             }
           }
        }
    };
    generateTitle();
  }, [chat.messages, hasRenamed, id, onTitleChange, initialData]);

  const handleSuggestion = (prompt: string, modelId: string) => {
    setQuery(prompt);
    const model = MODELS.find(m => m.id === modelId);
    if (model) setSelectedModel(model);
  };

  const handleSend = async () => {
    // Capture current state
    const currentQuery = query;
    const currentAttachments = attachments;

    // Clear UI immediately for better UX
    setQuery('');
    setAttachments([]);

    // Trigger async send
    await chat.handleSend(currentQuery, currentAttachments);
  };

  const handleContextSuggestion = (suggestion: string) => {
    chat.handleSend(suggestion, []);
  };

  // --- Drag and Drop Handlers ---
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    // Only cancel drag if leaving the main container (not entering a child)
    if (e.currentTarget.contains(e.relatedTarget as Node)) return;
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const files = Array.from(e.dataTransfer.files);
      const newAttachments = await Promise.all(files.map(async (fileVal) => {
        const file = fileVal as File;
        const base64 = await fileToDataUrl(file);
        let tableData = undefined;

        // Parse Table Data if CSV or JSON
        if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
          const text = await file.text();
          tableData = parseCSV(text);
          // Auto-enable Analyst Mode on Drop
          setIsAnalyzeMode(true);
        } else if (file.type === 'application/json' || file.name.endsWith('.json')) {
           const text = await file.text();
           tableData = parseJSON(text);
           setIsAnalyzeMode(true);
        }

        return {
          file, 
          previewUrl: base64, 
          base64, 
          mimeType: file.type,
          name: file.name,
          size: file.size,
          tableData
        };
      }));
      setAttachments(prev => [...prev, ...newAttachments]);
    }
  };

  return (
    <div 
        className={`flex-col h-full relative bg-white dark:bg-[#212121] w-full ${isActive ? 'flex' : 'hidden'}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
    >
      {/* Drag & Drop Overlay - Minimalist */}
      {isDragging && (
         <div className="absolute inset-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-[2px] flex items-center justify-center transition-all duration-200 pointer-events-none">
            <div className="absolute inset-6 border-2 border-dashed border-gray-300 dark:border-[#333] rounded-3xl" />
            <div className="flex flex-col items-center justify-center animate-in zoom-in-95 duration-200">
                <div className="w-20 h-20 rounded-3xl bg-white dark:bg-[#1e1e1e] shadow-2xl border border-gray-100 dark:border-[#333] flex items-center justify-center mb-6">
                    <Upload size={32} className="text-gray-900 dark:text-white" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white tracking-tight">Drop files to add</h3>
            </div>
         </div>
      )}

      {voice.isActive && (
        <VoiceOverlay 
            status={voice.status} 
            audioLevel={voice.audioLevel} 
            isMuted={voice.isMuted} 
            onClose={voice.stopSession} 
            onToggleMic={voice.toggleMic} 
        />
      )}
      
      <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col items-center p-4 pb-24 w-full">
        {chat.messages.length === 0 ? (
          <EmptyState onSuggestionClick={handleSuggestion} />
        ) : (
          <div className="w-full flex flex-col pb-4">
            {chat.messages.map(msg => (
              <MessageItem 
                key={msg.id} 
                msg={msg} 
                onRerun={chat.handleRerun} 
                onFeedback={chat.toggleFeedback} 
                onExpandTable={onExpandTable}
              />
            ))}
            {chat.isGenerating && chat.messages[chat.messages.length - 1]?.role === 'user' && (
               <div className="max-w-3xl mx-auto px-4 py-6 w-full flex justify-start">
                   <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 px-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75" />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150" />
                   </div>
               </div>
            )}
            <div ref={endRef} />
          </div>
        )}
      </div>

      <div className="w-full z-10 bg-white dark:bg-[#212121]">
          <ContextSuggestions 
            suggestions={chat.suggestions} 
            onSelect={handleContextSuggestion}
            isLoading={chat.isSuggestionsLoading}
          />
          <InputArea
            query={query}
            setQuery={setQuery}
            onSend={handleSend}
            isGenerating={chat.isGenerating}
            onStartVoice={voice.startSession}
            selectedModel={selectedModel}
            setSelectedModel={setSelectedModel}
            useSearch={useSearch}
            setUseSearch={setUseSearch}
            isAnalyzeMode={isAnalyzeMode}
            setIsAnalyzeMode={setIsAnalyzeMode}
            attachments={attachments}
            setAttachments={setAttachments}
          />
      </div>
    </div>
  );
};

// --- Main Tab Manager Page ---
interface Tab {
    id: string;
    title: string;
}

interface NewChatProps {
  onChatUpdate: (id: string, title: string) => void;
  selectedChatId: string | null;
  incomingDataset?: {name: string, data: TableData, source: string} | null;
  onClearIncomingDataset: () => void;
}

export const NewChat = ({ onChatUpdate, selectedChatId, incomingDataset, onClearIncomingDataset }: NewChatProps) => {
  const [tabs, setTabs] = useState<Tab[]>([{ id: '1', title: 'New Chat' }]);
  const [activeTabId, setActiveTabId] = useState('1');
  const [tabData, setTabData] = useState<Record<string, {name: string, data: TableData, source?: string}>>({});
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Table Drawer State & Resizing
  const [isTableDrawerOpen, setIsTableDrawerOpen] = useState(false);
  const [activeTableData, setActiveTableData] = useState<TableData | null>(null);
  const [activeTableName, setActiveTableName] = useState('');
  const [activeVisualHint, setActiveVisualHint] = useState<string | undefined>(undefined);
  
  const [drawerWidth, setDrawerWidth] = useState(600); // Default width
  const resizerRef = useRef<{ startX: number, startWidth: number } | null>(null);

  // Watch for external selection (from Sidebar)
  useEffect(() => {
    if (selectedChatId) {
        const exists = tabs.find(t => t.id === selectedChatId);
        if (exists) {
            setActiveTabId(selectedChatId);
        } else {
            setTabs(prev => [...prev, { id: selectedChatId, title: 'Chat' }]);
            setActiveTabId(selectedChatId);
        }
    }
  }, [selectedChatId]);

  // Watch for incoming dataset
  useEffect(() => {
      if (incomingDataset) {
          const newId = Date.now().toString();
          setTabs(prev => [...prev, { id: newId, title: incomingDataset.name }]);
          setTabData(prev => ({ ...prev, [newId]: incomingDataset }));
          setActiveTabId(newId);
          onChatUpdate(newId, incomingDataset.name);
          onClearIncomingDataset();
          
          setTimeout(() => {
            if (scrollContainerRef.current) {
                scrollContainerRef.current.scrollLeft = scrollContainerRef.current.scrollWidth;
            }
          }, 0);
      }
  }, [incomingDataset, onChatUpdate, onClearIncomingDataset]);

  const createTab = () => {
    const newId = Date.now().toString();
    setTabs(prev => [...prev, { id: newId, title: 'New Chat' }]);
    setActiveTabId(newId);
    onChatUpdate(newId, 'New Chat');
    
    setTimeout(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollLeft = scrollContainerRef.current.scrollWidth;
        }
    }, 0);
  };

  const closeTab = (e: React.MouseEvent, id: string) => {
      e.stopPropagation();
      if (tabs.length === 1) {
          const newId = Date.now().toString();
          setTabs([{ id: newId, title: 'New Chat' }]);
          setActiveTabId(newId);
          return;
      }
      const newTabs = tabs.filter(t => t.id !== id);
      setTabs(newTabs);
      if (activeTabId === id) {
          setActiveTabId(newTabs[newTabs.length - 1].id);
      }
  };

  const updateTabTitle = (id: string, newTitle: string) => {
      setTabs(prev => prev.map(t => t.id === id ? { ...t, title: newTitle } : t));
      onChatUpdate(id, newTitle);
  };

  const handleExpandTable = (data: TableData, fileName: string, visualHint?: string) => {
      setActiveTableData(data);
      setActiveTableName(fileName);
      setActiveVisualHint(visualHint);
      setIsTableDrawerOpen(true);
  };

  const handleSaveTable = (newData: TableData) => {
      setActiveTableData(newData);
  };

  // Resize Handlers
  const startResizing = (e: React.MouseEvent) => {
      e.preventDefault();
      resizerRef.current = { startX: e.clientX, startWidth: drawerWidth };
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
  };

  const onMouseMove = (e: MouseEvent) => {
      if (!resizerRef.current) return;
      const { startX, startWidth } = resizerRef.current;
      const diff = startX - e.clientX; // Dragging left increases width
      let newWidth = startWidth + diff;
      
      // Limits
      if (newWidth < 300) newWidth = 300;
      // Cap at 65% of screen width to ensure chat remains visible
      const maxWidth = window.innerWidth * 0.65;
      if (newWidth > maxWidth) newWidth = maxWidth;
      
      setDrawerWidth(newWidth);
  };

  const onMouseUp = () => {
      resizerRef.current = null;
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
  };

  return (
    <div className="flex flex-col h-full w-full overflow-hidden bg-white dark:bg-[#212121] relative">
      
      {/* Minimal Header */}
      <div className="h-10 flex items-center px-4 bg-white dark:bg-[#212121] z-20 flex-shrink-0 select-none border-b border-gray-100 dark:border-[#333]">
        <div ref={scrollContainerRef} className="flex-1 flex items-center h-full overflow-x-auto no-scrollbar gap-1">
            {tabs.map(tab => {
                const isActive = activeTabId === tab.id;
                return (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`
                            group relative h-8 px-3 flex items-center justify-center min-w-[80px] max-w-[200px] cursor-pointer outline-none transition-colors duration-200 rounded-sm
                            ${isActive 
                                ? 'text-black dark:text-white font-bold bg-gray-100 dark:bg-[#2a2a2a]' 
                                : 'text-gray-500 dark:text-gray-400 font-medium hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#252525]'
                            }
                        `}
                    >
                        <span className="truncate text-xs pr-4">{tab.title}</span>
                        <div 
                            onClick={(e) => closeTab(e, tab.id)}
                            className={`
                                absolute right-1 p-0.5 text-gray-400 hover:text-red-500 transition-all rounded-full
                                ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
                            `}
                        >
                            <X size={10} strokeWidth={2} />
                        </div>
                    </button>
                );
            })}
            <button 
                onClick={createTab}
                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#2a2a2a] rounded-md transition-colors flex-shrink-0 ml-1"
                title="New Tab"
            >
                <Plus size={14} strokeWidth={2} />
            </button>
        </div>
      </div>

      {/* Split Content Area */}
      <div className="flex-1 flex overflow-hidden relative">
          {/* Chat Area - Resizes when Drawer is open */}
          <div className="flex-1 flex flex-col min-w-0 relative transition-all duration-300 ease-in-out">
             {tabs.map(tab => (
                <ChatSession 
                    key={tab.id} 
                    id={tab.id} 
                    isActive={activeTabId === tab.id} 
                    onTitleChange={updateTabTitle}
                    onExpandTable={handleExpandTable}
                    initialData={tabData[tab.id]}
                />
             ))}
          </div>

          {/* Table Drawer - Inline Mode */}
          {isTableDrawerOpen && (
              <>
                {/* Resizer Handle */}
                <div 
                   onMouseDown={startResizing}
                   className="w-1 h-full cursor-col-resize hover:bg-blue-500 active:bg-blue-600 bg-gray-200 dark:bg-[#333] z-30 flex items-center justify-center flex-shrink-0 transition-colors"
                >
                   <GripVertical size={12} className="text-gray-400 opacity-0 hover:opacity-100" />
                </div>

                {/* Drawer Container */}
                <div 
                    style={{ width: drawerWidth, maxWidth: '65vw' }} 
                    className="h-full flex-shrink-0 bg-white dark:bg-[#1e1e1e] shadow-xl border-l border-gray-200 dark:border-[#333] overflow-hidden"
                >
                   <TableDrawer 
                      isOpen={true} // Always true since we conditionally render the container
                      data={activeTableData}
                      fileName={activeTableName}
                      visualHint={activeVisualHint}
                      onClose={() => setIsTableDrawerOpen(false)}
                      onSave={handleSaveTable}
                      mode="inline" // Force inline rendering
                   />
                </div>
              </>
          )}
      </div>
    </div>
  );
};
