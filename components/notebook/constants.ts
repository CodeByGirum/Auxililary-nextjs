import {
    Heading1, Heading2, Heading3, List, CheckSquare, MessageSquare,
    FileText, Minus, Type
} from 'lucide-react';

export const textBlockTypes = [
    { id: 'paragraph', label: 'Paragraph', icon: Type, prefix: '', shortcut: 'abc' },
    { id: 'h1', label: 'Heading 1', icon: Heading1, prefix: '# ', shortcut: 'H1' },
    { id: 'h2', label: 'Heading 2', icon: Heading2, prefix: '## ', shortcut: 'H2' },
    { id: 'h3', label: 'Heading 3', icon: Heading3, prefix: '### ', shortcut: 'H3' },
    { id: 'bullet', label: 'Bulleted list', icon: List, prefix: '- ', shortcut: '•' },
    { id: 'todo', label: 'To-do list', icon: CheckSquare, prefix: '- [ ] ', shortcut: '☑' },
    { id: 'callout', label: 'Callout', icon: MessageSquare, prefix: '> **Note**\n> ', shortcut: '💬' },
    { id: 'markdown', label: 'Markdown', icon: FileText, prefix: '', shortcut: 'M↓' },
    { id: 'separator', label: 'Separator', icon: Minus, prefix: '---\n', shortcut: '—' },
];
