'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Search, Filter, Plus, X, Check, ArrowRight, Loader2, Puzzle } from 'lucide-react';

interface Integration {
    id: string;
    name: string;
    logo: string;
    status: 'Connected' | 'Not Connected';
    badge?: string;
    description: string;
    category?: 'Marketing' | 'Social' | 'Database' | 'Communication';
}

const MOCK_INTEGRATIONS: Integration[] = [
    {
        id: '1',
        name: 'Google Ads',
        logo: 'https://logo.clearbit.com/ads.google.com',
        status: 'Not Connected',
        badge: 'Recommended',
        description: 'Import ad spend, impressions, and conversion data directly.',
        category: 'Marketing'
    },
    {
        id: '2',
        name: 'Meta Ads',
        logo: 'https://logo.clearbit.com/facebook.com',
        status: 'Connected',
        description: 'Sync Facebook and Instagram campaign performance metrics.',
        category: 'Marketing'
    },
    {
        id: '3',
        name: 'TikTok Ads',
        logo: 'https://logo.clearbit.com/tiktok.com',
        status: 'Not Connected',
        badge: 'Trending',
        description: 'Analyze TikTok campaign performance and audience insights.',
        category: 'Marketing'
    },
    {
        id: '4',
        name: 'Google Analytics 4',
        logo: 'https://logo.clearbit.com/analytics.google.com',
        status: 'Not Connected',
        description: 'Comprehensive web traffic, user behavior, and event tracking.',
        category: 'Marketing'
    },
    {
        id: '5',
        name: 'Google Search Console',
        logo: 'https://www.gstatic.com/images/branding/product/1x/search_console_64dp.png',
        status: 'Not Connected',
        description: 'Monitor search performance, indexing status, and keywords.',
        category: 'Marketing'
    },
    {
        id: '6',
        name: 'HubSpot',
        logo: 'https://logo.clearbit.com/hubspot.com',
        status: 'Not Connected',
        description: 'Sync CRM contacts, deal pipelines, and marketing emails.',
        category: 'Marketing'
    },
    {
        id: '7',
        name: 'Salesforce',
        logo: 'https://logo.clearbit.com/salesforce.com',
        status: 'Not Connected',
        description: 'Enterprise CRM data integration for leads and opportunities.',
        category: 'Marketing'
    },
    {
        id: '8',
        name: 'Shopify',
        logo: 'https://logo.clearbit.com/shopify.com',
        status: 'Not Connected',
        description: 'Connect e-commerce sales, product inventory, and customer data.',
        category: 'Marketing'
    },
    {
        id: '9',
        name: 'Klaviyo',
        logo: 'https://logo.clearbit.com/klaviyo.com',
        status: 'Not Connected',
        description: 'Email marketing automation metrics and subscriber lists.',
        category: 'Marketing'
    },
    {
        id: '10',
        name: 'LinkedIn Ads',
        logo: 'https://logo.clearbit.com/linkedin.com',
        status: 'Not Connected',
        description: 'B2B advertising performance and demographic data.',
        category: 'Marketing'
    },
    {
        id: '11',
        name: 'Microsoft Ads',
        logo: 'https://logo.clearbit.com/microsoft.com',
        status: 'Not Connected',
        description: 'Reach customers across the Microsoft Search Network.',
        category: 'Marketing'
    },
    {
        id: '12',
        name: 'Instagram',
        logo: 'https://logo.clearbit.com/instagram.com',
        status: 'Not Connected',
        description: 'Track engagement, reach, and follower growth metrics.',
        category: 'Social'
    },
    {
        id: '13',
        name: 'Slack',
        logo: 'https://logo.clearbit.com/slack.com',
        status: 'Not Connected',
        description: 'Receive automated reports and alerts in your channels.',
        category: 'Communication'
    },
    {
        id: '14',
        name: 'Telegram',
        logo: 'https://logo.clearbit.com/telegram.org',
        status: 'Not Connected',
        description: 'Send data summaries and notifications to Telegram groups.',
        category: 'Communication'
    },
    {
        id: '15',
        name: 'Amazon S3',
        logo: 'https://logo.clearbit.com/aws.amazon.com',
        status: 'Not Connected',
        description: 'Import and export large datasets from S3 buckets.',
        category: 'Database'
    },
    {
        id: '16',
        name: 'MySQL',
        logo: 'https://logo.clearbit.com/mysql.com',
        status: 'Not Connected',
        description: 'Connect directly to your relational SQL databases.',
        category: 'Database'
    },
    {
        id: '17',
        name: 'MongoDB',
        logo: 'https://logo.clearbit.com/mongodb.com',
        status: 'Not Connected',
        description: 'Analyze NoSQL document collections and JSON data.',
        category: 'Database'
    },
    {
        id: '18',
        name: 'Mailchimp',
        logo: 'https://logo.clearbit.com/mailchimp.com',
        status: 'Not Connected',
        description: 'Marketing automation platform and email marketing service.',
        category: 'Marketing'
    },
    {
        id: '19',
        name: 'Semrush',
        logo: 'https://logo.clearbit.com/semrush.com',
        status: 'Not Connected',
        description: 'Online visibility management and content marketing SaaS.',
        category: 'Marketing'
    },
    {
        id: '20',
        name: 'PostgreSQL',
        logo: 'https://logo.clearbit.com/postgresql.org',
        status: 'Not Connected',
        description: 'Open source object-relational database system.',
        category: 'Database'
    }
];

