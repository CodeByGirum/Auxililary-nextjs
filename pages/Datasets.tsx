
import React, { useState, useEffect, useRef } from 'react';
import { EmbeddedTable } from '../components/chat/EmbeddedTable';
import { TableDrawer } from '../components/table/TableDrawer';
import { TableData } from '../types/chat';
import { Filter, Plus, CheckCircle2, Search, BookOpen, MessageSquare, Check, Copy, Archive, Trash2 } from 'lucide-react';

// Mock Data Generation
const MOCK_DATASETS = [
  {
    id: '1',
    name: 'Retail Sales Forecast Demo',
    source: 'Salesforce',
    type: 'CSV',
    updated: 'Last Monday at 12:33 AM',
    status: 'Not deployed',
    data: {
      headers: ['Store ID', 'Employee ID', 'Area', 'Date'],
      rows: [
        { 'Store ID': 1, 'Employee ID': 54, 'Area': 'Asia', 'Date': '2018-01-31' },
        { 'Store ID': 1, 'Employee ID': 57, 'Area': 'Asia', 'Date': '2018-02-28' },
        { 'Store ID': 1, 'Employee ID': 50, 'Area': 'Asia', 'Date': '2018-03-31' },
        { 'Store ID': 1, 'Employee ID': 56, 'Area': 'Asia', 'Date': '2018-04-30' },
      ]
    }
  },
  {
    id: '2',
    name: 'Employee Attrition Demo',
    source: 'Workday',
    type: 'XLSX',
    updated: '06/27/2025',
    status: 'Not deployed',
    visualHint: 'bar',
    data: {
      headers: ['Job Title', 'Years of Exp', 'Department', 'Salary Range'],
      rows: [
        { 'Job Title': 'Assistant', 'Years of Exp': 25, 'Department': 'Sales', 'Salary Range': 'High' },
        { 'Job Title': 'Consultant', 'Years of Exp': 29, 'Department': 'Customer Service', 'Salary Range': 'Medium' },
        { 'Job Title': 'Executive', 'Years of Exp': 6, 'Department': 'Sales', 'Salary Range': 'High' },
        { 'Job Title': 'Consultant', 'Years of Exp': 3, 'Department': 'Marketing', 'Salary Range': 'Medium' },
      ]
    }
  },
  {
    id: '3',
    name: 'inconsistent_dataset',
    source: 'Manual Upload',
    type: 'JSON',
    updated: '12/04/2024',
    status: 'Not deployed',
    data: {
      headers: ['Product_ID', 'Price', 'Advertising', 'Budget'],
      rows: [
        { 'Product_ID': 'P001', 'Price': null, 'Advertising': null, 'Budget': null },
        { 'Product_ID': 'P002', 'Price': 150, 'Advertising': 510.0, 'Budget': 11500.0 },
        { 'Product_ID': 'P003', 'Price': 200, 'Advertising': 520.0, 'Budget': 12000.0 },
        { 'Product_ID': 'P004', 'Price': 250, 'Advertising': 530.0, 'Budget': 12500.0 },
      ]
    }
  },
  {
    id: '4',
    name: 'Sentiment Model',
    source: 'HuggingFace',
    type: 'Parquet',
    updated: '12/02/2024',
    status: 'Deployed',
    visualHint: 'pie',
    data: {
      headers: ['Review Text', 'Review', 'Review_Binary'],
      rows: [
        { 'Review Text': 'Wow... Loved this place.', 'Review': 'Positive', 'Review_Binary': 1 },
        { 'Review Text': 'Crust is not good.', 'Review': 'Negative', 'Review_Binary': 0 },
        { 'Review Text': 'Not tasty and texture bad.', 'Review': 'Negative', 'Review_Binary': 0 },
        { 'Review Text': 'Stopped by during late May...', 'Review': 'Positive', 'Review_Binary': 1 },
      ]
    }
  },
  {
    id: '5',
    name: 'Lead Scoring Demo',
    source: 'HubSpot',
    type: 'CSV',
    updated: '11/27/2024',
    status: 'Not deployed',
    data: {
      headers: ['Job Title', 'Years of Exp', 'Company Size', 'Industry'],
      rows: [
        { 'Job Title': 'Assistant', 'Years of Exp': 23, 'Company Size': 'Large', 'Industry': 'IT' },
        { 'Job Title': 'Manager', 'Years of Exp': 23, 'Company Size': 'Large', 'Industry': 'Finance' },
        { 'Job Title': 'Manager', 'Years of Exp': 24, 'Company Size': 'Large', 'Industry': 'Finance' },
        { 'Job Title': 'Executive', 'Years of Exp': 3, 'Company Size': 'Large', 'Industry': 'Healthcare' },
      ]
    }
  },
  {
    id: '6',
    name: 'Churn Prediction Demo',
    source: 'Salesforce',
    type: 'CSV',
    updated: '11/27/2024',
    status: 'Not deployed',
    data: {
      headers: ['Customer_ID', 'Tenure', 'MonthlyCharges', 'TotalCharges'],
      rows: [
        { 'Customer_ID': 'C1001', 'Tenure': 12, 'MonthlyCharges': 70.5, 'TotalCharges': 846.0 },
        { 'Customer_ID': 'C1002', 'Tenure': 24, 'MonthlyCharges': 85.0, 'TotalCharges': 2040.0 },
        { 'Customer_ID': 'C1003', 'Tenure': 5, 'MonthlyCharges': 50.0, 'TotalCharges': 250.0 },
        { 'Customer_ID': 'C1004', 'Tenure': 36, 'MonthlyCharges': 90.0, 'TotalCharges': 3240.0 },
      ]
    }
  },
  {
    id: '7',
    name: 'Credit Card Fraud Demo',
    source: 'Stripe',
    type: 'JSON',
    updated: '11/27/2024',
    status: 'Not deployed',
    data: {
      headers: ['Transaction_ID', 'Transaction_Type', 'Currency', 'Amount'],
      rows: [
        { 'Transaction_ID': 7271, 'Transaction_Type': 'US', 'Currency': 'AUD', 'Amount': 1 },
        { 'Transaction_ID': 861, 'Transaction_Type': 'US', 'Currency': 'AUD', 'Amount': 8 },
        { 'Transaction_ID': 5391, 'Transaction_Type': 'US', 'Currency': 'CAD', 'Amount': 12 },
        { 'Transaction_ID': 5192, 'Transaction_Type': 'US', 'Currency': 'USD', 'Amount': 5 },
      ]
    }
  }
];

