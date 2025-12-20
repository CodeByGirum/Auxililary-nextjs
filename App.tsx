
import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { RightPanel } from './components/RightPanel';
import { TopBar } from './components/TopBar';
import { SettingsModal } from './components/SettingsModal';
import { ThemeProvider } from './context/ThemeContext';

// Pages
import { NewChat } from './pages/NewChat';
import { SearchPage } from './pages/SearchPage';
import { Projects } from './pages/Projects';
import { Datasets } from './pages/Datasets';
import { Notebooks } from './pages/Notebooks';
import { Integrations } from './pages/Integrations';
import { Published } from './pages/Published';
import { TableData } from './types/chat';

const INITIAL_CHATS = [
  { id: 'c1', title: 'React Component Gen' },
  { id: 'c2', title: 'Debug Python Script' },
  { id: 'c3', title: 'Email Drafts' },
  { id: 'c4', title: 'SQL Query Help' }
];

const Layout = ({ children, currentPath, sidebarProps }: any) => {
  const [rightPanelOpen, setRightPanelOpen] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Determine if we should show the default TopBar
  const showTopBar = currentPath !== '/';

  return (
    <div className="flex h-screen bg-white dark:bg-[#212121] text-gray-900 dark:text-gray-100 font-sans transition-colors duration-200 overflow-hidden">
      
      {/* Sidebar */}
      <Sidebar 
        isExpanded={sidebarExpanded} 
        toggleSidebar={() => setSidebarExpanded(!sidebarExpanded)} 
        onOpenSettings={() => setSettingsOpen(true)}
        onNotificationClick={() => setRightPanelOpen(!rightPanelOpen)}
        currentPath={currentPath}
        {...sidebarProps}
      />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 relative h-full transition-all duration-300">
        {showTopBar && <TopBar currentPath={currentPath} />}
        
        <main className="flex-1 overflow-y-auto scroll-smooth">
          <div className="max-w-full mx-auto w-full h-full">
            {children}
          </div>
        </main>

        {/* Trigger Zone for Right Panel */}
        <div 
          className="fixed right-0 top-16 bottom-0 w-4 z-40 cursor-default hidden lg:block"
          onMouseEnter={() => setRightPanelOpen(true)}
        />
      </div>
      
      {/* Right Panel */}
      <RightPanel isOpen={rightPanelOpen} onClose={() => setRightPanelOpen(false)} />

      {/* Settings Modal */}
      <SettingsModal isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </div>
  );
};

const App = () => {
  const [currentPath, setCurrentPath] = useState(() => {
      return window.location.hash.slice(1) || '/';
  });

  // Lifted Chat History State
  const [chatHistory, setChatHistory] = useState(INITIAL_CHATS);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

  // Lifted State for Dataset -> Chat interaction
  const [incomingDataset, setIncomingDataset] = useState<{name: string, data: TableData, source: string} | null>(null);

  useEffect(() => {
      const handleHashChange = () => {
          const path = window.location.hash.slice(1) || '/';
          setCurrentPath(path);
      };
      window.addEventListener('hashchange', handleHashChange);
      return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Chat History Handlers
  const handleChatUpdate = (id: string, title: string) => {
    setChatHistory(prev => {
      const exists = prev.find(c => c.id === id);
      if (exists) {
        return prev.map(c => c.id === id ? { ...c, title } : c);
      }
      // Add new chat to top
      return [{ id, title }, ...prev];
    });
  };

  const handleRenameChat = (id: string, newTitle: string) => {
    setChatHistory(prev => prev.map(c => c.id === id ? { ...c, title: newTitle } : c));
  };

  const handleDeleteChat = (id: string) => {
    setChatHistory(prev => prev.filter(c => c.id !== id));
    if (selectedChatId === id) setSelectedChatId(null);
  };

  const handleReorderChats = (newOrder: typeof chatHistory) => {
    setChatHistory(newOrder);
  };

  const handleSelectChat = (id: string) => {
    setSelectedChatId(id);
    // Ensure we are on the chat page
    window.location.hash = '/';
  };

  const handleOpenDataset = (dataset: {name: string, data: TableData, source: string}) => {
    setIncomingDataset(dataset);
    window.location.hash = '/';
  };

  const renderPage = () => {
    switch (currentPath) {
      case '/': 
        return (
          <NewChat 
            onChatUpdate={handleChatUpdate} 
            selectedChatId={selectedChatId} 
            incomingDataset={incomingDataset}
            onClearIncomingDataset={() => setIncomingDataset(null)}
          />
        );
      case '/search': return <SearchPage />;
      case '/projects': return <Projects />;
      case '/datasets': return <Datasets onOpenDataset={handleOpenDataset} />;
      case '/notebooks': return <Notebooks />;
      case '/integrations': return <Integrations />;
      case '/published': return <Published />;
      default: 
        return (
          <NewChat 
            onChatUpdate={handleChatUpdate} 
            selectedChatId={selectedChatId}
            incomingDataset={incomingDataset}
            onClearIncomingDataset={() => setIncomingDataset(null)}
          />
        );
    }
  };

  return (
    <ThemeProvider>
        <Layout 
          currentPath={currentPath}
          sidebarProps={{
            chatHistory,
            onRenameChat: handleRenameChat,
            onDeleteChat: handleDeleteChat,
            onReorderChats: handleReorderChats,
            onSelectChat: handleSelectChat
          }}
        >
          {renderPage()}
        </Layout>
    </ThemeProvider>
  );
};

export default App;
