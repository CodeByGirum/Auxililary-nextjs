/**
 * app/page.tsx
 * 
 * Purpose: 
 * The main Home page of the application, rendering the default Chat interface.
 * 
 * Outline:
 * - Page: Main server/client component.
 * - NewChat: Core chat component.
 */

"use client";
import React from 'react';
import { NewChat } from '@/components/NewChat';
import { useApp } from '@/context/AppContext';

export default function Page() {
    // Access global state for updating chat titles and handling shared datasets
    const { updateChatTitle, incomingDataset, setIncomingDataset, selectedChatId } = useApp();

    return (
        <NewChat
            onChatUpdate={updateChatTitle}
            selectedChatId={selectedChatId}
            incomingDataset={incomingDataset}
            onClearIncomingDataset={() => setIncomingDataset(null)}
        />
    );
}