interface DatasetsProps {
  onOpenDataset?: (dataset: {name: string, data: TableData, source: string}) => void;
}

export const Datasets: React.FC<DatasetsProps> = ({ onOpenDataset }) => {
  const [datasets, setDatasets] = useState(MOCK_DATASETS);
  const [searchQuery, setSearchQuery] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeTable, setActiveTable] = useState<{ data: TableData, name: string } | null>(null);
  
  // Filter & Menu State
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const filterRef = useRef<HTMLDivElement>(null);

  const handleExpand = (data: TableData, name: string) => {
    setActiveTable({ data, name });
    setDrawerOpen(true);
  };

  // Close filter when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setFilterOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Extract unique sources for filter
  const sources = Array.from(new Set(MOCK_DATASETS.map(d => d.source)));

  const toggleSource = (source: string) => {
    setSelectedSources(prev => 
        prev.includes(source) ? prev.filter(s => s !== source) : [...prev, source]
    );
  };

  // Filter Logic
  const displayedDatasets = datasets.filter(d => {
    const matchesSearch = 
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.type.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSource = selectedSources.length === 0 || selectedSources.includes(d.source);
    
    return matchesSearch && matchesSource;
  });

  const handleOpenInChat = (ds: typeof MOCK_DATASETS[0]) => {
    if (onOpenDataset) {
        onOpenDataset({ name: ds.name, data: ds.data, source: ds.source });
    }
    setActiveMenuId(null);
  };

  const handleDuplicate = (id: string) => {
    const original = datasets.find(d => d.id === id);
    if (original) {
        const newDs = {
            ...original,
            id: Date.now().toString(),
            name: `${original.name} (Copy)`,
            updated: 'Just now',
            status: 'Not deployed' // Reset status for copy
        };
        setDatasets([newDs, ...datasets]);
    }
    setActiveMenuId(null);
  };

  const handleDelete = (id: string) => {
      setDatasets(datasets.filter(d => d.id !== id));
      setActiveMenuId(null);
  };

  const handleArchive = (id: string) => {
     // Treating archive as delete for the list view for now
     handleDelete(id);
  };

  return (
    <div className="p-6 md:p-10 pb-20 max-w-[1600px] mx-auto" onClick={() => setActiveMenuId(null)}>
      
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-6">
        <div>
           <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight mb-2">Datasets</h1>
           <p className="text-gray-500 dark:text-gray-400">Manage and analyze your connected data sources.</p>
        </div>
        
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto z-20">
           
           {/* Search Bar */}
           <div className="relative w-full sm:w-72 group">
               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                   <Search size={16} className="text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200" />
               </div>
               <input 
                  type="text" 
                  placeholder="Search datasets..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 bg-white dark:bg-[#1f1f1f] border border-gray-200 dark:border-[#333] rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
               />
           </div>

           <div className="flex items-center gap-3 w-full sm:w-auto">
               {/* Filter Menu */}
               <div className="relative flex-1 sm:flex-none" ref={filterRef}>
                   <button 
                        onClick={(e) => { e.stopPropagation(); setFilterOpen(!filterOpen); }}
                        className={`flex w-full items-center justify-center gap-2 px-4 py-2 bg-white dark:bg-[#1f1f1f] border border-gray-200 dark:border-[#333] rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-[#2a2a2a] transition-colors text-gray-700 dark:text-gray-200 shadow-sm active:scale-95 ${filterOpen ? 'ring-2 ring-blue-500/20 border-blue-500' : ''}`}
                   >
                        <Filter size={16} strokeWidth={1.5} />
                        <span>Filter</span>
                        {selectedSources.length > 0 && (
                            <span className="ml-1 flex items-center justify-center w-5 h-5 bg-blue-600 text-white text-[10px] rounded-full">
                                {selectedSources.length}
                            </span>
                        )}
                   </button>

                   {filterOpen && (
                       <div className="absolute top-full right-0 mt-2 w-56 bg-white dark:bg-[#1f1f1f] border border-gray-200 dark:border-[#333] rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-100 z-50">
                           <div className="p-2 bg-gray-50 dark:bg-[#252525] border-b border-gray-100 dark:border-[#333]">
                               <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-2">Filter by Source</span>
                           </div>
                           <div className="p-1.5 max-h-64 overflow-y-auto custom-scrollbar">
                               {sources.map(s => (
                                   <button 
                                       key={s}
                                       onClick={(e) => { e.stopPropagation(); toggleSource(s); }}
                                       className="flex items-center gap-3 w-full px-2 py-2 text-sm text-left rounded-lg hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition-colors"
                                   >
                                       <div className={`w-4 h-4 border rounded-md flex items-center justify-center transition-colors ${selectedSources.includes(s) ? 'bg-black dark:bg-white border-transparent' : 'border-gray-300 dark:border-[#444]'}`}>
                                            {selectedSources.includes(s) && <Check size={10} className="text-white dark:text-black" strokeWidth={3} />}
                                       </div>
                                       <span className="text-gray-700 dark:text-gray-200 truncate">{s}</span>
                                   </button>
                               ))}
                               {sources.length === 0 && <div className="p-4 text-center text-gray-400 text-xs">No sources found</div>}
                           </div>
                           {selectedSources.length > 0 && (
                               <div className="p-2 border-t border-gray-100 dark:border-[#333]">
                                   <button onClick={() => setSelectedSources([])} className="w-full py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                                       Clear Filters
                                   </button>
                               </div>
                           )}
                       </div>
                   )}
               </div>

               <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2 bg-black dark:bg-white text-white dark:text-black border border-transparent rounded-lg text-sm font-medium hover:opacity-90 transition-opacity shadow-sm active:scale-95">
                    <Plus size={16} strokeWidth={1.5} />
                    <span className="hidden sm:inline">Import Data</span>
                    <span className="sm:hidden">Import</span>
               </button>
           </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
        {displayedDatasets.map((ds) => (
          <div 
            key={ds.id}
            onClick={(e) => {
                e.stopPropagation();
                setActiveMenuId(activeMenuId === ds.id ? null : ds.id);
            }}
            className={`
               relative flex flex-col gap-3 p-2 rounded-2xl transition-all duration-200 group border border-transparent
               hover:bg-gray-50 dark:hover:bg-[#1a1a1a] cursor-pointer
               ${activeMenuId === ds.id ? 'bg-gray-50 dark:bg-[#1a1a1a]' : ''}
            `}
          >
            {/* Context Menu Overlay */}
            {activeMenuId === ds.id && (
                <div 
                    className="absolute inset-0 z-50 flex items-center justify-center bg-white/40 dark:bg-black/40 backdrop-blur-[1px] rounded-2xl animate-in fade-in duration-200" 
                    onClick={(e) => { e.stopPropagation(); setActiveMenuId(null); }}
                >
                    <div className="bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#333] shadow-2xl p-1.5 min-w-[220px] rounded-xl animate-in zoom-in-95 slide-in-from-bottom-2 duration-200">
                         <div className="space-y-0.5">
                            <button 
                                onClick={(e) => { e.stopPropagation(); setActiveMenuId(null); }}
                                className="group flex items-center gap-3 w-full px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition-colors rounded-md"
                            >
                                <BookOpen size={16} className="text-gray-500 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors" />
                                <span>Open in Notebook</span>
                            </button>
                            <button 
                                onClick={(e) => { e.stopPropagation(); handleOpenInChat(ds); }}
                                className="group flex items-center gap-3 w-full px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition-colors rounded-md"
                            >
                                <MessageSquare size={16} className="text-gray-500 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors" />
                                <span>Open in Chat</span>
                            </button>
                         </div>

                         <div className="h-px bg-gray-100 dark:bg-[#333] my-1.5 mx-1"></div>

                         <div className="space-y-0.5">
                            <button 
                                onClick={(e) => { e.stopPropagation(); handleDuplicate(ds.id); }}
                                className="group flex items-center gap-3 w-full px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition-colors rounded-md"
                            >
                                <Copy size={16} className="text-gray-500 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors" />
                                <span>Duplicate</span>
                            </button>
                             <button 
                                onClick={(e) => { e.stopPropagation(); handleArchive(ds.id); }}
                                className="group flex items-center gap-3 w-full px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition-colors rounded-md"
                            >
                                <Archive size={16} className="text-gray-500 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors" />
                                <span>Archive</span>
                            </button>
                         </div>

                         <div className="h-px bg-gray-100 dark:bg-[#333] my-1.5 mx-1"></div>

                         <button 
                            onClick={(e) => { e.stopPropagation(); handleDelete(ds.id); }}
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
                 data={ds.data} 
                 fileName={ds.name} 
                 source={ds.source}
                 visualHint={ds.visualHint}
                 onExpand={() => handleExpand(ds.data, ds.name)} 
               />
            </div>

            {/* Metadata Footer */}
            <div className="px-2 flex justify-between items-center min-h-[24px]">
               <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 font-medium">
                     {ds.status === 'Deployed' && (
                        <>
                            <span className="flex items-center gap-1.5 text-green-600 dark:text-green-400">
                                <CheckCircle2 size={12} />
                                {ds.status}
                            </span>
                            <span className="text-gray-300 dark:text-gray-600">•</span>
                        </>
                     )}
                     <span className="text-[11px] text-gray-400">{ds.updated}</span>
                  </div>
               </div>
               
               <div className="flex items-center gap-2">
                   <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-[#2a2a2a] px-2 py-0.5 rounded border border-gray-200 dark:border-[#333] uppercase tracking-wider">
                      {ds.type}
                   </span>
               </div>
            </div>
          </div>
        ))}
        
        {/* Empty State for Search/Filter */}
        {displayedDatasets.length === 0 && (
           <div className="col-span-full flex flex-col items-center justify-center py-20 text-gray-400">
              <div className="w-16 h-16 bg-gray-100 dark:bg-[#2a2a2a] rounded-full flex items-center justify-center mb-4">
                  <Search size={24} strokeWidth={1.5} className="opacity-50" />
              </div>
              <p className="text-sm font-medium">No datasets found matching your criteria.</p>
              <button onClick={() => { setSearchQuery(''); setSelectedSources([]); }} className="mt-2 text-xs text-blue-600 hover:underline">Clear all filters</button>
           </div>
        )}
      </div>

      {/* Drawer for Full View */}
      <TableDrawer 
        isOpen={drawerOpen}
        data={activeTable?.data || null}
        fileName={activeTable?.name || ''}
        onClose={() => setDrawerOpen(false)}
        onSave={() => {}}
      />
    </div>
  );
};
