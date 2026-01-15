/**
 * NewChat.tsx
 * 
 * Purpose: 
 * The core chat interface manager. It handles:
 * 1. Multi-tab chat sessions (NewChat component).
 * 2. Individual chat session logic (ChatSession component).
 * 3. File drag-and-drop for data analysis.
 * 4. Integration with the Table Drawer for data visualization.
 * 
 * Outline:
 * - ChatSession: Renders a single active chat context, managing messages, inputs, and AI interactions.
 * - NewChat: Manages the list of active chat tabs and the shared TableDrawer state.
 */

'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useChatSession } from '../hooks/useChatSession';
import { useVoiceSession } from '../hooks/useVoiceSession';
import { MODELS } from '../constants/chat';
import { EmptyState } from './chat/EmptyState';
import { MessageItem } from './chat/MessageItem';
import { InputArea } from './chat/InputArea';
import { VoiceOverlay } from './chat/VoiceOverlay';
import { TableDrawer } from './table/TableDrawer';
import { ContextSuggestions } from './chat/ContextSuggestions';
import { Attachment, TableData } from '../types/chat';
import { Plus, X, GripVertical, Upload, ChevronLeft, ChevronRight } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { fileToDataUrl } from '../utils/fileHelpers';
import { parseCSV, parseJSON } from '../utils/tableUtils';

// --- Chat Session Component ---
interface ChatSessionProps {
    id: string;
    isActive: boolean;
    onTitleChange: (id: string, newTitle: string) => void;
    onExpandTable: (data: TableData, fileName: string, visualHint?: string, msgId?: string) => void;
    initialData?: { name: string; data: TableData; source?: string };
    lastDrawerUpdate?: { data: TableData; msgId?: string };
}

/**
 * ChatSession
 * 
 * Represents a single conversation thread.
 * Handles:
 * - Message history (via useChatSession)
 * - File attachments (drag & drop)
 * - Voice input (via useVoiceSession)
 * - Auto-titling of new chats
 */
