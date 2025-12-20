
import React from 'react';
import { AlertCircle } from 'lucide-react';
import { CodeBlock } from './CodeBlock';
import { EmbeddedTable } from './EmbeddedTable';
import { TableData } from '../../types/chat';

interface AnalysisBlockProps {
  code: string;
  result?: {
    type: 'table' | 'text' | 'error';
    data: TableData | string;
    visualHint?: string;
  };
  onExpandTable?: (data: TableData, title: string, visualHint?: string) => void;
}

export const AnalysisBlock: React.FC<AnalysisBlockProps> = ({ code, result, onExpandTable }) => {
  return (
    <div className="my-6 animate-in fade-in duration-300">
      {/* Standard Code Block without extra wrapping frame */}
      <CodeBlock language="sql" code={code} />

      {/* Result Area - Standalone Table or Text */}
      {result && (
        <div className="mt-4">
           {result.type === 'error' && (
             <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-xs rounded-xl border border-red-100 dark:border-red-800 flex gap-2 items-start font-mono shadow-sm">
                 <AlertCircle size={14} className="mt-0.5 flex-shrink-0" />
                 {result.data as string}
             </div>
           )}

           {result.type === 'text' && (
             <div className="rounded-xl border border-gray-200 dark:border-[#333] overflow-hidden bg-white dark:bg-[#1e1e1e] shadow-sm">
                <div className="px-4 py-2 border-b border-gray-200 dark:border-[#333] bg-gray-50 dark:bg-[#252525]">
                   <span className="text-[10px] font-bold uppercase text-gray-500 tracking-wider">Output</span>
                </div>
                <pre className="font-mono text-xs text-gray-800 dark:text-gray-300 whitespace-pre-wrap p-4">
                   {result.data as string}
                </pre>
             </div>
           )}
           
           {result.type === 'table' && (
             <EmbeddedTable 
                data={result.data as TableData} 
                fileName="Analysis Result" 
                visualHint={result.visualHint}
                onExpand={() => onExpandTable && onExpandTable(result.data as TableData, "Analysis Result", result.visualHint)} 
             />
           )}
        </div>
      )}
    </div>
  );
};
