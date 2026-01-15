/**
 * AppContext.tsx
 * 
 * Purpose: 
 * Provides global state management for the application, specifically handling chat history, 
 * selected chat sessions, and shared dataset state.
 * 
 * Outline:
 * - AppContext: The React Context object.
 * - AppProvider: The provider component that wraps the application.
 * - useApp: Custom hook for consuming the context.
 */

"use client";
import React, { createContext, useContext, useState, ReactNode, useMemo, useCallback } from 'react';

interface Chat { id: string; title: string; }
interface AppContextType {
    chatHistory: Chat[];
    setChatHistory: React.Dispatch<React.SetStateAction<Chat[]>>;
    updateChatTitle: (id: string, title: string) => void;
    deleteChat: (id: string) => void;
    incomingDataset: any;
    setIncomingDataset: (data: any) => void;
    selectedChatId: string | null;
    setSelectedChatId: (id: string | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

/**
 * AppProvider Component
 * 
 * Wraps the application to provide global state.
 * Uses useMemo to optimize the context value and prevent unnecessary re-renders.
 */
export function AppProvider({ children }: { children: ReactNode }) {
    const [chatHistory, setChatHistory] = useState<Chat[]>([
        { id: 'c1', title: 'React Component Gen' },
        { id: 'c2', title: 'Debug Python Script' },
        { id: 'c3', title: 'Email Drafts' },
        { id: 'c4', title: 'SQL Query Help' }
    ]);
    const [incomingDataset, setIncomingDataset] = useState<any>(null);
    const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

    // Optimized title update function
    const updateChatTitle = useCallback((id: string, title: string) => {
        setChatHistory(prev => prev.map(c => c.id === id ? { ...c, title } : c));
    }, []);

    // Optimized delete function
    const deleteChat = useCallback((id: string) => {
        setChatHistory(prev => prev.filter(c => c.id !== id));
        if (selectedChatId === id) setSelectedChatId(null);
    }, [selectedChatId]);

    // Memoized context value to prevent re-renders in consumers when unrelated state changes
    const value = useMemo(() => ({
        chatHistory,
        setChatHistory,
        updateChatTitle,
        deleteChat,
        incomingDataset,
        setIncomingDataset,
        selectedChatId,
        setSelectedChatId
    }), [chatHistory, incomingDataset, selectedChatId, updateChatTitle, deleteChat]);

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}

export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) throw new Error("useApp must be used within AppProvider");
    return context;
};
