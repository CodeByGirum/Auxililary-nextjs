'use client';

import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { Integration } from '../../types/integration';
import { MOCK_INTEGRATIONS } from './data';
import { IntegrationCard, RequestCard } from '../../components/integrations/IntegrationCard';
import { IntegrationModal } from '../../components/integrations/IntegrationModal';

export default function IntegrationsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);

    const filteredIntegrations = MOCK_INTEGRATIONS.filter(i =>
        i.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-6 md:p-10 pb-20 max-w-[1600px] mx-auto">

            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-10 gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight mb-2">Integrations</h1>
                    <p className="text-gray-500 dark:text-gray-400">Supercharge your workspace by connecting your favorite marketing tools.</p>
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
                            placeholder="Search integrations..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="block w-full pl-10 pr-3 py-2 bg-white dark:bg-[#1f1f1f] border border-gray-200 dark:border-[#333] rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
                        />
                    </div>

                    <button className="flex items-center justify-center gap-2 px-4 py-2 bg-white dark:bg-[#1f1f1f] border border-gray-200 dark:border-[#333] rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-[#2a2a2a] transition-colors text-gray-700 dark:text-gray-200 shadow-sm w-full sm:w-auto">
                        <Filter size={16} strokeWidth={1.5} />
                        <span>Filter</span>
                    </button>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredIntegrations.map((integration) => (
                    <IntegrationCard
                        key={integration.id}
                        integration={integration}
                        onClick={() => setSelectedIntegration(integration)}
                    />
                ))}
                <RequestCard />
            </div>

            {/* Modal */}
            {selectedIntegration && (
                <IntegrationModal
                    integration={selectedIntegration}
                    onClose={() => setSelectedIntegration(null)}
                />
            )}
        </div>
    );
}
