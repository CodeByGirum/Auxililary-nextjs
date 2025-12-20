import React, { useState, useRef } from 'react';
import { Folder, Database, Book, Puzzle, ChevronLeft, ChevronRight, ExternalLink, Globe } from 'lucide-react';
import { AuxLogo } from './sidebar/AuxLogo';
import { SidebarItem } from './sidebar/SidebarItem';
import { SidebarDraggableItem } from './sidebar/SidebarDraggableItem';
import { SidebarProfile } from './sidebar/SidebarProfile';

interface ChatHistoryItem { id: string; title: string; }
interface SidebarProps {
  isExpanded: boolean;
  toggleSidebar: () => void;
  onOpenSettings: () => void;
  onNotificationClick: () => void;
  currentPath: string;
  chatHistory: ChatHistoryItem[];
  onRenameChat: (id: string, title: string) => void;
  onDeleteChat: (id: string) => void;
  onReorderChats: (chats: ChatHistoryItem[]) => void;
  onSelectChat: (id: string) => void;
}

const INITIAL_NOTEBOOKS = [
  { id: 'n1', title: 'Sentiment Analysis' },
  { id: 'n2', title: 'Data Analysis for Cost' },
  { id: 'n3', title: 'Customer Data Insights' },
  { id: 'n4', title: 'Quarterly Data Clean up' }
];

const primaryNav = [
  { icon: Folder, label: 'Projects', path: '/projects' },
  { icon: Database, label: 'Datasets', path: '/datasets' },
  { icon: Book, label: 'Notebooks', path: '/notebooks' },
  { icon: Puzzle, label: 'Integrations', path: '/integrations' },
];

export const Sidebar = ({ 
  isExpanded, toggleSidebar, onOpenSettings, onNotificationClick, currentPath,
  chatHistory, onDeleteChat, onRenameChat, onReorderChats, onSelectChat
}: SidebarProps) => {
  const [notebooks, setNotebooks] = useState(INITIAL_NOTEBOOKS);
  const dragItem = useRef<number | null>(null);

  const handleRename = (type: 'notebooks' | 'chats', id: string, newName: string) => {
    if (type === 'notebooks') setNotebooks(prev => prev.map(item => item.id === id ? { ...item, title: newName } : item));
    else onRenameChat(id, newName);
  };

  const handleDelete = (type: 'notebooks' | 'chats', id: string) => {
    if (type === 'notebooks') setNotebooks(prev => prev.filter(item => item.id !== id));
    else onDeleteChat(id);
  };

  const handleDragStart = (index: number) => { dragItem.current = index; };
  
  const handleDragEnter = (index: number, type: 'notebooks' | 'chats') => {
    if (dragItem.current === null || dragItem.current === index) return;
    if (type === 'notebooks') {
        const list = [...notebooks];
        const item = list[dragItem.current];
        list.splice(dragItem.current, 1);
        list.splice(index, 0, item);
        dragItem.current = index;
        setNotebooks(list);
    } else {
        const list = [...chatHistory];
        const item = list[dragItem.current];
        list.splice(dragItem.current, 1);
        list.splice(index, 0, item);
        dragItem.current = index;
        onReorderChats(list);
    }
  };

  const handleDragEnd = () => { dragItem.current = null; };

  return (
    <aside className={`h-full bg-[#F9F9F9] dark:bg-[#171717] flex flex-col border-r border-gray-200 dark:border-[#333] z-50 flex-shrink-0 transition-all duration-300 ease-in-out ${isExpanded ? 'w-[280px]' : 'w-[60px]'}`}>
      {/* Header */}
      <div className={`flex items-center h-14 mb-2 flex-shrink-0 ${isExpanded ? 'px-6 justify-between' : 'justify-center'}`}>
        <div className="flex items-center gap-3 text-black dark:text-white"><AuxLogo className="w-5 h-5" /></div>
        <button onClick={toggleSidebar} className="text-gray-400 hover:text-black dark:hover:text-white transition-colors">
             {isExpanded ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-0.5 w-full flex-shrink-0">
        {primaryNav.map((item) => (
          <SidebarItem key={item.path} icon={item.icon} label={item.label} to={item.path} active={currentPath === item.path} isExpanded={isExpanded} />
        ))}
      </nav>

      {/* Draggable Sections */}
      <div className={`flex-1 overflow-y-auto no-scrollbar mt-8 pb-4 ${isExpanded ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="mb-6">
            <h3 className="text-[11px] font-bold text-gray-500 dark:text-gray-500 px-6 mb-2 uppercase tracking-wider">Notebooks</h3>
            <div className="flex flex-col gap-0.5">
                <div onClick={() => window.location.hash = '/published'} className="group flex items-center justify-between px-6 py-1 text-[13px] text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#212121] hover:text-black dark:hover:text-white cursor-pointer transition-colors rounded-none">
                    <div className="flex items-center gap-3 overflow-hidden">
                        <Globe size={14} strokeWidth={1.5} className="flex-shrink-0 opacity-70" /> <span className="truncate">Published</span>
                    </div>
                    <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 text-gray-400 transition-opacity" />
                </div>
                {notebooks.map((item, i) => (
                    <SidebarDraggableItem key={item.id} id={item.id} index={i} label={item.title} onRename={(id, name) => handleRename('notebooks', id, name)} onDelete={(id) => handleDelete('notebooks', id)} onDragStart={handleDragStart} onDragEnter={(idx) => handleDragEnter(idx, 'notebooks')} onDragEnd={handleDragEnd} />
                ))}
            </div>
        </div>

        <div>
            <h3 className="text-[11px] font-bold text-gray-500 dark:text-gray-500 px-6 mb-2 uppercase tracking-wider">Recent Chats</h3>
            <div className="flex flex-col gap-0.5">
                {chatHistory.map((item, i) => (
                    <SidebarDraggableItem key={item.id} id={item.id} index={i} label={item.title} onRename={(id, name) => handleRename('chats', id, name)} onDelete={(id) => handleDelete('chats', id)} onDragStart={handleDragStart} onDragEnter={(idx) => handleDragEnter(idx, 'chats')} onDragEnd={handleDragEnd} onClick={() => onSelectChat(item.id)} />
                ))}
            </div>
        </div>
      </div>

      <SidebarProfile isExpanded={isExpanded} onOpenSettings={onOpenSettings} onNotificationClick={onNotificationClick} />
    </aside>
  );
};