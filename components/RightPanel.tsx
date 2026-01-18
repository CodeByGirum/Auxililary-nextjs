/**
 * RightPanel.tsx
 * 
 * Purpose: 
 * A sliding side panel that displays user notifications and recent activity logs.
 * 
 * Outline:
 * - RightPanel: Main container component with slide animation.
 * - Notifications list: Displays recent alerts.
 * - Activities list: Displays user actions.
 */

import React from 'react';
import { NOTIFICATIONS, ACTIVITIES } from '../constants';
import { X } from 'lucide-react';

interface RightPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RightPanel = ({ isOpen, onClose }: RightPanelProps) => {
  const panelRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && panelRef.current && !panelRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  return (
    <div
      ref={panelRef}
      className={`
        fixed top-16 right-4 w-80 max-h-[calc(100vh-5rem)]
        bg-white/80 dark:bg-[#09090b]/80 backdrop-blur-xl
        border border-gray-200 dark:border-white/10 
        rounded-xl shadow-2xl z-50 
        transform transition-all duration-300 cubic-bezier(0.16, 1, 0.3, 1)
        ${isOpen ? 'translate-x-0 opacity-100 scale-100' : 'translate-x-8 opacity-0 scale-95 pointer-events-none'}
      `}
    >
      <div className="flex flex-col overflow-hidden rounded-xl">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-white/5">
          <h3 className="font-medium text-sm text-gray-900 dark:text-white flex items-center gap-2">
            Notifications
            <span className="flex h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
          </h3>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg transition-all duration-200"
          >
            <X size={14} />
          </button>
        </div>

        <div className="overflow-y-auto p-2 subtle-scrollbar">
          {/* Notifications List */}
          <div className="space-y-1">
            <h4 className="px-2 py-2 text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Recent</h4>
            <div className="space-y-0.5">
              {NOTIFICATIONS.map((item) => (
                <div key={item.id} className="flex gap-3 items-start group cursor-pointer p-2 rounded-lg hover:bg-white/50 dark:hover:bg-white/5 transition-all duration-200">
                  <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden flex-shrink-0 border border-gray-100 dark:border-white/10">
                    <img src={item.avatar} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-600 dark:text-gray-300 leading-snug">
                      <span className="font-medium text-gray-900 dark:text-gray-100">{item.user}</span> {item.action}
                    </p>
                    <p className="text-[10px] font-medium text-gray-400 mt-1">
                      {item.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="h-4"></div>

            <h4 className="px-2 py-2 text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Activity</h4>
            <div className="space-y-0.5">
              {ACTIVITIES.map((item) => (
                <div key={item.id} className="flex gap-3 items-start p-2 rounded-lg hover:bg-white/50 dark:hover:bg-white/5 transition-all duration-200">
                  <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden flex-shrink-0 border border-gray-100 dark:border-white/10">
                    <img src={item.avatar} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-600 dark:text-gray-300 leading-snug">
                      <span className="font-medium text-gray-900 dark:text-gray-100">{item.user}</span> {item.action}
                    </p>
                    <p className="text-[10px] font-medium text-gray-400 mt-1">
                      {item.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};