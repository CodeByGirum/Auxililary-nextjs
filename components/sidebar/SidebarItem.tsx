import React from 'react';

interface SidebarItemProps {
  icon: any;
  to: string;
  active?: boolean;
  label: string;
  isExpanded: boolean;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({ 
  icon: Icon, 
  to, 
  active = false, 
  label, 
  isExpanded 
}) => {
  return (
    <div
      onClick={() => { window.location.hash = to; }}
      className={`
        flex items-center gap-3 h-9 transition-colors duration-200 group rounded-none no-underline cursor-pointer
        ${active 
          ? 'bg-gray-200 dark:bg-[#2a2a2a] text-black dark:text-white' 
          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#212121] hover:text-black dark:hover:text-white'
        }
        ${isExpanded ? 'px-6 w-full' : 'w-full justify-center px-0'}
      `}
    >
      <Icon size={15} strokeWidth={1.5} className="flex-shrink-0" />
      
      {isExpanded && (
        <span className="text-sm font-medium whitespace-nowrap">
          {label}
        </span>
      )}
      
      {/* Tooltip for collapsed state */}
      {!isExpanded && (
        <div className="fixed left-14 z-50 hidden group-hover:block bg-gray-900 dark:bg-white text-white dark:text-black text-xs px-2 py-1 font-medium whitespace-nowrap shadow-sm">
          {label}
        </div>
      )}
    </div>
  );
};