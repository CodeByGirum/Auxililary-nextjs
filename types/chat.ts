

export interface TableData {
  headers: string[];
  rows: Record<string, any>[];
  metadata?: {
    pivotConfig?: any;
    notebookReport?: any;
    visualsConfig?: any;
    filters?: Record<string, string>;
    sortConfig?: { key: string; dir: 'asc' | 'desc' } | null;
  };
}

export interface Attachment {
  file: File;
  previewUrl: string;
  base64: string;
  mimeType: string;
  name: string;
  size: number;
  tableData?: TableData;
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  isStreaming?: boolean;
  groundingMetadata?: any;
  timestamp: Date;
  feedback?: 'like' | 'dislike' | null;
  attachments?: Attachment[];
  executionResult?: {
    type: 'table' | 'text' | 'error';
    data: TableData | string;
    visualHint?: 'bar' | 'line' | 'pie' | 'scatter';
  };
  executionResults?: Record<number, {
    type: 'table' | 'text' | 'error';
    data: TableData | string;
    visualHint?: 'bar' | 'line' | 'pie' | 'scatter';
  }>;
}

export interface ModelOption {
  id: string;
  name: string;
  desc: string;
}