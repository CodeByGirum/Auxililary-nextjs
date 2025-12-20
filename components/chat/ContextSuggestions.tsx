import React from 'react';

interface ContextSuggestionsProps {
  suggestions: string[];
  onSelect: (suggestion: string) => void;
  isLoading?: boolean;
}

export const ContextSuggestions: React.FC<ContextSuggestionsProps> = ({ suggestions, onSelect, isLoading }) => {
  if (suggestions.length === 0 && !isLoading) return null;

  return (
    <div className="w-full max-w-3xl mx-auto px-4 mb-2">
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 fade-in-up">
        {isLoading ? (
          // Loading skeletons
          <div className="flex gap-2 w-full">
             {[1, 2, 3].map(i => (
               <div key={i} className="h-8 w-24 bg-gray-100 dark:bg-[#2f2f2f] rounded-full animate-pulse" />
             ))}
          </div>
        ) : (
          suggestions.map((suggestion, idx) => (
            <button
              key={idx}
              onClick={() => onSelect(suggestion)}
              className="
                flex-shrink-0 px-4 py-2 
                bg-white dark:bg-[#2a2a2a] 
                border border-gray-200 dark:border-[#333] 
                rounded-full text-xs font-medium 
                text-gray-500 dark:text-gray-400 
                hover:bg-gray-50 dark:hover:bg-[#333] 
                hover:text-gray-900 dark:hover:text-white 
                hover:border-gray-300 dark:hover:border-[#555] 
                transition-all duration-200 shadow-sm hover:shadow-md
                animate-in slide-in-from-bottom-2 fade-in fill-mode-both whitespace-nowrap
              "
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {suggestion}
            </button>
          ))
        )}
      </div>
    </div>
  );
};