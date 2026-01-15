'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { TableDrawer } from '../../components/table/TableDrawer';
import { TableData } from '../../types/chat';
import { useApp } from '../../context/AppContext';
import { Filter, Plus, Search, Check } from 'lucide-react';
import { MOCK_DATASETS } from './data';
import { Dataset, DatasetCard } from '../../components/datasets/DatasetCard';

export default function DatasetsPage() {
    const router = useRouter();
    const { setIncomingDataset } = useApp();
    const [datasets, setDatasets] = useState<Dataset[]>(MOCK_DATASETS);
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

    const handleOpenInChat = (ds: Dataset) => {
        // Set global context and redirect to home
        setIncomingDataset({ name: ds.name, data: ds.data, source: ds.source });
        setActiveMenuId(null);
        router.push('/');
    };

    const handleDuplicate = (id: string) => {
        const original = datasets.find(d => d.id === id);
        if (original) {
            const newDs: Dataset = {
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
                                <span className="">Filter</span>
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
                    <DatasetCard
                        key={ds.id}
                        dataset={ds}
                        isMenuActive={activeMenuId === ds.id}
                        onMenuToggle={(e) => {
                            e.stopPropagation();
                            setActiveMenuId(activeMenuId === ds.id ? null : ds.id);
                        }}
                        onCloseMenu={(e) => {
                            e.stopPropagation();
                            setActiveMenuId(null);
                        }}
                        onOpenChat={handleOpenInChat}
                        onDuplicate={handleDuplicate}
                        onArchive={handleArchive}
                        onDelete={handleDelete}
                        onExpand={handleExpand}
                    />
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
                onSave={() => { }}
            />
        </div>
    );
}
