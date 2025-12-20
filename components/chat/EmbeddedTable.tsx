
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { TableData } from '../../types/chat';
import { Maximize2, BarChart3, Database } from 'lucide-react';

interface EmbeddedTableProps {
  data: TableData;
  fileName: string;
  visualHint?: string;
  source?: string;
  onExpand: () => void;
}

export const EmbeddedTable: React.FC<EmbeddedTableProps> = ({ data, fileName, visualHint, source, onExpand }) => {
  // Local state for editing and resizing
  const [rows, setRows] = useState<any[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [colWidths, setColWidths] = useState<Record<string, number>>({});
  
  // Interaction State
  const [selectedCell, setSelectedCell] = useState<{r: number, c: string} | null>(null);
  
  // Resizing State
  const resizingRef = useRef<{ startX: number, startWidth: number, header: string } | null>(null);

  useEffect(() => {
    // Sync with props (e.g. if updated from drawer)
    setRows(data.rows.slice(0, 5)); // Only show first 5 rows in embedded view
    setHeaders(data.headers);
    
    // Initialize widths
    const initialWidths: Record<string, number> = {};
    data.headers.forEach(h => initialWidths[h] = 120);
    setColWidths(initialWidths);
  }, [data]);

  // --- Resizing Logic ---
  const handleMouseDown = (e: React.MouseEvent, header: string) => {
    e.preventDefault();
    resizingRef.current = {
      startX: e.clientX,
      startWidth: colWidths[header] || 120,
      header
    };
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!resizingRef.current) return;
    const { startX, startWidth, header } = resizingRef.current;
    const diff = e.clientX - startX;
    setColWidths(prev => ({
      ...prev,
      [header]: Math.max(50, startWidth + diff)
    }));
  }, []);

  const handleMouseUp = useCallback(() => {
    resizingRef.current = null;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  }, [handleMouseMove]);

  // --- Interaction Logic ---
  const handleCellClick = (r: number, c: string) => {
    setSelectedCell({ r, c });
  };

  // Helper to get column letter (A, B, C...)
  const getColLetter = (index: number) => String.fromCharCode(65 + index);

  return (
    <div className="w-full border border-gray-300 dark:border-[#444] bg-white dark:bg-[#1e1e1e] shadow-sm select-none flex flex-col rounded-xl overflow-hidden font-sans transition-all hover:shadow-md group">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-3 py-2 bg-[#f8f9fa] dark:bg-[#252525] border-b border-gray-300 dark:border-[#444]">
        <div className="flex items-center gap-3 min-w-0">
          <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${visualHint ? 'bg-purple-600' : 'bg-[#107c41]'}`}>
             {visualHint ? <BarChart3 size={16} className="text-white" /> : <Database size={16} className="text-white" />}
          </div>
          <div className="flex flex-col min-w-0">
             <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-gray-900 dark:text-gray-100 truncate">{fileName}</span>
                {source && (
                    <span className="px-1.5 py-0.5 rounded-md bg-gray-200 dark:bg-[#333] text-[9px] font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wide border border-gray-300 dark:border-[#444]">
                        {source}
                    </span>
                )}
             </div>
             {visualHint && <span className="text-[9px] text-purple-600 dark:text-purple-400 uppercase font-bold tracking-wide">Analysis Ready</span>}
          </div>
        </div>
        <button 
            onClick={onExpand}
            className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white dark:bg-[#333] text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-[#444] hover:bg-gray-50 dark:hover:bg-[#404040] rounded-full transition-colors shadow-sm"
        >
            <Maximize2 size={12} strokeWidth={2} />
            <span className="hidden sm:inline">Expand</span>
        </button>
      </div>

      {/* Excel Grid */}
      <div className="overflow-x-auto relative no-scrollbar bg-white dark:bg-[#1e1e1e]">
        <div className="inline-block min-w-full">
            {/* Headers */}
            <div className="flex">
                {/* Row Number Header */}
                <div className="w-10 flex-shrink-0 bg-[#f3f2f1] dark:bg-[#2b2b2b] border-r border-b border-gray-300 dark:border-[#444] h-8"></div>
                {headers.map((h, i) => (
                    <div 
                        key={h} 
                        className="relative flex-shrink-0 flex items-center justify-center bg-[#f3f2f1] dark:bg-[#2b2b2b] border-r border-b border-gray-300 dark:border-[#444] h-8 text-[11px] font-bold text-gray-600 dark:text-gray-300"
                        style={{ width: colWidths[h] }}
                    >
                        {h} ({getColLetter(i)})
                        {/* Resizer Handle */}
                        <div 
                            className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-[#107c41] z-10"
                            onMouseDown={(e) => handleMouseDown(e, h)}
                        />
                    </div>
                ))}
            </div>

            {/* Rows */}
            {rows.map((row, rIdx) => (
                <div key={rIdx} className="flex group">
                    {/* Row Number */}
                    <div className="w-10 flex-shrink-0 flex items-center justify-center bg-[#f3f2f1] dark:bg-[#2b2b2b] border-r border-b border-gray-300 dark:border-[#444] text-[10px] text-gray-500 dark:text-gray-400 font-mono select-none group-hover:bg-[#e1dfdd] dark:group-hover:bg-[#333]">
                        {rIdx + 1}
                    </div>
                    
                    {/* Cells */}
                    {headers.map((h) => {
                        const isSelected = selectedCell?.r === rIdx && selectedCell?.c === h;

                        return (
                            <div 
                                key={h}
                                className={`
                                    relative flex-shrink-0 h-7 text-xs border-r border-b border-gray-200 dark:border-[#444] px-2 flex items-center
                                    ${rIdx % 2 === 0 ? 'bg-white dark:bg-[#1e1e1e]' : 'bg-[#fafafa] dark:bg-[#232323]'} 
                                    ${isSelected ? 'outline outline-2 outline-[#107c41] z-10' : ''}
                                `}
                                style={{ width: colWidths[h] }}
                                onClick={() => handleCellClick(rIdx, h)}
                            >
                                <span className="truncate w-full text-gray-800 dark:text-gray-200 pointer-events-none">
                                    {row[h]}
                                </span>
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
      </div>

      {/* Footer */}
      <div className="px-3 py-2 bg-[#f8f9fa] dark:bg-[#252525] border-t border-gray-300 dark:border-[#444] flex justify-between items-center">
        <span className="text-[10px] font-medium text-gray-500 dark:text-gray-400">
           {rows.length < data.rows.length ? `Previewing ${rows.length} of ${data.rows.length} rows` : `${rows.length} rows`}
        </span>
      </div>
    </div>
  );
};
