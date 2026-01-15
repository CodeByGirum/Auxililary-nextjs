import React from 'react';
import { ArrowLeft, RotateCw, Save } from 'lucide-react';
import { EnvBadge, ComputeBadge } from './Badges';
import { Environment, Compute } from '../../types';

interface NotebookToolbarProps {
    title: string;
    onTitleChange: (title: string) => void;
    environment: Environment;
    compute: Compute;
    isKernelReady: boolean;
    kernelStatus: string;
    isSaving: boolean;
    onSave: () => void;
    onBack: () => void;
}

export const NotebookToolbar: React.FC<NotebookToolbarProps> = ({
    title,
    onTitleChange,
    environment,
    compute,
    isKernelReady,
    kernelStatus,
    isSaving,
    onSave,
    onBack
}) => {
    return (
        <header className="h-16 flex items-center justify-between px-4 md:px-6 border-b border-gray-200 dark:border-[#333] bg-white/80 dark:bg-[#1e1e1e]/80 backdrop-blur-sm z-30 flex-shrink-0">
            <div className="flex items-center gap-4">
                <button onClick={onBack} className="p-2 -ml-2 text-gray-400 hover:text-black dark:hover:text-white rounded-full hover:bg-gray-100 dark:hover:bg-[#333] transition-colors">
                    <ArrowLeft size={20} />
                </button>

                <div className="h-8 w-px bg-gray-200 dark:bg-[#333]"></div>

                <div>
                    <input
                        value={title}
                        onChange={(e) => onTitleChange(e.target.value)}
                        className="text-base font-semibold text-gray-900 dark:text-white bg-transparent outline-none placeholder-gray-400"
                        placeholder="Untitled Notebook"
                    />
                    <div className="flex items-center gap-2 mt-0.5">
                        <span className={`text-[10px] uppercase font-bold flex items-center gap-1 ${isKernelReady ? 'text-green-600 dark:text-green-400' : 'text-yellow-600 dark:text-yellow-400'}`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${isKernelReady ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`}></div>
                            {isKernelReady ? 'Kernel Ready' : kernelStatus}
                        </span>
                        <span className="text-[10px] text-gray-400">• Last run: Just now</span>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-3">
                {/* Environment Selector Display */}
                <div className="hidden md:flex items-center gap-2 bg-gray-50 dark:bg-[#252525] p-1 rounded-lg border border-gray-200 dark:border-[#333]">
                    <EnvBadge env={environment} />
                </div>

                <div className="h-6 w-px bg-gray-200 dark:bg-[#333]"></div>

                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#333] rounded-lg text-xs font-medium transition-colors">
                        <ComputeBadge comp={compute} />
                    </div>
                </div>

                <button
                    onClick={onSave}
                    className="flex items-center gap-2 px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-full text-xs font-bold uppercase tracking-wider hover:opacity-90 active:scale-95 transition-all shadow-lg"
                >
                    {isSaving ? <RotateCw size={14} className="animate-spin" /> : <Save size={14} />}
                    <span>{isSaving ? 'Saving' : 'Save'}</span>
                </button>
            </div>
        </header>
    );
};
