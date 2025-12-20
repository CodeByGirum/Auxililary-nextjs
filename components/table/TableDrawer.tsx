

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { TableData } from '../../types/chat';
import { Grid, Settings2, PieChart, Sparkles, Table as TableIcon, X } from 'lucide-react';
import { DataGridView } from './views/DataGridView';
import { PivotView } from './views/PivotView';
import { VisualsView } from './views/VisualsView';
import { NotebookView } from './views/NotebookView';
import { PivotConfig } from '../../utils/tableUtils';
import { NotebookReport } from '../types';

interface TableDrawerProps {
  isOpen: boolean;
  data: TableData | null;
  fileName: string;
  visualHint?: string;
  onClose: () => void;
  onSave: (newData: TableData) => void;
  mode?: 'fixed' | 'inline';
}

export const TableDrawer: React.FC<TableDrawerProps> = ({
  isOpen,
  data,
  fileName,
  visualHint,
  onClose,
  onSave,
  mode = 'fixed',
}) => {
  const [activeTab, setActiveTab] = useState<'data' | 'pivot' | 'visuals' | 'analysis'>('data');
  
  // Data State
  const [rows, setRows] = useState<any[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  
  // Lifted View States for Persistence
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [sortConfig, setSortConfig] = useState<{ key: string; dir: 'asc' | 'desc' } | null>(null);
  
  const [pivotConfig, setPivotConfig] = useState<PivotConfig>({
    rows: [], columns: [], values: [], aggregation: 'sum'
  });
  
  const [visualsConfig, setVisualsConfig] = useState<{ chartType: 'bar' | 'pie' | 'line', themeColor: string }>({
    chartType: 'bar', themeColor: 'blue'
  });
  
  const [notebookReport, setNotebookReport] = useState<NotebookReport | null>(null);

  // Initialize State on Data Change (or Switch Tab/File)
  useEffect(() => {
    if (data) {
      setRows(data.rows);
      setHeaders(data.headers);

      // Restore metadata if available, otherwise reset defaults ONLY if switching files (simulated by data change with mismatched ID or forced logic)
      // Here we rely on data.metadata to contain the persisted state.
      if (data.metadata) {
         if (data.metadata.filters) setFilters(data.metadata.filters);
         if (data.metadata.sortConfig) setSortConfig(data.metadata.sortConfig);
         if (data.metadata.pivotConfig) setPivotConfig(data.metadata.pivotConfig);
         if (data.metadata.visualsConfig) setVisualsConfig(data.metadata.visualsConfig);
         if (data.metadata.notebookReport) setNotebookReport(data.metadata.notebookReport);
      } else {
         // Reset to defaults if no metadata (new file load context)
         setFilters({});
         setSortConfig(null);
         setPivotConfig({ rows: [], columns: [], values: [], aggregation: 'sum' });
         setVisualsConfig({ chartType: 'bar', themeColor: 'blue' });
         setNotebookReport(null);
      }

      if (visualHint) {
        setActiveTab('visuals');
        if (['bar', 'pie', 'line'].includes(visualHint)) {
            setVisualsConfig(prev => ({ ...prev, chartType: visualHint as any }));
        }
      } else {
         // Keep current tab active if switching data, unless it's a fresh open? 
         // For now, let's keep it simple.
      }
    }
  }, [data, fileName, visualHint]);

  // Centralized Save Handler
  // This updates the parent state with both data and current view configurations
  const persistState = useCallback((
    newRows = rows, 
    newPivot = pivotConfig, 
    newVisuals = visualsConfig, 
    newNotebook = notebookReport,
    newFilters = filters,
    newSort = sortConfig
  ) => {
      const metadata = {
          pivotConfig: newPivot,
          visualsConfig: newVisuals,
          notebookReport: newNotebook,
          filters: newFilters,
          sortConfig: newSort
      };
      onSave({ headers, rows: newRows, metadata });
  }, [headers, rows, pivotConfig, visualsConfig, notebookReport, filters, sortConfig, onSave]);

  // Individual State Setters Wrappers
  // These update local state AND persist to parent immediately
  
  const handleRowUpdate = useCallback((id: string, updates: Record<string, any>) => {
    const newRows = rows.map(r => r.id === id ? { ...r, ...updates } : r);
    setRows(newRows);
    persistState(newRows);
  }, [rows, persistState]);

  const handleAddRow = useCallback(() => {
    const newRow: any = { id: `row-${Date.now()}` };
    headers.forEach(h => newRow[h] = '');
    const newRows = [...rows, newRow];
    setRows(newRows);
    persistState(newRows);
  }, [rows, headers, persistState]);

  const handleDeleteRow = useCallback((id: string) => {
    const newRows = rows.filter(r => r.id !== id);
    setRows(newRows);
    persistState(newRows);
  }, [rows, persistState]);

  const updatePivotConfig = useCallback((newConfig: PivotConfig) => {
      setPivotConfig(newConfig);
      persistState(rows, newConfig);
  }, [persistState, rows]);

  const updateVisualsConfig = useCallback((newConfig: any) => {
      setVisualsConfig(newConfig);
      persistState(rows, pivotConfig, newConfig);
  }, [persistState, rows, pivotConfig]);

  const updateNotebookReport = useCallback((newReport: NotebookReport | null) => {
      setNotebookReport(newReport);
      persistState(rows, pivotConfig, visualsConfig, newReport);
  }, [persistState, rows, pivotConfig, visualsConfig]);

  // Derived Data Processing for Grid
  const processedRows = useMemo(() => {
    let res = [...rows];
    Object.keys(filters).forEach((key) => {
      const val = filters[key].toLowerCase();
      if (val) res = res.filter((r) => r[key]?.toString().toLowerCase().includes(val));
    });
    if (sortConfig) {
      res.sort((a, b) => {
        const av = a[sortConfig.key];
        const bv = b[sortConfig.key];
        if (av < bv) return sortConfig.dir === 'asc' ? -1 : 1;
        if (av > bv) return sortConfig.dir === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return res;
  }, [rows, filters, sortConfig]);

  const containerClasses =
    mode === 'inline'
      ? 'w-full h-full flex flex-col bg-white dark:bg-[#1e1e1e] overflow-hidden'
      : `fixed inset-y-0 right-0 z-[60] w-[95vw] md:w-[90vw] lg:w-[1200px] bg-white dark:bg-[#1e1e1e] shadow-2xl transform transition-transform duration-300 ease-in-out border-l border-gray-200 dark:border-[#333] flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`;

  if (mode === 'inline' && !isOpen) return null;

  return (
    <div className={containerClasses}>
      {/* Header Section */}
      <div className="h-14 flex items-center justify-between px-6 flex-shrink-0 bg-white/80 dark:bg-[#1e1e1e]/80 backdrop-blur-md border-b border-gray-200 dark:border-[#333] z-10">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-8 h-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-600 dark:text-blue-400">
            <TableIcon size={18} />
          </div>
          <div className="flex flex-col">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white">{fileName}</h2>
            <span className="text-[10px] text-gray-500 dark:text-gray-400">Data View</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="hidden md:flex bg-gray-100 dark:bg-[#2a2a2a] p-1 rounded-lg">
          {[
            { id: 'data', label: 'Grid', icon: Grid },
            { id: 'pivot', label: 'Pivot', icon: Settings2 },
            { id: 'visuals', label: 'Chart', icon: PieChart },
            { id: 'analysis', label: 'Notebook', icon: Sparkles },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-white dark:bg-[#333] text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
              }`}
            >
              <tab.icon size={14} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              persistState(); // Explicit save call
              if (mode === 'fixed') onClose();
            }}
            className="px-4 py-1.5 bg-black dark:bg-white text-white dark:text-black text-xs font-medium rounded-lg hover:opacity-80 transition-opacity"
          >
            Save
          </button>
          {mode === 'fixed' && (
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-[#333] rounded-lg transition-colors"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden flex items-center gap-1 px-4 bg-white dark:bg-[#1e1e1e] border-b border-gray-200 dark:border-[#333] overflow-x-auto no-scrollbar">
        {[{ id: 'data', label: 'Grid' }, { id: 'pivot', label: 'Pivot' }, { id: 'visuals', label: 'Chart' }, { id: 'analysis', label: 'Notebook' }].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-3 text-xs font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === tab.id
                ? 'border-black dark:border-white text-black dark:text-white'
                : 'border-transparent text-gray-500 dark:text-gray-400'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden relative bg-[#F5F5F7] dark:bg-[#1e1e1e]">
        {activeTab === 'data' && (
          <DataGridView
            headers={headers}
            rows={processedRows}
            onRowUpdate={handleRowUpdate}
            onAddRow={handleAddRow}
            onDeleteRow={handleDeleteRow}
            filters={filters}
            setFilters={(f) => { setFilters(f); persistState(rows, pivotConfig, visualsConfig, notebookReport, f, sortConfig); }}
            sortConfig={sortConfig}
            setSortConfig={(s) => { setSortConfig(s); persistState(rows, pivotConfig, visualsConfig, notebookReport, filters, s); }}
          />
        )}
        {activeTab === 'pivot' && (
           <PivotView 
              headers={headers} 
              rows={processedRows} 
              config={pivotConfig}
              setConfig={updatePivotConfig}
           />
        )}
        {activeTab === 'visuals' && (
          <VisualsView
            headers={headers}
            rows={processedRows}
            fileName={fileName}
            config={visualsConfig}
            setConfig={updateVisualsConfig}
          />
        )}
        {activeTab === 'analysis' && (
          <NotebookView
            headers={headers}
            rows={processedRows}
            fileName={fileName}
            report={notebookReport}
            setReport={updateNotebookReport}
            triggerOnMount={!notebookReport}
          />
        )}
      </div>
    </div>
  );
};