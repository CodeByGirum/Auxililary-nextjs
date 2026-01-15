/**
 * TopBar.tsx
 * 
 * Purpose: 
 * The persistent top navigation bar displayed on content pages, showing the current page title
 * and global actions like sharing.
 * 
 * Outline:
 * - TopBar: Main component.
 * - Dynamic Title: Logic to derive title from current route.
 * - Share Action: Copy URL to clipboard with toast notification.
 */

import React, { useCallback } from 'react';
import { Share2 } from 'lucide-react';
import { useToast } from '../context/ToastContext';

interface TopBarProps {
  currentPath: string;
}

export const TopBar = ({ currentPath }: TopBarProps) => {
  const { showToast } = useToast();

  /**
   * Derives the display title from the current route path.
   * Simple string manipulation for now; could be replaced by a route config map.
   */
  const getTitle = () => {
    const path = currentPath;
    if (path === '/') return 'New Chat';
    if (path === '/search') return 'Search';
    // Capitalize first letter
    return path.substring(1).charAt(0).toUpperCase() + path.slice(2);
  };

  /**
   * Copies the current page URL to the clipboard.
   * Uses the global toast notification for feedback.
   */
  const handleShare = useCallback(() => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      showToast('Workspace link copied to clipboard');
    });
  }, [showToast]);

  return (
    <header className="h-14 flex items-center justify-between px-4 sticky top-0 z-30 bg-white/80 dark:bg-[#212121]/80 backdrop-blur-sm">
      {/* Left / Title Area */}
      <div className="flex items-center gap-2 px-3 py-1.5 mx-auto md:mx-0">
        <h1 className="text-sm font-semibold text-gray-600 dark:text-gray-300 tracking-tight">
          {getTitle()}
        </h1>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-1">
        <button
          onClick={handleShare}
          className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-[#2f2f2f] dark:text-gray-400 rounded-md transition-colors"
          aria-label="Share current page"
        >
          <Share2 size={18} strokeWidth={1.5} />
        </button>
      </div>
    </header>
  );
};
