/**
 * app/notebooks/[id]/page.tsx
 * 
 * Purpose: 
 * Dynamic route handler for individual notebook pages.
 * Fetches specific notebook data based on ID and fetches the NotebookEditor.
 * 
 * Outline:
 * - Page: Server component (async).
 * - params: Promise containing route parameters.
 * - NotebookEditor: The interactive editor component.
 */

import React from 'react';
import { MOCK_NOTEBOOKS } from '../../../constants';
import { NotebookEditor } from '../../../components/NotebookEditor';

// In Next.js 15, params is a Promise
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    // Await the params promise to extract ID
    const { id } = await params;

    // Simulate fetching data (lookup in mock constant)
    const notebook = MOCK_NOTEBOOKS.find(n => n.id === id);

    if (!notebook) {
        return (
            <div className="flex items-center justify-center h-full text-gray-500">
                Notebook not found
            </div>
        );
    }

    return <NotebookEditor notebook={notebook} />;
}
