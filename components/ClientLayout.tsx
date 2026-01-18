/**
 * ClientLayout.tsx
 * 
 * Purpose: 
 * The main layout wrapper that persists across page navigations (client-side only).
 * It manages the Sidebar, TopBar, and RightPanel (notifications) state.
 * 
 * Outline:
 * - ClientLayout: Wrapper component.
 * - State: sidebarExpanded, rightPanelOpen, settingsOpen.
 * - Sidebar / RightPanel / SettingsModal: Persistent UI elements.
 */

"use client";
import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Sidebar } from './Sidebar';
import { RightPanel } from './RightPanel';
import { TopBar } from './TopBar';
import { SettingsModal } from './SettingsModal';
import { useApp } from '../context/AppContext';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const { chatHistory, updateChatTitle, deleteChat, setChatHistory, setSelectedChatId } = useApp();

    const [rightPanelOpen, setRightPanelOpen] = useState(false);
    const [sidebarExpanded, setSidebarExpanded] = useState(true);
    const [settingsOpen, setSettingsOpen] = useState(false);

    // Auto-collapse sidebar on mobile
    React.useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1024) {
                setSidebarExpanded(false);
            } else {
                setSidebarExpanded(true);
            }
        };

        // Initial check
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Hide TopBar on the home page or specific routes if needed
    const showTopBar = pathname !== '/' && !pathname.startsWith('/notebooks/');

    return (
        <div className="flex h-screen bg-white dark:bg-[#212121] text-gray-900 dark:text-gray-100 font-sans transition-colors duration-200 overflow-hidden">
            <Sidebar
                isExpanded={sidebarExpanded}
                toggleSidebar={() => setSidebarExpanded(!sidebarExpanded)}
                onOpenSettings={() => setSettingsOpen(true)}
                onNotificationClick={() => setRightPanelOpen(!rightPanelOpen)}
                currentPath={pathname?.startsWith('/notebooks/') ? '/notebooks' : pathname || '/'}
                chatHistory={chatHistory}
                onRenameChat={updateChatTitle}
                onDeleteChat={deleteChat}
                onSelectChat={(id) => {
                    setSelectedChatId(id);
                    router.push('/');
                }}
                onReorderChats={setChatHistory}
            />
            <div className="flex-1 flex flex-col min-w-0 relative h-full transition-all duration-300">
                {showTopBar && <TopBar currentPath={pathname || '/'} />}
                <main className="flex-1 overflow-y-auto scroll-smooth">
                    <div className="max-w-full mx-auto w-full h-full">
                        {children}
                    </div>
                </main>
                {/* Trigger for Right Panel on hover/edge REMOVED */}
                {/* <div
                    className="fixed right-0 top-16 bottom-0 w-4 z-40 cursor-default hidden lg:block"
                    onMouseEnter={() => setRightPanelOpen(true)}
                /> */}
            </div>
            <RightPanel isOpen={rightPanelOpen} onClose={() => setRightPanelOpen(false)} />
            <SettingsModal isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
        </div>
    );
}
