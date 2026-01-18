
import React, { useState, useRef } from 'react';
import { X, ArrowRight, Upload, File, Trash2, Database } from 'lucide-react';
import { TableData } from '../types/chat';
import { Dataset } from './datasets/DatasetCard';
import { formatFileSize } from '../utils/fileHelpers';

import { parseCSV, parseJSON } from '../utils/tableUtils';

interface CreateDatasetModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (dataset: Dataset) => void;
}

export const CreateDatasetModal: React.FC<CreateDatasetModalProps> = ({ isOpen, onClose, onCreate }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [files, setFiles] = useState<File[]>([]);
    const [nameError, setNameError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    if (!isOpen) return null;

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFiles(prev => [...prev, ...Array.from(e.target.files!)]);
        }
    };

    const removeFile = (index: number) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async () => {
        if (!name.trim()) {
            setNameError(true);
            return;
        }

        setIsLoading(true);

        // Determine type from file extension if possible
        let sourceType = 'Manual Upload';
        let fileType = 'CSV';
        let tableData: TableData = { headers: [], rows: [] };

        if (files.length > 0) {
            const file = files[0];
            const fileName = file.name;
            const ext = fileName.split('.').pop()?.toUpperCase() || 'CSV';
            fileType = ext;
            sourceType = 'Upload';

            try {
                const text = await new Promise<string>((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = (e) => resolve(e.target?.result as string);
                    reader.onerror = reject;
                    reader.readAsText(file);
                });

                if (ext === 'CSV') {
                    tableData = parseCSV(text);
                } else if (ext === 'JSON') {
                    tableData = parseJSON(text);
                } else {
                    // Fallback for unsupported types in this demo
                    tableData = {
                        headers: ['Info'],
                        rows: [{ 'Info': 'Preview not available for this file type' }]
                    };
                }
            } catch (error) {
                console.error("Error reading file:", error);
            }
        } else {
            // Create a simple default table if no file
            tableData = {
                headers: ['Column 1', 'Column 2', 'Column 3'],
                rows: [
                    { 'Column 1': 'Data 1', 'Column 2': 'Data 2', 'Column 3': 'Data 3' },
                ]
            };
        }

        const newDataset: Dataset = {
            id: Date.now().toString(),
            name: name.trim(),
            source: sourceType,
            type: fileType,
            updated: 'Just now',
            status: 'Not deployed',
            data: tableData,
        };

        onCreate(newDataset);

        // Reset
        setName('');
        setDescription('');
        setFiles([]);
        setNameError(false);
        setIsLoading(false);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity p-4 animate-in fade-in duration-200">
            <div
                className="bg-white dark:bg-[#1f1f1f] w-full max-w-2xl rounded-2xl shadow-2xl border border-gray-100 dark:border-[#333] flex flex-col overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-[#2f2f2f]">
                    <h2 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">Import Data</h2>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-[#2f2f2f] dark:text-gray-400 rounded-full transition-colors focus:outline-none focus:ring-0"
                    >
                        <X size={18} strokeWidth={1.5} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto no-scrollbar p-6 md:p-8">
                    <div className="space-y-8">

                        {/* Title & Desc */}
                        <div className="space-y-6">
                            <div className="group">
                                <div className="flex justify-between items-baseline">
                                    <label className={`block text-[10px] font-bold uppercase tracking-widest mb-2 transition-colors ${nameError ? 'text-red-500' : 'text-gray-400 group-focus-within:text-black dark:group-focus-within:text-white'}`}>
                                        Dataset Name <span className="text-red-500">*</span>
                                    </label>
                                    {nameError && <span className="text-[10px] font-medium text-red-500 animate-in fade-in">Required</span>}
                                </div>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => {
                                        setName(e.target.value);
                                        if (e.target.value.trim()) setNameError(false);
                                    }}
                                    placeholder="e.g. Q3 Sales Data"
                                    className={`
                        w-full text-xl font-medium bg-transparent border-b py-2 focus:outline-none focus:ring-0 transition-colors 
                        text-gray-900 dark:text-white
                        ${nameError
                                            ? 'border-red-500 placeholder-red-300 dark:placeholder-red-900/50'
                                            : 'border-gray-200 dark:border-[#333] focus:border-gray-400 dark:focus:border-gray-500 placeholder-gray-300 dark:placeholder-gray-600'
                                        }
                    `}
                                    autoFocus
                                />
                            </div>
                            <div className="group">
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 group-focus-within:text-black dark:group-focus-within:text-white transition-colors">Description <span className="normal-case opacity-50 font-medium tracking-normal text-gray-300 dark:text-gray-600">(Optional)</span></label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Briefly describe the dataset source and contents..."
                                    className="w-full bg-transparent border-b border-gray-200 dark:border-[#333] py-2 focus:border-gray-400 dark:focus:border-gray-500 focus:outline-none focus:ring-0 transition-colors resize-none text-sm text-gray-600 dark:text-gray-300 h-16 placeholder-gray-300 dark:placeholder-gray-600 leading-relaxed"
                                />
                            </div>
                        </div>

                        {/* Data Uploads */}
                        <div>
                            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Upload Data</label>

                            <input
                                type="file"
                                multiple
                                ref={fileInputRef}
                                onChange={handleFileSelect}
                                className="hidden"
                            />

                            <div className="space-y-3">
                                {/* Upload Button */}
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-full flex items-center justify-center gap-2 p-8 border-2 border-dashed border-gray-200 dark:border-[#333] rounded-xl text-gray-400 hover:text-black dark:hover:text-white hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-[#252525] transition-all group"
                                >
                                    <div className="w-10 h-10 rounded-full bg-gray-50 dark:bg-[#2a2a2a] flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <Upload size={20} />
                                    </div>
                                    <span className="text-sm font-medium">Click to upload files (CSV, JSON, Excel)</span>
                                </button>

                                {/* File List */}
                                {files.length > 0 && (
                                    <div className="grid grid-cols-1 gap-2 animate-in fade-in slide-in-from-bottom-2">
                                        {files.map((file, i) => (
                                            <div key={i} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-[#252525] rounded-lg border border-gray-100 dark:border-[#333]">
                                                <div className="flex items-center gap-3 overflow-hidden">
                                                    <div className="w-8 h-8 rounded bg-white dark:bg-[#333] flex items-center justify-center border border-gray-200 dark:border-[#444] text-blue-500">
                                                        <Database size={16} />
                                                    </div>
                                                    <div className="min-w-0">
                                                        <div className="text-sm font-medium text-gray-900 dark:text-white truncate">{file.name}</div>
                                                        <div className="text-[10px] text-gray-500">{formatFileSize(file.size)}</div>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => removeFile(i)}
                                                    className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-gray-100 dark:border-[#2f2f2f] bg-gray-50/50 dark:bg-[#1a1a1a] flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-5 py-2.5 rounded-full text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#333] transition-colors focus:outline-none focus:ring-0"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold text-white dark:text-black bg-black dark:bg-white hover:opacity-90 transition-all shadow-lg active:scale-95 focus:outline-none focus:ring-0 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <span>{isLoading ? 'Importing...' : 'Import Dataset'}</span>
                        {!isLoading && <ArrowRight size={16} strokeWidth={2} />}
                    </button>
                </div>
            </div>
        </div>
    );
};
