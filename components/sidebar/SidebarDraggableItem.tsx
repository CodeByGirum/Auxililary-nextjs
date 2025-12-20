import React, { useState, useRef, useEffect } from 'react';
import { MoreHorizontal, Edit2, Trash2 } from 'lucide-react';

interface SidebarDraggableItemProps {
  id: string;
  index: number;
  label: string;
  icon?: any;
  onRename: (id: string, newName: string) => void;
  onDelete: (id: string) => void;
  onDragStart: (index: number) => void;
  onDragEnter: (index: number) => void;
  onDragEnd: () => void;
  onClick?: () => void;
}

export const SidebarDraggableItem: React.FC<SidebarDraggableItemProps> = ({ 
  id, index, label, icon: Icon, onRename, onDelete, onDragStart, onDragEnter, onDragEnd, onClick
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(label);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleRenameSubmit = () => {
    if (editValue.trim()) {
      onRename(id, editValue.trim());
    } else {
      setEditValue(label);
    }
    setIsEditing(false);
    setShowMenu(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleRenameSubmit();
    if (e.key === 'Escape') {
      setEditValue(label);
      setIsEditing(false);
    }
  };

  return (
    <div 
      draggable={!isEditing}
      onDragStart={() => onDragStart(index)}
      onDragEnter={() => onDragEnter(index)}
      onDragEnd={onDragEnd}
      onDragOver={(e) => e.preventDefault()}
      onClick={onClick}
      className="group relative flex items-center justify-between px-6 py-1 text-[13px] text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#212121] hover:text-black dark:hover:text-white cursor-pointer transition-colors rounded-none"
    >
      <div className="flex items-center gap-3 overflow-hidden w-full">
        {Icon && <Icon size={14} strokeWidth={1.5} className="flex-shrink-0 opacity-70" />}
        
        {isEditing ? (
          <div className="flex items-center w-full" onClick={(e) => e.stopPropagation()}>
             <input
              ref={inputRef}
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={handleRenameSubmit}
              className="w-full bg-transparent border-b border-black dark:border-white outline-none text-black dark:text-white text-sm p-0 rounded-none"
             />
          </div>
        ) : (
          <span className="truncate select-none">{label}</span>
        )}
      </div>

      {!isEditing && (
        <div className="relative">
          <button 
            onClick={(e) => { e.stopPropagation(); setShowMenu(!showMenu); }}
            className={`opacity-0 group-hover:opacity-100 text-gray-400 hover:text-black dark:hover:text-white transition-opacity p-1 ${showMenu ? 'opacity-100' : ''}`}
          >
            <MoreHorizontal size={14} />
          </button>
          {showMenu && (
            <div ref={menuRef} className="absolute right-0 top-6 z-50 w-32 bg-white dark:bg-[#1f1f1f] border border-gray-200 dark:border-[#333] shadow-xl rounded-sm py-1 flex flex-col animate-in fade-in zoom-in-95 duration-100 origin-top-right">
              <button 
                onClick={(e) => { e.stopPropagation(); setIsEditing(true); setShowMenu(false); }}
                className="flex items-center gap-2 px-3 py-2 text-xs text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#2a2a2a] text-left rounded-none transition-colors"
              >
                <Edit2 size={12} /> <span>Rename</span>
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); onDelete(id); }}
                className="flex items-center gap-2 px-3 py-2 text-xs text-red-600 hover:bg-red-50 dark:hover:bg-[#2a2a2a] text-left rounded-none transition-colors"
              >
                <Trash2 size={12} /> <span>Delete</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};