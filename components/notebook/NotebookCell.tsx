import React from 'react';
import {
    Play, Plus, Trash2, GripVertical, ChevronDown,
    RotateCw, Check, AlertCircle, Code2, Type, Search, Database, BarChart3, PenLine, Terminal, FileText,
    Lock, Unlock, MoreVertical, ArrowUp, ArrowDown, Split, Copy
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import { NotebookCell as NotebookCellType } from '../../types';
import { TableData } from '../../types/chat';
import { EmbeddedTable } from '../chat/EmbeddedTable';
import { ChatChart } from '../chat/ChatChart';
import { textBlockTypes } from './constants';

interface NotebookCellProps {
    cell: NotebookCellType;
    index: number;
    isActive: boolean;
    draggedIndex: number | null;
    activeTextDropdownId: string | null;
    activeSlashMenuId: string | null;
    textSearchQuery: string;
    onSetActive: (id: string) => void;
    onRun: (id: string) => void;
    onUpdate: (id: string, content: string) => void;
    onDelete: (id: string) => void;
    onSplit: (id: string, cursor: number) => void;
    onAdd: (type: 'code' | 'markdown', afterId?: string, content?: string) => void;
    onDragStart: (e: React.DragEvent, index: number) => void;
    onDragOver: (e: React.DragEvent) => void;
    onDragEnd: () => void;
    onDrop: (e: React.DragEvent, index: number) => void;
    onToggleDropdown: (id: string) => void;
    onSlashMenu: (id: string | null) => void;
    onSetSearchQuery: (q: string) => void;
    onSetLastSelectedPrefix: (p: string) => void;
    onMove: (id: string, direction: 'up' | 'down') => void;
    onConvert: (id: string, type: 'code' | 'markdown') => void;
    onRunAll: (direction: 'above' | 'below', id: string) => void;
    onToggleLock: (id: string) => void;
    onDuplicate: (id: string) => void;
}

export const NotebookCell: React.FC<NotebookCellProps> = ({
    cell, index, isActive, draggedIndex, activeTextDropdownId, activeSlashMenuId, textSearchQuery,
    onSetActive, onRun, onUpdate, onDelete, onSplit, onAdd,
    onDragStart, onDragOver, onDragEnd, onDrop,
    onToggleDropdown, onSlashMenu, onSetSearchQuery, onSetLastSelectedPrefix,
    onMove, onConvert, onRunAll, onToggleLock, onDuplicate
}) => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [slashSelectedIndex, setSlashSelectedIndex] = React.useState(0);
    const menuRef = React.useRef<HTMLDivElement>(null);
    const slashMenuRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Reset selection when query or menu visibility changes
    React.useEffect(() => {
        setSlashSelectedIndex(0);
    }, [textSearchQuery, activeSlashMenuId]);

    const filteredSlashItems = textBlockTypes.filter(b => b.label.toLowerCase().includes(textSearchQuery.toLowerCase()));

    // Auto-scroll to selected slash item
    React.useEffect(() => {
        if (activeSlashMenuId === cell.id && slashMenuRef.current && filteredSlashItems.length > 0) {
            const menuContainer = slashMenuRef.current;
            const selectedElement = menuContainer.children[0]?.children[slashSelectedIndex] as HTMLElement;
            if (selectedElement) {
                const menuTop = menuContainer.scrollTop;
                const menuBottom = menuTop + menuContainer.clientHeight;
                const elTop = selectedElement.offsetTop;
                const elBottom = elTop + selectedElement.clientHeight;

                if (elTop < menuTop) {
                    menuContainer.scrollTop = elTop;
                } else if (elBottom > menuBottom) {
                    menuContainer.scrollTop = elBottom - menuContainer.clientHeight;
                }
            }
        }
    }, [slashSelectedIndex, activeSlashMenuId, cell.id, filteredSlashItems.length]);

    const CellMenu = () => (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#333] rounded-xl shadow-xl z-[100] animate-in fade-in zoom-in-95 duration-200 overflow-hidden ring-1 ring-black/5">
            <div className="p-1">
                <button onClick={() => { onMove(cell.id, 'up'); setIsMenuOpen(false); }} className="w-full text-left px-3 py-2 text-xs text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#2a2a2a] rounded-lg flex items-center gap-2">
                    <ArrowUp size={14} /> Move Up
                </button>
                <button onClick={() => { onMove(cell.id, 'down'); setIsMenuOpen(false); }} className="w-full text-left px-3 py-2 text-xs text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#2a2a2a] rounded-lg flex items-center gap-2">
                    <ArrowDown size={14} /> Move Down
                </button>
                <div className="my-1 border-b border-gray-100 dark:border-[#2f2f2f]" />
                <button onClick={() => { onConvert(cell.id, cell.type === 'code' ? 'markdown' : 'code'); setIsMenuOpen(false); }} className="w-full text-left px-3 py-2 text-xs text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#2a2a2a] rounded-lg flex items-center gap-2">
                    {cell.type === 'code' ? <FileText size={14} /> : <Code2 size={14} />}
                    Convert to {cell.type === 'code' ? 'Text' : 'Code'}
                </button>
                <button onClick={() => { onSplit(cell.id, 0); setIsMenuOpen(false); }} className="w-full text-left px-3 py-2 text-xs text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#2a2a2a] rounded-lg flex items-center gap-2">
                    <Split size={14} /> Split Cell
                </button>
                <button onClick={() => { onDuplicate(cell.id); setIsMenuOpen(false); }} className="w-full text-left px-3 py-2 text-xs text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#2a2a2a] rounded-lg flex items-center gap-2">
                    <Copy size={14} /> Duplicate
                </button>
                <div className="my-1 border-b border-gray-100 dark:border-[#2f2f2f]" />
                <button onClick={() => { onRun(cell.id); setIsMenuOpen(false); }} className="w-full text-left px-3 py-2 text-xs text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#2a2a2a] rounded-lg flex items-center gap-2">
                    <Play size={14} /> Run
                </button>
                <button onClick={() => { onRunAll('above', cell.id); setIsMenuOpen(false); }} className="w-full text-left px-3 py-2 text-xs text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#2a2a2a] rounded-lg flex items-center gap-2">
                    <ArrowUp size={14} className="rotate-180" /> Run Above
                </button>
                <button onClick={() => { onRunAll('below', cell.id); setIsMenuOpen(false); }} className="w-full text-left px-3 py-2 text-xs text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#2a2a2a] rounded-lg flex items-center gap-2">
                    <ArrowDown size={14} /> Run Below
                </button>
            </div>
        </div>
    );

    const adjustHeight = (el: HTMLTextAreaElement) => {
        el.style.height = 'auto';
        el.style.height = el.scrollHeight + 'px';
    };

    return (
        <div
            className={`group relative mb-6 transition-all duration-300 ${draggedIndex === index ? 'opacity-40 scale-95' : 'opacity-100 scale-100'} ${activeTextDropdownId === cell.id || isMenuOpen || activeSlashMenuId === cell.id ? 'z-[100]' : 'z-10'}`}
            onClick={() => onSetActive(cell.id)}
            draggable
            onDragStart={(e) => onDragStart(e, index)}
            onDragOver={(e) => onDragOver(e)}
            onDragEnd={onDragEnd}
            onDrop={(e) => onDrop(e, index)}
        >
            {/* Cell Gutter Actions (Desktop) */}
            <div className="hidden md:flex absolute -left-12 top-0 bottom-0 w-10 flex-col items-center pt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                    onClick={(e) => { e.stopPropagation(); onRun(cell.id); }}
                    className={`p-2 rounded-lg bg-gray-100 dark:bg-[#333] hover:bg-green-500 hover:text-white transition-all mb-2 ${cell.status === 'running' ? 'text-green-600' : 'text-gray-400'}`}
                    title="Run cell"
                >
                    {cell.status === 'running' ? <RotateCw size={14} className="animate-spin" /> : <Play size={14} fill="currentColor" />}
                </button>
                <div
                    className="p-1.5 text-gray-300 hover:text-gray-600 dark:hover:text-gray-300 cursor-grab active:cursor-grabbing"
                    title="Drag to move"
                >
                    <GripVertical size={14} />
                </div>
            </div>

            {/* Main Cell Content */}
            <div className={`
                relative rounded-xl border transition-all duration-200
                ${isActive
                    ? 'border-gray-300 dark:border-gray-600 bg-white dark:bg-[#252525] shadow-sm'
                    : 'border-transparent hover:border-gray-200 dark:hover:border-[#333] bg-transparent'
                }
            `}>

                {/* Input Area */}
                {cell.type === 'code' ? (
                    <div className={`bg-[#f5f5f7] dark:bg-[#1a1a1a] rounded-xl border border-gray-200 dark:border-[#333] transition-all duration-500 ${isActive ? 'animate-in fade-in slide-in-from-top-2' : ''}`}>
                        <div className="flex items-center justify-between px-3 py-1.5 border-b border-gray-200 dark:border-[#333] bg-gray-50/50 dark:bg-[#2a2a2a] rounded-t-xl">
                            <span className="text-[10px] font-mono text-gray-400">In [{index + 1}]:</span>
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={() => onToggleLock(cell.id)}
                                    className={`p-1.5 rounded-md transition-colors ${cell.isLocked ? 'text-amber-500 bg-amber-50 dark:bg-amber-900/20' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`}
                                    title={cell.isLocked ? "Unlock cell" : "Lock cell"}
                                >
                                    {cell.isLocked ? <Lock size={13} /> : <Unlock size={13} />}
                                </button>

                                <button
                                    onClick={() => onDelete(cell.id)}
                                    className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
                                    title="Delete cell"
                                >
                                    <Trash2 size={13} />
                                </button>
                                <div className="relative" ref={menuRef}>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); setIsMenuOpen(!isMenuOpen); }}
                                        className={`p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors ${isMenuOpen ? 'bg-blue-50 text-blue-500 dark:bg-blue-900/20' : ''}`}
                                    >
                                        <MoreVertical size={13} />
                                    </button>
                                    {isMenuOpen && <CellMenu />}
                                </div>
                            </div>
                        </div>
                        <div className="relative rounded-b-xl overflow-hidden">
                            <Editor
                                value={cell.content}
                                onValueChange={(code) => onUpdate(cell.id, code)}
                                highlight={code => Prism.highlight(code, Prism.languages.python || Prism.languages.javascript, 'python')}
                                padding={16}
                                className="font-mono text-sm"
                                textareaClassName="focus:outline-none"
                                style={{
                                    fontFamily: '"JetBrains Mono", monospace',
                                    fontSize: 14,
                                    backgroundColor: 'transparent',
                                }}
                                placeholder={cell.isLocked ? "This cell is locked." : undefined}
                                disabled={cell.isLocked}
                                onKeyDown={(e) => {
                                    if (cell.isLocked) return;
                                    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                                        e.preventDefault();
                                        onSplit(cell.id, (e.currentTarget as HTMLTextAreaElement).selectionStart);
                                    }
                                }}
                            />
                        </div>
                    </div>
                ) : (
                    <div
                        className={`transition-all duration-500 ${isActive
                            ? 'bg-[#f5f5f7] dark:bg-[#1a1a1a] rounded-xl border border-gray-200 dark:border-[#333] shadow-sm animate-in fade-in slide-in-from-top-2 overflow-visible'
                            : 'bg-transparent border-transparent overflow-hidden'
                            }`}
                        onDoubleClick={() => onSetActive(cell.id)}
                    >

                        {isActive ? (
                            <div className="flex flex-col min-h-full animate-in slide-in-from-top-2 duration-300">
                                { /* Controls Overlay (Text Cell) */}
                                <div className="absolute top-2 right-2 flex items-center gap-1 z-20 transform transition-all duration-200">
                                    <button
                                        onClick={() => onToggleLock(cell.id)}
                                        className={`p-1.5 rounded-md transition-colors ${cell.isLocked ? 'text-amber-500 bg-amber-50 dark:bg-amber-900/20' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`}
                                        title={cell.isLocked ? "Unlock cell" : "Lock cell"}
                                    >
                                        {cell.isLocked ? <Lock size={13} /> : <Unlock size={13} />}
                                    </button>
                                    <button
                                        onClick={() => onDelete(cell.id)}
                                        className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
                                        title="Delete cell"
                                    >
                                        <Trash2 size={13} />
                                    </button>
                                    <div className="relative" ref={menuRef}>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); setIsMenuOpen(!isMenuOpen); }}
                                            className={`p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors ${isMenuOpen ? 'bg-blue-50 text-blue-500 dark:bg-blue-900/20' : ''}`}
                                        >
                                            <MoreVertical size={13} />
                                        </button>
                                        {isMenuOpen && <CellMenu />}
                                    </div>
                                </div>

                                {/* Simple Source Editor */}
                                <div className="p-4 border-b border-gray-100 dark:border-[#2f2f2f] relative transition-all" data-cell-id={cell.id}>
                                    <textarea
                                        autoFocus
                                        className="w-full bg-transparent outline-none font-mono text-sm leading-relaxed text-gray-800 dark:text-gray-200 resize-none min-h-[100px]"
                                        value={cell.content}
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            // Slash command detection
                                            const cursorPosition = e.target.selectionStart;
                                            const textBeforeCursor = val.substring(0, cursorPosition);
                                            if (textBeforeCursor.endsWith('/') && (textBeforeCursor.length === 1 || textBeforeCursor[textBeforeCursor.length - 2] === ' ' || textBeforeCursor[textBeforeCursor.length - 2] === '\n')) {
                                                onSlashMenu(cell.id);
                                                onSetSearchQuery('');
                                            } else if (activeSlashMenuId === cell.id) {
                                                const lastSlashIndex = textBeforeCursor.lastIndexOf('/');
                                                if (lastSlashIndex !== -1) {
                                                    onSetSearchQuery(textBeforeCursor.substring(lastSlashIndex + 1));
                                                } else {
                                                    onSlashMenu(null);
                                                }
                                            }
                                            onUpdate(cell.id, val);
                                            adjustHeight(e.target);
                                        }}
                                        readOnly={cell.isLocked}
                                        onKeyDown={(e) => {
                                            if (cell.isLocked) return;

                                            // Slash Menu Navigation
                                            if (activeSlashMenuId === cell.id && filteredSlashItems.length > 0) {
                                                if (e.key === 'ArrowDown') {
                                                    e.preventDefault();
                                                    setSlashSelectedIndex((prev) => (prev + 1) % filteredSlashItems.length);
                                                    return;
                                                }
                                                if (e.key === 'ArrowUp') {
                                                    e.preventDefault();
                                                    setSlashSelectedIndex((prev) => (prev - 1 + filteredSlashItems.length) % filteredSlashItems.length);
                                                    return;
                                                }
                                                if (e.key === 'Enter') {
                                                    e.preventDefault();
                                                    const block = filteredSlashItems[slashSelectedIndex];
                                                    const lastSlashIndex = cell.content.lastIndexOf('/');
                                                    if (lastSlashIndex !== -1) {
                                                        const newContent = cell.content.substring(0, lastSlashIndex) + block.prefix;
                                                        onUpdate(cell.id, newContent);
                                                    }
                                                    onSlashMenu(null);
                                                    onSetLastSelectedPrefix(block.prefix);
                                                    return;
                                                }
                                                if (e.key === 'Escape') {
                                                    e.preventDefault();
                                                    onSlashMenu(null);
                                                    return;
                                                }
                                            }

                                            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                                                e.preventDefault();
                                                onSplit(cell.id, e.currentTarget.selectionStart);
                                            }
                                        }}
                                        onFocus={(e) => adjustHeight(e.target)}
                                        rows={Math.max(4, cell.content.split('\n').length)}
                                        placeholder="Type markdown... (try / for commands)"
                                        spellCheck={false}
                                    />

                                    {/* Dedicated Slash Command Menu */}
                                    {activeSlashMenuId === cell.id && (
                                        <div
                                            ref={slashMenuRef}
                                            className="absolute left-12 top-6 w-48 bg-white/95 dark:bg-[#1a1a1a]/95 backdrop-blur-sm border border-gray-200 dark:border-[#333] rounded-lg shadow-xl z-[100] animate-in fade-in zoom-in-95 duration-200 slash-command-menu ring-1 ring-black/5 overflow-y-auto subtle-scrollbar min-w-[120px] max-h-48"
                                        >
                                            <div className="p-1">
                                                {filteredSlashItems.map((block, i) => (
                                                    <button
                                                        key={block.id}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            const lastSlashIndex = cell.content.lastIndexOf('/');
                                                            const newContent = cell.content.substring(0, lastSlashIndex) + block.prefix;
                                                            onUpdate(cell.id, newContent);
                                                            onSlashMenu(null);
                                                            onSetLastSelectedPrefix(block.prefix);
                                                        }}
                                                        className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-md group transition-colors text-left ${i === slashSelectedIndex ? 'bg-gray-100 dark:bg-[#333]' : 'hover:bg-gray-100 dark:hover:bg-[#2a2a2a]'}`}
                                                    >
                                                        <div className={`w-5 h-5 flex-shrink-0 flex items-center justify-center border rounded transition-all font-bold text-[8px] uppercase tracking-tighter ${i === slashSelectedIndex ? 'bg-gray-200 dark:bg-[#444] border-gray-300 dark:border-[#555] text-gray-700 dark:text-gray-200' : 'bg-gray-50 dark:bg-[#222] border-gray-200 dark:border-[#333] text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-200'}`}>
                                                            {block.shortcut}
                                                        </div>
                                                        <div className={`text-[12px] font-medium font-sans truncate ${i === slashSelectedIndex ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                                                            {block.label}
                                                        </div>
                                                    </button>
                                                ))}
                                                {filteredSlashItems.length === 0 && (
                                                    <div className="p-2 text-center text-[10px] text-gray-400 italic">No matches</div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Clean Preview (Vertical) */}
                                <div className="bg-white dark:bg-[#1e1e1e] p-6 lg:p-8 rounded-b-xl">
                                    <div className="prose prose-sm dark:prose-invert max-w-none 
                                        prose-headings:font-bold prose-headings:tracking-tight
                                        prose-p:leading-relaxed prose-p:text-gray-600 dark:prose-p:text-gray-400
                                        prose-img:rounded-xl
                                    ">
                                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                            {cell.content || '*Preview area...*'}
                                        </ReactMarkdown>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            /* Static View Mode */
                            <div className="bg-transparent p-2 lg:p-4">
                                <div className="prose prose-sm dark:prose-invert max-w-none 
                                    prose-headings:font-bold prose-headings:tracking-tight
                                    prose-p:leading-relaxed prose-p:text-gray-600 dark:prose-p:text-gray-400
                                    prose-img:rounded-xl
                                ">
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                        {cell.content || 'Double click to edit...'}
                                    </ReactMarkdown>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Output Area */}
                {cell.type === 'code' && cell.output && (
                    <div className="mt-4 animate-in slide-in-from-top-2 fade-in duration-200">
                        <div className="flex items-center gap-2 mb-2 px-1">
                            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">Out [{index + 1}]:</span>
                            {cell.status === 'success' && <Check size={10} className="text-green-500" />}
                            {cell.status === 'error' && <AlertCircle size={10} className="text-red-500" />}
                        </div>

                        {cell.output.type === 'error' && (
                            <div className="bg-red-50 dark:bg-red-900/10 p-4 rounded-xl border border-red-100 dark:border-red-900/30 overflow-x-auto text-red-600 dark:text-red-400 font-mono text-xs">
                                <pre>{cell.output.data as string}</pre>
                            </div>
                        )}

                        {cell.output.type === 'text' && (
                            <div className="bg-white dark:bg-[#111] p-4 rounded-xl border border-gray-200 dark:border-[#333] overflow-x-auto text-gray-700 dark:text-gray-300 font-mono text-sm whitespace-pre-wrap">
                                {cell.output.data as string}
                            </div>
                        )}

                        {cell.output.type === 'table' && (
                            <div className="bg-white dark:bg-[#111] rounded-xl border border-gray-200 dark:border-[#333] overflow-hidden shadow-sm">
                                {cell.output.visualHint && (
                                    <div className="p-4 border-b border-gray-200 dark:border-[#333]">
                                        <ChatChart
                                            data={cell.output.data as TableData}
                                            type={cell.output.visualHint}
                                        />
                                    </div>
                                )}
                                <div className="p-2">
                                    <EmbeddedTable
                                        data={cell.output.data as TableData}
                                        fileName="Result"
                                        visualHint={cell.output.visualHint}
                                        onExpand={() => { }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Add Cell Gutter (Bottom) */}
            <div className={`h-4 group/add flex items-center justify-center transition-all duration-300 ${activeTextDropdownId === cell.id ? 'opacity-100' : 'opacity-0 hover:opacity-100'}`}>
                <div className="h-px bg-blue-500/20 dark:bg-blue-500/10 w-full relative group-hover/add:bg-blue-500/40 transition-colors">
                    <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-stretch bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#333] rounded-lg shadow-sm hover:shadow-md transition-all z-40">
                        <button
                            onClick={() => onAdd('code', cell.id)}
                            className="flex items-center gap-2 px-3 py-1.5 hover:bg-gray-50 dark:hover:bg-[#252525] text-gray-700 dark:text-gray-300 transition-colors border-r border-gray-100 dark:border-[#2a2a2a] rounded-l-lg"
                        >
                            <Code2 size={15} className="text-gray-400" />
                            <span className="text-[12px] font-medium font-sans">Code</span>
                        </button>
                        <div className="relative">
                            <button
                                onClick={(e) => { e.stopPropagation(); onToggleDropdown(cell.id); }}
                                className={`flex items-center gap-2 px-3 py-1.5 hover:bg-gray-50 dark:hover:bg-[#252525] text-gray-700 dark:text-gray-300 transition-colors border-r border-gray-100 dark:border-[#2a2a2a] ${activeTextDropdownId === cell.id ? 'bg-gray-50 dark:bg-[#252525]' : ''}`}
                            >
                                <Type size={15} className="text-gray-400" />
                                <span className="text-[12px] font-medium font-sans">Text</span>
                                <ChevronDown size={12} className={`text-gray-400 transition-transform ${activeTextDropdownId === cell.id ? 'rotate-180' : ''}`} />
                            </button>

                            {activeTextDropdownId === cell.id && (
                                <div className="absolute top-full left-0 mt-2 w-48 bg-white/95 dark:bg-[#1a1a1a]/95 backdrop-blur-sm border border-gray-200 dark:border-[#333] rounded-lg shadow-xl z-[100] animate-in fade-in zoom-in-95 duration-200 text-block-dropdown ring-1 ring-black/5">
                                    <div className="p-1.5 border-b border-gray-100 dark:border-[#2a2a2a]">
                                        <div className="relative">
                                            <Search size={12} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
                                            <input
                                                autoFocus
                                                value={textSearchQuery}
                                                onChange={(e) => onSetSearchQuery(e.target.value)}
                                                placeholder="Search..."
                                                className="w-full pl-7 pr-2 py-1 bg-gray-50/50 dark:bg-[#252525] border border-gray-100 dark:border-[#333] rounded text-[11px] outline-none focus:border-blue-500/50 transition-all font-sans"
                                            />
                                        </div>
                                    </div>
                                    <div className="max-h-60 overflow-y-auto p-1 subtle-scrollbar">
                                        {textBlockTypes.filter(b => b.label.toLowerCase().includes(textSearchQuery.toLowerCase())).map(block => (
                                            <button
                                                key={block.id}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onAdd('markdown', cell.id, block.prefix);
                                                    onToggleDropdown(cell.id); // close
                                                    onSetSearchQuery('');
                                                    onSetLastSelectedPrefix(block.prefix);
                                                }}
                                                className="w-full flex items-center gap-2 px-2 py-1.5 hover:bg-gray-100 dark:hover:bg-[#2a2a2a] rounded-md group transition-colors text-left"
                                            >
                                                <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center bg-gray-50 dark:bg-[#222] border border-gray-200 dark:border-[#333] rounded text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-200 transition-all font-bold text-[8px] uppercase tracking-tighter">
                                                    {block.shortcut}
                                                </div>
                                                <div className="text-[12px] font-medium text-gray-700 dark:text-gray-300 font-sans truncate">
                                                    {block.label}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 hover:bg-gray-50 dark:hover:bg-[#252525] text-gray-700 dark:text-gray-300 transition-colors border-r border-gray-100 dark:border-[#2a2a2a] cursor-not-allowed opacity-60">
                            <Database size={15} className="text-gray-400" />
                            <span className="text-[12px] font-medium font-sans">SQL</span>
                            <ChevronDown size={12} className="text-gray-400" />
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 hover:bg-gray-50 dark:hover:bg-[#252525] text-gray-700 dark:text-gray-300 transition-colors border-r border-gray-100 dark:border-[#2a2a2a] cursor-not-allowed opacity-60">
                            <BarChart3 size={15} className="text-gray-400" />
                            <span className="text-[12px] font-medium font-sans">Chart</span>
                            <ChevronDown size={12} className="text-gray-400" />
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 hover:bg-gray-50 dark:hover:bg-[#252525] text-gray-700 dark:text-gray-300 transition-colors cursor-not-allowed opacity-60 rounded-r-lg">
                            <PenLine size={15} className="text-gray-400" />
                            <span className="text-[12px] font-medium font-sans">Input</span>
                            <ChevronDown size={12} className="text-gray-400" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