const IntegrationCard: React.FC<{ integration: Integration; onClick: () => void }> = ({ integration, onClick }) => (
    <div
        onClick={onClick}
        className="group relative flex flex-col items-center p-6 bg-white dark:bg-[#1f1f1f] rounded-2xl border border-gray-200 dark:border-[#333] shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 cursor-pointer active:scale-[0.98] active:translate-y-0"
    >
        {/* Badge */}
        {integration.badge && (
            <div className="absolute top-3 right-3 px-2 py-0.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-[10px] font-semibold uppercase tracking-wide rounded-full border border-blue-100 dark:border-blue-800/50">
                {integration.badge}
            </div>
        )}

        {/* Logo */}
        <div className="w-16 h-16 mb-4 rounded-2xl bg-white dark:bg-[#2a2a2a] shadow-sm border border-gray-100 dark:border-[#333] flex items-center justify-center overflow-hidden p-2.5">
            <img
                src={integration.logo}
                alt={integration.name}
                className="w-full h-full object-contain"
                onError={(e) => { (e.target as HTMLImageElement).src = 'https://logo.clearbit.com/google.com'; }}
            />
        </div>

        {/* Name */}
        <h3 className="text-base font-medium text-gray-900 dark:text-white mb-1 text-center tracking-tight">{integration.name}</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center line-clamp-2 mb-6 h-8 leading-relaxed">{integration.description}</p>

        {/* Status Pill */}
        <div className="mt-auto w-full flex justify-center">
            <div className={`
            flex items-center gap-1.5 px-3 py-1 rounded-full border text-[11px] font-medium transition-colors
            ${integration.status === 'Connected'
                    ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-900/50 text-green-700 dark:text-green-400'
                    : 'bg-gray-50/50 dark:bg-[#2a2a2a] border-gray-200 dark:border-[#333] text-gray-500 dark:text-gray-400'
                }
        `}>
                <div className={`w-1.5 h-1.5 rounded-full ${integration.status === 'Connected' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                {integration.status}
            </div>
        </div>
    </div>
);

const RequestCard = () => (
    <div className="group flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-dashed border-gray-200 dark:border-[#333] hover:border-gray-300 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-[#2a2a2a] transition-all duration-300 cursor-pointer active:scale-[0.98] min-h-[240px]">
        <div className="w-12 h-12 mb-3 rounded-full bg-gray-100 dark:bg-[#333] flex items-center justify-center text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors">
            <Plus size={24} strokeWidth={1.5} />
        </div>
        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 group-hover:text-black dark:group-hover:text-white">Request an Integration</h3>
        <p className="text-xs text-gray-400 text-center mt-1">Don&apos;t see what you need?</p>
    </div>
);

const IntegrationModal = ({ integration, onClose }: { integration: Integration | null, onClose: () => void }) => {
    const [isConnecting, setIsConnecting] = useState(false);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        if (integration) {
            setIsConnected(integration.status === 'Connected');
            setIsConnecting(false);
        }
    }, [integration]);

    if (!integration) return null;

    const handleConnect = () => {
        if (isConnected) return;
        setIsConnecting(true);
        setTimeout(() => {
            setIsConnecting(false);
            setIsConnected(true);
            // In a real app, you would trigger a global state update here
            setTimeout(onClose, 500);
        }, 1500);
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm transition-opacity animate-in fade-in duration-200">
            <div
                className="bg-white dark:bg-[#1e1e1e] w-full max-w-[440px] rounded-2xl shadow-2xl border border-gray-200 dark:border-[#333] overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="relative p-8 flex flex-col items-center text-center">
                    <button
                        onClick={onClose}
                        className="absolute top-4 left-4 p-2 text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#333] rounded-full transition-colors"
                    >
                        <X size={18} strokeWidth={1.5} />
                    </button>

                    <div className="w-24 h-24 mb-6 rounded-3xl bg-white dark:bg-[#2a2a2a] shadow-lg border border-gray-100 dark:border-[#333] flex items-center justify-center p-4">
                        <img src={integration.logo} alt="" className="w-full h-full object-contain" />
                    </div>

                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        {isConnected ? 'Manage' : 'Connect'} {integration.name}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 max-w-xs mx-auto leading-relaxed">
                        {integration.description}
                    </p>

                    <div className="w-full space-y-3">
                        <button
                            onClick={handleConnect}
                            disabled={isConnecting}
                            className={`
                                w-full py-3 font-medium text-sm rounded-xl hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2
                                ${isConnected
                                    ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-900/50'
                                    : 'bg-black dark:bg-white text-white dark:text-black'
                                }
                            `}
                        >
                            {isConnecting ? <Loader2 size={18} className="animate-spin" /> : isConnected ? <Check size={18} /> : <Puzzle size={18} />}
                            {isConnecting ? 'Connecting...' : (isConnected ? 'Connected' : 'Connect Integration')}
                        </button>

                        {isConnected && (
                            <button className="w-full py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 font-medium text-sm rounded-xl transition-colors">
                                Disconnect
                            </button>
                        )}
                    </div>
                </div>

                <div className="bg-gray-50 dark:bg-[#252525] px-6 py-4 border-t border-gray-100 dark:border-[#333] flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-green-500"></div> End-to-end Encrypted</span>
                    <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1 transition-colors">Documentation <ArrowRight size={10} /></a>
                </div>
            </div>
        </div>
    );
};

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
