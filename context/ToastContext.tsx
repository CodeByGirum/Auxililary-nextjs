'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Check, Info, X } from 'lucide-react';

interface Toast {
    id: string;
    message: string;
    type: 'success' | 'info';
}

interface ToastContextType {
    showToast: (msg: string, type?: 'success' | 'info') => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = (message: string, type: 'success' | 'info' = 'success') => {
        const id = Math.random().toString(36).substr(2, 9);
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] flex flex-col gap-2 pointer-events-none">
                {toasts.map(t => (
                    <div key={t.id} className="flex items-center gap-3 px-5 py-3 rounded-full bg-black dark:bg-white text-white dark:text-black shadow-2xl animate-in slide-in-from-bottom-4 duration-300 pointer-events-auto border border-white/10">
                        {t.type === 'success' ? <Check size={16} className="text-green-400" /> : <Info size={16} className="text-blue-400" />}
                        <span className="text-sm font-semibold whitespace-nowrap">{t.message}</span>
                        <button onClick={() => setToasts(prev => prev.filter(toast => toast.id !== t.id))} className="ml-2 opacity-50 hover:opacity-100 transition-opacity">
                            <X size={14} />
                        </button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
}

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) throw new Error("useToast must be used within ToastProvider");
    return context;
};