const ChatSession: React.FC<ChatSessionProps> = ({ id, isActive, onTitleChange, onExpandTable, initialData, lastDrawerUpdate }) => {
    const [query, setQuery] = useState('');
    const [selectedModel, setSelectedModel] = useState(MODELS[0]);
    const [useSearch, setUseSearch] = useState(false);
    const [isAnalyzeMode, setIsAnalyzeMode] = useState(false);
    const [attachments, setAttachments] = useState<Attachment[]>([]);
    const [hasRenamed, setHasRenamed] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const endRef = useRef<HTMLDivElement>(null);

    const hasIngestedData = useRef(false);

    const chat = useChatSession({ selectedModel, useSearch, isAnalyzeMode });
    const voice = useVoiceSession();

    // Sync drawer updates back to chat messages without triggering a full remount
    useEffect(() => {
        if (lastDrawerUpdate && lastDrawerUpdate.msgId) {
            chat.setMessages(prev => prev.map(m => {
                if (m.id === lastDrawerUpdate.msgId) {
                    // Shallow compare to avoid unnecessary nested updates
                    if (m.executionResults?.[0]?.data === lastDrawerUpdate.data) return m;

                    if (m.executionResult && m.executionResult.type === 'table') {
                        return { ...m, executionResult: { ...m.executionResult, data: lastDrawerUpdate.data } };
                    }
                    if (m.executionResults) {
                        const updatedResults = { ...m.executionResults };
                        if (updatedResults[0]) updatedResults[0] = { ...updatedResults[0], data: lastDrawerUpdate.data };
                        return { ...m, executionResults: updatedResults };
                    }
                }
                return m;
            }));
        }
    }, [lastDrawerUpdate]);

    // Initialize with data if provided (e.g. from "Ask AI" on a dataset)
    useEffect(() => {
        if (initialData && !hasIngestedData.current) {
            hasIngestedData.current = true;
            setIsAnalyzeMode(true);
            const attachment: Attachment = {
                file: new File([], initialData.name),
                name: initialData.name,
                previewUrl: '',
                base64: '',
                mimeType: 'application/json',
                size: 0,
                tableData: initialData.data
            };
            chat.handleSend(
                `I have loaded the dataset "${initialData.name}". Please review the columns and act as a consultant. Do not run a full analysis yet. Instead, propose 4-5 specific analysis options based on the data structure and ask me what I would like to focus on.`,
                [attachment]
            );
            onTitleChange(id, `Analysis: ${initialData.name}`);
            setHasRenamed(true);
        }
    }, [initialData, chat, id, onTitleChange]);

    // Scroll to bottom when new messages arrive or when switching back to this tab
    useEffect(() => {
        if (isActive) {
            endRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [chat.messages, chat.isGenerating, isActive]);

    // Auto-Summarize Title using Gemini
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
                            model: 'gemini-3-flash-preview',
                            contents: `Summarize this user query into a very short title (max 3 words). No quotes. Text: "${userMsg.text}"`,
                        });
                        const title = response.text?.trim();
                        if (title) onTitleChange(id, title);
                    } catch (e) {
                        onTitleChange(id, userMsg.text.slice(0, 20) + '...');
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
        const currentQuery = query;
        const currentAttachments = attachments;
        setQuery('');
        setAttachments([]);
        await chat.handleSend(currentQuery, currentAttachments);
    };

    // Drag and drop handlers
    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
            setIsDragging(false);
        }
    }, []);

    const handleDrop = useCallback(async (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const files = Array.from(e.dataTransfer.files);
            const newAttachments = await Promise.all(files.map(async (f: File) => {
                const base64 = await fileToDataUrl(f);
                let tableData = undefined;
                if (f.type === 'text/csv' || f.name.endsWith('.csv')) tableData = parseCSV(await f.text());
                else if (f.type === 'application/json' || f.name.endsWith('.json')) tableData = parseJSON(await f.text());
                if (tableData) setIsAnalyzeMode(true);
                return { file: f, previewUrl: base64, base64, mimeType: f.type, name: f.name, size: f.size, tableData };
            }));
            setAttachments(prev => [...prev, ...newAttachments]);
        }
    }, []);

    return (
        <div
            className={`flex-col h-full relative bg-white dark:bg-[#212121] w-full ${isActive ? 'flex' : 'hidden'}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            {isDragging && (
                <div className="absolute inset-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-[2px] flex items-center justify-center transition-all duration-200 pointer-events-none p-10">
                    <div className="w-full h-full border-2 border-dashed border-indigo-500 rounded-3xl flex flex-col items-center justify-center bg-indigo-50/10">
                        <div className="w-20 h-20 rounded-3xl bg-white dark:bg-[#1e1e1e] shadow-2xl flex items-center justify-center mb-6">
                            <Upload size={32} className="text-indigo-600" strokeWidth={2} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">Drop data to analyze</h3>
                    </div>
                </div>
            )}

            {voice.isActive && (
                <VoiceOverlay status={voice.status} audioLevel={voice.audioLevel} isMuted={voice.isMuted} onClose={voice.stopSession} onToggleMic={voice.toggleMic} />
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
                                onExpandTable={(data, name, hint) => onExpandTable(data, name, hint, msg.id)}
                            />
                        ))}
                        {chat.isGenerating && chat.messages[chat.messages.length - 1]?.role === 'user' && (
                            <div className="max-w-3xl mx-auto px-4 py-6 w-full flex justify-start">
                                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 px-2">
                                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" />
                                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce delay-100" />
                                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce delay-200" />
                                </div>
                            </div>
                        )}
                        <div ref={endRef} />
                    </div>
                )}
            </div>

            <div className="w-full z-10 bg-white dark:bg-[#212121]">
                <ContextSuggestions suggestions={chat.suggestions} onSelect={(s) => chat.handleSend(s, [])} isLoading={chat.isSuggestionsLoading} />
                <InputArea
                    query={query} setQuery={setQuery} onSend={handleSend} isGenerating={chat.isGenerating} onStartVoice={voice.startSession}
                    selectedModel={selectedModel} setSelectedModel={setSelectedModel} useSearch={useSearch} setUseSearch={setUseSearch}
                    isAnalyzeMode={isAnalyzeMode} setIsAnalyzeMode={setIsAnalyzeMode} attachments={attachments} setAttachments={setAttachments}
                />
            </div>
        </div>
    );
};

// --- Main Tab Manager ---
/**
 * NewChat Component
 * 
 * Manages multiple ChatSession tabs and the shared TableDrawer.
 */
export const NewChat = ({ onChatUpdate, selectedChatId, incomingDataset, onClearIncomingDataset }: any) => {
    const [tabs, setTabs] = useState<any[]>([{ id: '1', title: 'New Chat' }]);
    const [activeTabId, setActiveTabId] = useState('1');
    const [tabData, setTabData] = useState<Record<string, any>>({});
    const [drawerUpdate, setDrawerUpdate] = useState<Record<string, { data: TableData, msgId?: string }>>({});

    const [draggedTabIndex, setDraggedTabIndex] = useState<number | null>(null);
    const [hoveredTabId, setHoveredTabId] = useState<string | null>(null);

    const [isTableDrawerOpen, setIsTableDrawerOpen] = useState(false);
    const [activeTableData, setActiveTableData] = useState<TableData | null>(null);
    const [activeTableName, setActiveTableName] = useState('');
    const [activeVisualHint, setActiveVisualHint] = useState<string | undefined>(undefined);
    const [activeMsgId, setActiveMsgId] = useState<string | undefined>(undefined);

    const [drawerWidth, setDrawerWidth] = useState(600);
    const resizerRef = useRef<any>(null);

    const [editingTabId, setEditingTabId] = useState<string | null>(null);
    const [editingTitle, setEditingTitle] = useState('');

    // Sync selected tab with global state selection
    useEffect(() => {
        if (selectedChatId) setActiveTabId(selectedChatId);
    }, [selectedChatId]);

    // Handle incoming datasets (e.g. from file upload elsewhere)
    useEffect(() => {
        if (incomingDataset) {
            const newId = Date.now().toString();
            setTabs(prev => [...prev, { id: newId, title: incomingDataset.name }]);
            setTabData(prev => ({ ...prev, [newId]: incomingDataset }));
            setActiveTabId(newId);
            onChatUpdate(newId, incomingDataset.name);
            onClearIncomingDataset();
        }
    }, [incomingDataset]);

    const handleExpandTable = useCallback((data: TableData, fileName: string, visualHint?: string, msgId?: string) => {
        setActiveTableData(data);
        setActiveTableName(fileName);
        setActiveVisualHint(visualHint);
        setActiveMsgId(msgId);
        setIsTableDrawerOpen(true);
    }, []);

    const handleSaveTable = useCallback((newData: TableData) => {
        // Use ref-like comparison logic in ChatSession to avoid unnecessary cycles
        setDrawerUpdate(prev => ({ ...prev, [activeTabId]: { data: newData, msgId: activeMsgId } }));
    }, [activeTabId, activeMsgId]);

    const handleTitleSubmit = (id: string) => {
        if (editingTitle.trim()) {
            setTabs(tabs.map(t => t.id === id ? { ...t, title: editingTitle } : t));
            onChatUpdate(id, editingTitle);
        }
        setEditingTabId(null);
    };

    // Tab reordering logic
    const handleTabDragStart = (idx: number) => {
        setDraggedTabIndex(idx);
    };

    const handleTabDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const handleTabDrop = (idx: number) => {
        if (draggedTabIndex === null || draggedTabIndex === idx) return;
        const newTabs = [...tabs];
        const [movedTab] = newTabs.splice(draggedTabIndex, 1);
        newTabs.splice(idx, 0, movedTab);
        setTabs(newTabs);
        setDraggedTabIndex(null);
    };

    // Extracted resize logic for cleanliness
    const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        resizerRef.current = { startX: e.clientX, startWidth: drawerWidth };

        const move = (me: MouseEvent) => {
            const newWidth = resizerRef.current.startWidth + (resizerRef.current.startX - me.clientX);
            setDrawerWidth(Math.max(300, Math.min(window.innerWidth * 0.7, newWidth)));
        };

        const up = () => {
            document.removeEventListener('mousemove', move);
            document.removeEventListener('mouseup', up);
        };

        document.addEventListener('mousemove', move);
        document.addEventListener('mouseup', up);
    };

    return (
        <div className="flex flex-col h-full w-full overflow-hidden bg-white dark:bg-[#212121] relative">
            {/* Tab Bar - Seamless Browser Style */}
            <div className="h-14 bg-white dark:bg-[#212121] border-b border-gray-100 dark:border-[#2a2a2a] flex items-end px-4 z-20 flex-shrink-0">
                <div className="flex items-center h-full overflow-x-auto no-scrollbar gap-0">
                    {tabs.map((tab, idx) => (
                        <div
                            key={tab.id}
                            className={`relative flex items-end h-[46px] ${draggedTabIndex === idx ? 'opacity-40' : ''}`}
                            draggable
                            onDragStart={() => handleTabDragStart(idx)}
                            onDragOver={handleTabDragOver}
                            onDrop={() => handleTabDrop(idx)}
                            onMouseEnter={() => setHoveredTabId(tab.id)}
                            onMouseLeave={() => setHoveredTabId(null)}
                        >
                            <div
                                onClick={() => setActiveTabId(tab.id)}
                                onDoubleClick={() => {
                                    setEditingTabId(tab.id);
                                    setEditingTitle(tab.title);
                                }}
                                className={`
                                    group relative h-[38px] flex items-center gap-3 cursor-pointer outline-none transition-all duration-300 ease-in-out
                                    ${activeTabId === tab.id
                                        ? 'text-black dark:text-white font-semibold bg-white dark:bg-[#212121] tab-active rounded-t-xl z-20 px-8 border-t border-x border-gray-100 dark:border-white/5 mb-[-1px]'
                                        : 'text-gray-500 dark:text-gray-400 font-medium hover:text-gray-700 dark:hover:text-gray-200 px-6 z-10 tab-inactive rounded-t-lg h-[34px] mb-1'}
                                `}
                            >
                                {/* Inactive shadow overlay for depth */}
                                {activeTabId !== tab.id && <div className="tab-inactive-shadow" />}

                                {editingTabId === tab.id ? (
                                    <input
                                        autoFocus
                                        value={editingTitle}
                                        onChange={(e) => setEditingTitle(e.target.value)}
                                        onBlur={() => handleTitleSubmit(tab.id)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleTitleSubmit(tab.id)}
                                        className="bg-transparent border-none outline-none text-[11px] font-bold uppercase tracking-[0.15em] w-32 focus:ring-0"
                                        onClick={(e) => e.stopPropagation()}
                                    />
                                ) : (
                                    <span className={`truncate text-[11px] font-bold uppercase tracking-[0.15em] transition-opacity duration-300 ${activeTabId === tab.id ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'}`}>
                                        {tab.title}
                                    </span>
                                )}

                                {tabs.length > 1 && (activeTabId === tab.id || hoveredTabId === tab.id) && (
                                    <button
                                        onClick={(e) => { e.stopPropagation(); setTabs(tabs.filter(t => t.id !== tab.id)); }}
                                        className={`
                                            flex items-center justify-center w-5 h-5 rounded-full transition-all duration-200
                                            bg-transparent hover:bg-gray-200/50 dark:hover:bg-white/10
                                            text-gray-400 hover:text-gray-900 dark:hover:text-white
                                            scale-90 hover:scale-100
                                        `}
                                    >
                                        <X size={12} strokeWidth={2.5} />
                                    </button>
                                )}
                            </div>
                            {/* Seamless vertical separators for inactive tabs */}
                            {activeTabId !== tab.id && activeTabId !== tabs[idx + 1]?.id && idx < tabs.length - 1 && (
                                <div className="h-5 w-px bg-gray-300 dark:bg-gray-700/50 mb-3 mx-[-1px]" />
                            )}
                        </div>
                    ))}

                    <button
                        onClick={() => { const id = Date.now().toString(); setTabs([...tabs, { id, title: 'New Chat' }]); setActiveTabId(id); }}
                        className="flex items-center justify-center w-8 h-8 rounded-full text-[#667681] dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10 hover:text-black dark:hover:text-white transition-all duration-300 ml-2 mb-1"
                        title="New Chat"
                    >
                        <Plus size={18} strokeWidth={2.5} />
                    </button>
                </div>
            </div>

            {/* Chat Content Area */}
            <div className="flex-1 flex overflow-hidden relative">
                <div className="flex-1 flex flex-col min-w-0 relative">
                    {tabs.map(tab => (
                        <ChatSession
                            key={tab.id} id={tab.id} isActive={activeTabId === tab.id}
                            onTitleChange={(id, title) => { setTabs(tabs.map(t => t.id === id ? { ...t, title } : t)); onChatUpdate(id, title); }}
                            onExpandTable={handleExpandTable} initialData={tabData[tab.id]}
                            lastDrawerUpdate={drawerUpdate[tab.id]}
                        />
                    ))}
                </div>

                {/* Resizable Table Drawer Side Panel */}
                {isTableDrawerOpen && (
                    <>
                        <div onMouseDown={handleMouseDown} className="w-1.5 h-full cursor-col-resize hover:bg-indigo-500 active:bg-indigo-600 bg-gray-200 dark:bg-[#333] z-30 flex-shrink-0 transition-colors" />
                        <div style={{ width: drawerWidth }} className="h-full flex-shrink-0 bg-white dark:bg-[#1e1e1e] shadow-2xl border-l border-gray-200 dark:border-[#333] overflow-hidden">
                            <TableDrawer isOpen={true} data={activeTableData} fileName={activeTableName} visualHint={activeVisualHint} onClose={() => setIsTableDrawerOpen(false)} onSave={handleSaveTable} mode="inline" />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
