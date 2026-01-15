"use client";
import React from 'react';
import { AppProvider } from '@/context/AppContext';
import { ThemeProvider } from '@/context/ThemeContext';

import { ToastProvider } from '@/context/ToastContext';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider>
            <AppProvider>
                <ToastProvider>
                    {children}
                </ToastProvider>
            </AppProvider>
        </ThemeProvider>
    )
}
