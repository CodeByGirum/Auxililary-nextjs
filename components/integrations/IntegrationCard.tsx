import React from 'react';
import { Plus } from 'lucide-react';
import { Integration } from '../../types/integration';

export const IntegrationCard: React.FC<{ integration: Integration; onClick: () => void }> = ({ integration, onClick }) => (
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

export const RequestCard = () => (
    <div className="group flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-dashed border-gray-200 dark:border-[#333] hover:border-gray-300 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-[#2a2a2a] transition-all duration-300 cursor-pointer active:scale-[0.98] min-h-[240px]">
        <div className="w-12 h-12 mb-3 rounded-full bg-gray-100 dark:bg-[#333] flex items-center justify-center text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors">
            <Plus size={24} strokeWidth={1.5} />
        </div>
        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 group-hover:text-black dark:group-hover:text-white">Request an Integration</h3>
        <p className="text-xs text-gray-400 text-center mt-1">Don&apos;t see what you need?</p>
    </div>
);
