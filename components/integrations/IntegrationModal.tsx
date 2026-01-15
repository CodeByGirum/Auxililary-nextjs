import React, { useState, useEffect } from 'react';
import { X, Check, ArrowRight, Loader2, Puzzle } from 'lucide-react';
import { Integration } from '../../types/integration';

export const IntegrationModal = ({ integration, onClose }: { integration: Integration | null, onClose: () => void }) => {
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
