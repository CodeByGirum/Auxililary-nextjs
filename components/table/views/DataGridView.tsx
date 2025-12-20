

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Plus, Filter, Trash2 } from 'lucide-react';

interface DataGridViewProps {
  headers: string[];
  rows: any[];
  onRowUpdate: (id: string, updates: Record<string, any>) => void;
  onAddRow: () => void;
  onDeleteRow: (id: string) => void;
  filters: Record<string, string>;
  setFilters: (filters: Record<string, string>) => void;
  sortConfig: { key: string; dir: 'asc' | 'desc' } | null;
  setSortConfig: (config: { key: string; dir: 'asc' | 'desc' } | null) => void;
}

export const DataGridView: React.FC<DataGridViewProps> = ({
  headers,
  rows,
  onRowUpdate,
  onAddRow,
  onDeleteRow,
  filters,
  setFilters,
  sortConfig,
  setSortConfig,
}) => {
  const [selectedCell, setSelectedCell] = useState<{ r: number; c: string } | null>(null);
  const [colWidths, setColWidths] = useState<Record<string, number>>({});
  const resizingRef = useRef<{ startX: number; startWidth: number; header: string } | null>(null);
  
  // Lazy Loading State
  const [visibleCount, setVisibleCount] = useState(50);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Initial width setup
  useEffect(() => {
    const widths: Record<string, number> = {};
    headers.forEach((h) => (widths[h] = 150));
    setColWidths(widths);
  }, [headers]);

  // Reset lazy load on filter/sort/data change
  useEffect(() => {
    setVisibleCount(50);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [filters, sortConfig, rows.length]);

  const handleCellEdit = (id: string, key: string, val: string) => {
    onRowUpdate(id, { [key]: val });
  };

  // Scroll Handler for Lazy Loading
  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    // Load more when within 200px of bottom
    if (scrollHeight - scrollTop <= clientHeight + 200) {
      if (visibleCount < rows.length) {
         setVisibleCount(prev => Math.min(prev + 50, rows.length));
      }
    }
  }, [rows.length, visibleCount]);

  // Resizing Logic
  const handleResizeMouseDown = (e: React.MouseEvent, header: string) => {
    e.preventDefault();
    e.stopPropagation();
    resizingRef.current = { startX: e.clientX, startWidth: colWidths[header] || 150, header };
    document.addEventListener('mousemove', handleResizeMouseMove);
    document.addEventListener('mouseup', handleResizeMouseUp);
  };

  const handleResizeMouseMove = useCallback((e: MouseEvent) => {
    if (!resizingRef.current) return;
    const { startX, startWidth, header } = resizingRef.current;
    const diff = e.clientX - startX;
    setColWidths((prev) => ({ ...prev, [header]: Math.max(60, startWidth + diff) }));
  }, []);

  const handleResizeMouseUp = useCallback(() => {
    resizingRef.current = null;
    document.removeEventListener('mousemove', handleResizeMouseMove);
    document.removeEventListener('mouseup', handleResizeMouseUp);
  }, [handleResizeMouseMove]);

  const visibleRows = rows.slice(0, visibleCount);

  return (
    <div className="flex flex-col h-full bg-[#F5F5F7] dark:bg-[#1e1e1e]">
      {/* Toolbar */}
      <div className="flex items-center gap-2 p-2 border-b border-gray-200 dark:border-[#333] bg-white/80 dark:bg-[#252525]/80 backdrop-blur-sm flex-shrink-0">
        <button
          onClick={onAddRow}
          className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-white dark:bg-[#333] border border-gray-200 dark:border-[#444] hover:bg-gray-50 dark:hover:bg-[#444] text-gray-700 dark:text-gray-200 transition-colors rounded-md shadow-sm"
        >
          <Plus size={14} /> Row
        </button>
        <div className="h-4 w-px bg-gray-300 dark:bg-[#444]"></div>
        <button
          onClick={() => setFilters({})}
          className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-white dark:bg-[#333] border border-gray-200 dark:border-[#444] hover:bg-gray-50 dark:hover:bg-[#444] text-gray-700 dark:text-gray-200 transition-colors rounded-md shadow-sm"
        >
          <Filter size={14} /> Clear Filters
        </button>
        <span className="ml-auto text-xs text-gray-500">
           Showing {visibleRows.length} of {rows.length} rows
        </span>
      </div>

      {/* Table Area */}
      <div 
        className="flex-1 overflow-auto custom-scrollbar bg-[#F5F5F7] dark:bg-[#1e1e1e] p-4"
        onScroll={handleScroll}
        ref={scrollContainerRef}
      >
        <div className="inline-block min-w-full bg-white dark:bg-[#1e1e1e] rounded-lg border border-gray-200 dark:border-[#333] shadow-sm overflow-hidden">
          {/* Headers */}
          <div className="flex sticky top-0 z-20">
            <div className="w-10 flex-shrink-0 bg-gray-50 dark:bg-[#2b2b2b] border-r border-b border-gray-200 dark:border-[#444] h-8"></div>
            {headers.map((h) => (
              <div
                key={h}
                className="relative flex-shrink-0 flex flex-col justify-center bg-gray-50 dark:bg-[#2b2b2b] border-r border-b border-gray-200 dark:border-[#444] h-8 px-2 group"
                style={{ width: colWidths[h] }}
              >
                <div className="flex items-center justify-between text-[11px] font-semibold text-gray-600 dark:text-gray-300 select-none">
                  <span
                    onClick={() =>
                      setSortConfig({
                        key: h,
                        dir: sortConfig?.key === h && sortConfig.dir === 'asc' ? 'desc' : 'asc',
                      })
                    }
                    className="cursor-pointer hover:text-black dark:hover:text-white"
                  >
                    {h} {sortConfig?.key === h && (sortConfig.dir === 'asc' ? '↑' : '↓')}
                  </span>
                </div>
                <div
                  className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-blue-500 z-30"
                  onMouseDown={(e) => handleResizeMouseDown(e, h)}
                />
              </div>
            ))}
          </div>

          {/* Filter Row */}
          <div className="flex sticky top-8 z-20 bg-white dark:bg-[#252525]">
            <div className="w-10 flex-shrink-0 bg-white dark:bg-[#252525] border-r border-b border-gray-200 dark:border-[#444] h-8 flex items-center justify-center">
              <Filter size={10} className="text-gray-400" />
            </div>
            {headers.map((h) => (
              <div
                key={`filter-${h}`}
                className="flex-shrink-0 border-r border-b border-gray-200 dark:border-[#444] h-8 p-0"
                style={{ width: colWidths[h] }}
              >
                <input
                  className="w-full h-full px-2 text-xs bg-transparent outline-none text-gray-600 dark:text-gray-300 placeholder-gray-300"
                  placeholder="Filter..."
                  value={filters[h] || ''}
                  onChange={(e) => setFilters({ ...filters, [h]: e.target.value })}
                />
              </div>
            ))}
          </div>

          {/* Data Rows (Virtualized/Lazy Loaded Slice) */}
          {visibleRows.map((row, rIdx) => (
            <div key={row.id} className="flex group hover:bg-blue-50/50 dark:hover:bg-[#333] transition-colors">
              <div className="w-10 flex-shrink-0 bg-gray-50 dark:bg-[#2b2b2b] border-r border-b border-gray-100 dark:border-[#444] text-[10px] flex items-center justify-center text-gray-400 dark:text-gray-500 select-none font-mono group-hover:bg-gray-100 dark:group-hover:bg-[#383838] relative">
                {rIdx + 1}
                <button
                  onClick={() => onDeleteRow(row.id)}
                  className="absolute left-0.5 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 text-red-500 p-1"
                >
                  <Trash2 size={10} />
                </button>
              </div>
              {headers.map((h) => {
                const isSelected = selectedCell?.r === rIdx && selectedCell?.c === h;
                return (
                  <div
                    key={`${row.id}-${h}`}
                    className={`flex-shrink-0 border-r border-b border-gray-100 dark:border-[#444] h-8 p-0 relative ${
                      rIdx % 2 === 0 ? 'bg-white dark:bg-[#1e1e1e]' : 'bg-[#fafbfc] dark:bg-[#232323]'
                    } ${isSelected ? 'ring-2 ring-inset ring-blue-500 z-10' : ''}`}
                    style={{ width: colWidths[h] }}
                    onClick={() => setSelectedCell({ r: rIdx, c: h })}
                  >
                    <input
                      className="w-full h-full px-2 bg-transparent border-none outline-none text-xs font-sans text-gray-800 dark:text-gray-200"
                      value={row[h] || ''}
                      onChange={(e) => handleCellEdit(row.id, h, e.target.value)}
                    />
                  </div>
                );
              })}
            </div>
          ))}
          {/* Lazy Load Spinner */}
          {visibleCount < rows.length && (
             <div className="flex justify-center p-4 bg-gray-50 dark:bg-[#252525]">
                <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};