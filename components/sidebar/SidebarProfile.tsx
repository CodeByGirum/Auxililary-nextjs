import React, { useState, useRef, useEffect } from 'react';
import { User, Settings, Bell, Sun, Moon, Trash2 } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface SidebarProfileProps {
  isExpanded: boolean;
  onOpenSettings: () => void;
  onNotificationClick: () => void;
}

export const SidebarProfile: React.FC<SidebarProfileProps> = ({ isExpanded, onOpenSettings, onNotificationClick }) => {
  const { theme, toggleTheme } = useTheme();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex-shrink-0 border-t border-gray-200 dark:border-[#333] bg-[#F9F9F9] dark:bg-[#171717] px-3 py-2">
      <div className={`flex items-center ${isExpanded ? 'justify-between' : 'justify-center flex-col'}`}>
          
        <div ref={profileRef} className="relative">
            {showProfileMenu && (
              <div className="absolute bottom-full left-0 mb-2 w-56 bg-white dark:bg-[#212121] border border-gray-200 dark:border-[#333] shadow-xl z-50 flex flex-col py-1 rounded-sm animate-in fade-in slide-in-from-bottom-2 duration-200">
                <div className="px-4 py-3 border-b border-gray-100 dark:border-[#333]">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Alex Morgan</p>
                  <p className="text-xs text-gray-500 truncate">alex.morgan@example.com</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#2a2a2a] hover:text-black dark:hover:text-white transition-colors text-left rounded-none">
                    <User size={14} /> <span>Account</span>
                </button>
                {!isExpanded && (
                    <>
                    <button onClick={toggleTheme} className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#2a2a2a] transition-colors text-left rounded-none">
                        {theme === 'light' ? <Moon size={14} /> : <Sun size={14} />} <span>Toggle Theme</span>
                    </button>
                    <button onClick={onOpenSettings} className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#2a2a2a] transition-colors text-left rounded-none">
                        <Settings size={14} /> <span>Settings</span>
                    </button>
                    </>
                )}
                <div className="h-px bg-gray-100 dark:bg-[#333] my-1"></div>
                <button className="flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-gray-50 dark:hover:bg-[#2a2a2a] transition-colors text-left rounded-none">
                    <Trash2 size={14} /> <span>Log out</span>
                </button>
              </div>
            )}

            <button onClick={() => setShowProfileMenu(!showProfileMenu)} className="flex items-center gap-3 outline-none group">
              <div className="w-7 h-7 rounded bg-white dark:bg-[#333] flex-shrink-0 overflow-hidden border border-gray-200 dark:border-[#444] shadow-sm">
                <img src="https://ui-avatars.com/api/?name=Alex+Morgan&background=random" alt="Profile" className="w-full h-full object-cover" />
              </div>
              {isExpanded && <span className="text-sm font-medium text-gray-900 dark:text-white truncate max-w-[100px]">Alex Morgan</span>}
            </button>
        </div>

        {isExpanded && (
            <div className="flex items-center gap-0.5">
                <button onClick={toggleTheme} className="p-1.5 text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-200 dark:hover:bg-[#2a2a2a] transition-colors rounded-md">
                    {theme === 'light' ? <Sun size={16} strokeWidth={1.5} /> : <Moon size={16} strokeWidth={1.5} />}
                </button>
                <button onClick={onNotificationClick} className="p-1.5 text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-200 dark:hover:bg-[#2a2a2a] transition-colors rounded-md relative">
                    <Bell size={16} strokeWidth={1.5} />
                    <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full border border-[#F9F9F9] dark:border-[#171717]"></span>
                </button>
                <button onClick={onOpenSettings} className="p-1.5 text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-200 dark:hover:bg-[#2a2a2a] transition-colors rounded-md">
                    <Settings size={16} strokeWidth={1.5} />
                </button>
            </div>
        )}
      </div>
    </div>
  );
};