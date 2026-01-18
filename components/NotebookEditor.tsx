/**
 * NotebookEditor.tsx
 * 
 * Purpose: 
 * A rich code editor environment simulating a Jupyter notebook.
 * Executes Python code in the browser using WebAssembly (Pyodide).
 */

'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Terminal, FileText } from 'lucide-react';
import { Notebook, NotebookCell as NotebookCellType, Environment, Compute } from '../types';
import { TableData } from '../types/chat';

// Components & Hooks
import { usePyodide } from '../hooks/usePyodide';
import { NotebookToolbar } from './notebook/NotebookToolbar';
import { NotebookCell } from './notebook/NotebookCell';

interface NotebookEditorProps {
    notebook: Notebook;
    onBack?: () => void;
}

export const NotebookEditor: React.FC<NotebookEditorProps> = ({ notebook: initialNotebook, onBack }) => {
    const router = useRouter();
    const { pyodide, isKernelReady, kernelStatus } = usePyodide();

    const handleBack = useCallback(() => {
        if (onBack) {
            onBack();
        } else {
            router.back();
        }
    }, [onBack, router]);

    // State
    const [title, setTitle] = useState(initialNotebook.title);
    const [cells, setCells] = useState<NotebookCellType[]>(initialNotebook.cells || [
        { id: '1', type: 'markdown', status: 'idle', content: `# ${initialNotebook.title}\n\nThis notebook environment uses a real Python kernel running in your browser via WebAssembly.` },
        { id: '2', type: 'code', status: 'idle', content: `import pandas as pd\nimport numpy as np\n\n# Create a sample dataframe\ndata = {\n    'Month': ['Jan', 'Feb', 'Mar', 'Apr', 'May'],\n    'Revenue': [12500, 14200, 11800, 15600, 16100],\n    'Cost': [8200, 8500, 7900, 9100, 9400]\n}\ndf = pd.DataFrame(data)\ndf['Profit'] = df['Revenue'] - df['Cost']\n\nprint("Data calculated successfully!")\ndf.head()` }
    ]);
    const [environment, setEnvironment] = useState<Environment>(initialNotebook.environment || 'python');
    const [compute, setCompute] = useState<Compute>(initialNotebook.compute || 'cpu-std');
    const [activeCellId, setActiveCellId] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
    const [activeTextDropdownId, setActiveTextDropdownId] = useState<string | null>(null);
    const [activeSlashMenuId, setActiveSlashMenuId] = useState<string | null>(null);
    const [textSearchQuery, setTextSearchQuery] = useState('');
    const [lastSelectedPrefix, setLastSelectedPrefix] = useState<string | null>(null);

    // Auto-close timer for markdown cells
    const activeCellLeaveTimer = useRef<NodeJS.Timeout | null>(null);

    // Initial Pyodide check handled by hook

    // Close dropdown on click outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (activeTextDropdownId && !target.closest('.text-block-dropdown')) {
                setActiveTextDropdownId(null);
                setTextSearchQuery('');
            }
            if (activeSlashMenuId && !target.closest('.slash-command-menu')) {
                setActiveSlashMenuId(null);
                setTextSearchQuery('');
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [activeTextDropdownId, activeSlashMenuId]);

    // Handle cursor positioning after adding a cell or prefix
    useEffect(() => {
        if (activeCellId) {
            const textarea = document.querySelector(`[data-cell-id="${activeCellId}"] textarea`) as HTMLTextAreaElement;
            if (textarea) {
                textarea.focus();
                // If it was just created or prefix added, put cursor at the end
                if (lastSelectedPrefix !== null) {
                    const len = textarea.value.length;
                    textarea.setSelectionRange(len, len);
                    setLastSelectedPrefix(null);
                }
            }
        }
    }, [activeCellId, lastSelectedPrefix]);

    // --- Actions ---

    const handleRunCell = async (id: string) => {
        const cell = cells.find(c => c.id === id);
        if (!cell) return;

        if (cell.type === 'markdown') {
            setActiveCellId(null);
            return;
        }

        setCells(prev => prev.map(c => c.id === id ? { ...c, status: 'running', output: undefined } : c));

        if (!isKernelReady || !pyodide) {
            setCells(prev => prev.map(c => c.id === id ? {
                ...c,
                status: 'error',
                output: { type: 'error', data: "Python kernel is not ready yet. Please wait." }
            } : c));
            return;
        }

        try {
            // Redirect stdout
            let stdout = "";
            pyodide.setStdout({ batched: (msg: string) => { stdout += msg + "\n"; } });
            pyodide.setStderr({ batched: (msg: string) => { stdout += `[stderr] ${msg}\n`; } });

            // Load packages if needed (basic heuristic)
            if (cell.content.includes("pandas") || cell.content.includes("numpy")) {
                await pyodide.loadPackage(["pandas", "numpy"]);
            }
            if (cell.content.includes("matplotlib")) {
                await pyodide.loadPackage("matplotlib");
            }

            // Run
            let result = await pyodide.runPythonAsync(cell.content);

            let output: NotebookCellType['output'];

            // Check if result is a Pandas DataFrame (via proxy)
            if (result && typeof result.to_json === 'function') {
                const jsonStr = result.to_json(undefined, { orient: 'split' });
                const parsed = JSON.parse(jsonStr);
                const tableData: TableData = {
                    headers: parsed.columns,
                    rows: parsed.data.map((row: any[], idx: number) => {
                        const r: any = { id: idx.toString() };
                        parsed.columns.forEach((col: string, i: number) => {
                            r[col] = row[i];
                        });
                        return r;
                    })
                };
                output = { type: 'table', data: tableData };
            } else if (result !== undefined) {
                output = { type: 'text', data: (stdout ? stdout + "\n" : "") + String(result) };
            } else {
                output = { type: 'text', data: stdout || "✓ Executed successfully" };
            }

            setCells(prev => prev.map(c => c.id === id ? { ...c, status: 'success', output, lastRun: new Date() } : c));

        } catch (err: any) {
            console.error(err);
            setCells(prev => prev.map(c => c.id === id ? {
                ...c,
                status: 'error',
                output: { type: 'error', data: String(err) }
            } : c));
        }
    };

    const handleAddCell = useCallback((type: 'code' | 'markdown', afterId?: string, initialContent?: string) => {
        const newCell: NotebookCellType = {
            id: Date.now().toString(),
            type,
            content: initialContent || '',
            status: 'idle'
        };

        setCells(prevCells => {
            if (afterId) {
                const idx = prevCells.findIndex(c => c.id === afterId);
                const newCells = [...prevCells];
                newCells.splice(idx + 1, 0, newCell);
                return newCells;
            } else {
                return [...prevCells, newCell];
            }
        });
        setActiveCellId(newCell.id);
        if (initialContent) {
            setLastSelectedPrefix(initialContent);
        }
    }, []);

    const handleDeleteCell = useCallback((id: string) => {
        setCells(prev => prev.filter(c => c.id !== id));
    }, []);

    const handleSplitCell = useCallback((id: string, cursorPosition: number) => {
        const newId = Date.now().toString();
        setCells(prevCells => {
            const idx = prevCells.findIndex(c => c.id === id);
            if (idx === -1) return prevCells;
            const currentCell = prevCells[idx];
            const contentBefore = currentCell.content.substring(0, cursorPosition);
            const contentAfter = currentCell.content.substring(cursorPosition);
            const newCell: NotebookCellType = {
                id: newId,
                type: currentCell.type,
                content: contentAfter,
                status: 'idle'
            };
            const updatedCells = [...prevCells];
            updatedCells[idx] = { ...currentCell, content: contentBefore };
            updatedCells.splice(idx + 1, 0, newCell);
            return updatedCells;
        });
        setActiveCellId(newId);
    }, []);

    const handleSave = useCallback(() => {
        setIsSaving(true);
        setTimeout(() => setIsSaving(false), 1000);
    }, []);

    const handleDragStart = useCallback((e: React.DragEvent, index: number) => {
        setDraggedIndex(index);
        e.dataTransfer.effectAllowed = 'move';
    }, []);

    const handleDragEnd = useCallback(() => {
        setDraggedIndex(null);
    }, []);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
    }, []);

    const handleDrop = useCallback((e: React.DragEvent, index: number) => {
        e.preventDefault();
        setDraggedIndex(null);
        if (draggedIndex === null || draggedIndex === index) return;
        setCells(prevCells => {
            const updatedCells = [...prevCells];
            const [movedItem] = updatedCells.splice(draggedIndex, 1);
            updatedCells.splice(index, 0, movedItem);
            return updatedCells;
        });
    }, [draggedIndex]);

    return (
        <div className="flex flex-col h-full bg-white dark:bg-[#1e1e1e] overflow-hidden animate-in fade-in duration-300">
            <NotebookToolbar
                title={title}
                onTitleChange={setTitle}
                environment={environment}
                compute={compute}
                isKernelReady={isKernelReady}
                kernelStatus={kernelStatus}
                isSaving={isSaving}
                onSave={handleSave}
                onBack={handleBack}
            />

            {/* Editor Canvas */}
            <div className="flex-1 overflow-y-auto bg-white dark:bg-[#1e1e1e] p-4 md:p-8 scroll-smooth">
                <div className="max-w-4xl mx-auto pb-32">
                    {cells.map((cell, index) => (
                        <NotebookCell
                            key={cell.id}
                            cell={cell}
                            index={index}
                            isActive={activeCellId === cell.id}
                            draggedIndex={draggedIndex}
                            activeTextDropdownId={activeTextDropdownId}
                            activeSlashMenuId={activeSlashMenuId}
                            textSearchQuery={textSearchQuery}
                            onSetActive={setActiveCellId}
                            onRun={handleRunCell}
                            onUpdate={(id, content) => setCells(prev => prev.map(c => c.id === id ? { ...c, content } : c))}
                            onDelete={handleDeleteCell}
                            onSplit={handleSplitCell}
                            onAdd={handleAddCell}
                            onDragStart={handleDragStart}
                            onDragOver={handleDragOver}
                            onDragEnd={handleDragEnd}
                            onDrop={handleDrop}
                            onToggleDropdown={(id) => setActiveTextDropdownId(current => current === id ? null : id)}
                            onSlashMenu={setActiveSlashMenuId}
                            onSetSearchQuery={setTextSearchQuery}
                            onSetLastSelectedPrefix={setLastSelectedPrefix}
                            onMove={(id, direction) => {
                                setCells(prev => {
                                    const index = prev.findIndex(c => c.id === id);
                                    if (index === -1) return prev;
                                    if (direction === 'up' && index === 0) return prev;
                                    if (direction === 'down' && index === prev.length - 1) return prev;
                                    const newCells = [...prev];
                                    const targetIndex = direction === 'up' ? index - 1 : index + 1;
                                    [newCells[index], newCells[targetIndex]] = [newCells[targetIndex], newCells[index]];
                                    return newCells;
                                });
                            }}
                            onConvert={(id, type) => {
                                setCells(prev => prev.map(c => c.id === id ? { ...c, type } : c));
                            }}
                            onRunAll={(direction, id) => {
                                const index = cells.findIndex(c => c.id === id);
                                if (index === -1) return;
                                const cellsToRun = cells.filter((c, i) => direction === 'above' ? i < index : i > index);
                                cellsToRun.forEach(c => handleRunCell(c.id));
                            }}
                            onToggleLock={(id) => {
                                setCells(prev => prev.map(c => c.id === id ? { ...c, isLocked: !c.isLocked } : c));
                            }}
                            onDuplicate={(id) => {
                                const index = cells.findIndex(c => c.id === id);
                                if (index === -1) return;
                                const cellToDuplicate = cells[index];
                                const newCell = {
                                    ...cellToDuplicate,
                                    id: Date.now().toString(),
                                    status: 'idle' as const,
                                    output: undefined
                                };
                                setCells(prev => {
                                    const newCells = [...prev];
                                    newCells.splice(index + 1, 0, newCell);
                                    return newCells;
                                });
                            }}
                        />
                    ))}

                    {/* Empty State / Bottom Add */}
                    {cells.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-20 text-gray-400 border-2 border-dashed border-gray-100 dark:border-[#333] rounded-3xl">
                            <div className="mb-4 p-4 bg-gray-50 dark:bg-[#252525] rounded-full">
                                <Terminal size={24} className="opacity-50" />
                            </div>
                            <p className="mb-6 font-medium">Notebook is empty</p>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => handleAddCell('code')}
                                    className="flex items-center gap-3 px-8 py-4 bg-blue-600 dark:bg-blue-500 text-white rounded-2xl font-bold text-sm uppercase tracking-wider hover:bg-blue-700 dark:hover:bg-blue-600 transition-all shadow-xl hover:shadow-blue-500/20 transform hover:-translate-y-1 active:scale-95"
                                >
                                    <Plus size={20} className="stroke-[3]" /> Add Code Block
                                </button>
                                <button
                                    onClick={() => handleAddCell('markdown')}
                                    className="flex items-center gap-3 px-8 py-4 bg-white dark:bg-[#333] text-gray-700 dark:text-white border border-gray-200 dark:border-[#444] rounded-2xl font-bold text-sm uppercase tracking-wider hover:bg-gray-50 transition-all shadow-lg hover:shadow-gray-200 dark:hover:shadow-none transform hover:-translate-y-1 active:scale-95"
                                >
                                    <FileText size={20} /> Add Text
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
