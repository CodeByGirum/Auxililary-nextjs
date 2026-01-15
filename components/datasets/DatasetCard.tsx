import React from 'react';
import { BookOpen, MessageSquare, Copy, Archive, Trash2, CheckCircle2 } from 'lucide-react';
import { EmbeddedTable } from '../chat/EmbeddedTable';
import { TableData } from '../../types/chat';

export interface Dataset {
    id: string;
    name: string;
    source: string;
    type: string;
    updated: string;
    status: string;
    visualHint?: string;
    data: TableData;
}

interface DatasetCardProps {
    dataset: Dataset;
    isMenuActive: boolean;
    onMenuToggle: (e: React.MouseEvent) => void;
    onCloseMenu: (e: React.MouseEvent) => void;
    onOpenChat: (dataset: Dataset) => void;
    onDuplicate: (id: string) => void;
    onArchive: (id: string) => void;
    onDelete: (id: string) => void;
    onExpand: (data: TableData, name: string) => void;
}

export const DatasetCard: React.FC<DatasetCardProps> = ({
    dataset,
    isMenuActive,
    onMenuToggle,
    onCloseMenu,
    onOpenChat,
    onDuplicate,
    onArchive,
    onDelete,
    onExpand,
}) => {
    return (
        <div
            onClick={onMenuToggle}
            className={`
               relative flex flex-col gap-3 p-2 rounded-2xl transition-all duration-200 group border border-transparent
               hover:bg-gray-50 dark:hover:bg-[#1a1a1a] cursor-pointer
               ${isMenuActive ? 'bg-gray-50 dark:bg-[#1a1a1a]' : ''}
            `}
        >
            {/* Context Menu Overlay */}
            {isMenuActive && (
                <div
                    className="absolute inset-0 z-50 flex items-center justify-center bg-white/40 dark:bg-black/40 backdrop-blur-[1px] rounded-2xl animate-in fade-in duration-200"
                    onClick={onCloseMenu}
                >
                    <div className="bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#333] shadow-2xl p-1.5 min-w-[220px] rounded-xl animate-in zoom-in-95 slide-in-from-bottom-2 duration-200">
                        <div className="space-y-0.5">
                            <button
                                onClick={(e) => { e.stopPropagation(); onCloseMenu(e); }}
                                className="group flex items-center gap-3 w-full px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition-colors rounded-md"
                            >
                                <BookOpen size={16} className="text-gray-500 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors" />
                                <span>Open in Notebook</span>
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); onOpenChat(dataset); }}
                                className="group flex items-center gap-3 w-full px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition-colors rounded-md"
                            >
                                <MessageSquare size={16} className="text-gray-500 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors" />
                                <span>Open in Chat</span>
                            </button>
                        </div>

                        <div className="h-px bg-gray-100 dark:bg-[#333] my-1.5 mx-1"></div>

                        <div className="space-y-0.5">
                            <button
                                onClick={(e) => { e.stopPropagation(); onDuplicate(dataset.id); }}
                                className="group flex items-center gap-3 w-full px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition-colors rounded-md"
                            >
                                <Copy size={16} className="text-gray-500 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors" />
                                <span>Duplicate</span>
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); onArchive(dataset.id); }}
                                className="group flex items-center gap-3 w-full px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition-colors rounded-md"
                            >
                                <Archive size={16} className="text-gray-500 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors" />
                                <span>Archive</span>
                            </button>
                        </div>

                        <div className="h-px bg-gray-100 dark:bg-[#333] my-1.5 mx-1"></div>

                        <button
                            onClick={(e) => { e.stopPropagation(); onDelete(dataset.id); }}
                            className="group flex items-center gap-3 w-full px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors rounded-md"
                        >
                            <Trash2 size={16} className="text-red-500 dark:text-red-400 group-hover:text-red-600 dark:group-hover:text-red-300 transition-colors" />
                            <span>Delete</span>
                        </button>
                    </div>
                </div>
            )}

            {/* The Table Component */}
            <div className="w-full relative shadow-sm rounded-xl overflow-hidden transition-shadow duration-300 border border-gray-200 dark:border-[#333] bg-white dark:bg-[#1e1e1e]">
                <EmbeddedTable
                    data={dataset.data}
                    fileName={dataset.name}
                    source={dataset.source}
                    visualHint={dataset.visualHint as any}
                    onExpand={() => onExpand(dataset.data, dataset.name)}
                />
            </div>

            {/* Metadata Footer */}
            <div className="px-2 flex justify-between items-center min-h-[24px]">
                <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 font-medium">
                        {dataset.status === 'Deployed' && (
                            <>
                                <span className="flex items-center gap-1.5 text-green-600 dark:text-green-400">
                                    <CheckCircle2 size={12} />
                                    {dataset.status}
                                </span>
                                <span className="text-gray-300 dark:text-gray-600">•</span>
                            </>
                        )}
                        <span className="text-[11px] text-gray-400">{dataset.updated}</span>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-[#2a2a2a] px-2 py-0.5 rounded border border-gray-200 dark:border-[#333] uppercase tracking-wider">
                        {dataset.type}
                    </span>
                </div>
            </div>
        </div>
    );
};
