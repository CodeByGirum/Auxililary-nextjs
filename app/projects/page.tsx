'use client';

import React, { useState } from 'react';
import { MOCK_PROJECTS } from '../../constants';
import { Project } from '../../types';
import { Plus, Search, MoreHorizontal, Filter, X } from 'lucide-react';
import { CreateProjectModal } from '../../components/CreateProjectModal';

/**
 * DocumentIllustration
 * 
 * A decorative component representing the "papers" inside a folder.
 * Uses percentage-based sizing to scale perfectly with its parent.
 */
/**
 * DocumentIllustration
 * 
 * Renders the stack of papers inside the folder.
 * Uses consistent centering and percentage-based sizing for responsiveness.
 */
const DocumentIllustration = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
    <div className={`absolute left-0 right-0 mx-auto w-full h-full flex justify-center items-end ${className}`} style={style}>
        {/* Back Sheet */}
        <div className="absolute bottom-2 w-[70%] sm:w-[50%] lg:w-[45%] h-[85%] bg-white/40 rounded-t-xl transition-all duration-300" />
        {/* Middle Sheet */}
        <div className="absolute bottom-1 w-[80%] sm:w-[60%] lg:w-[55%] h-[90%] bg-white/70 rounded-t-xl shadow-sm transition-all duration-300" />
        {/* Front Sheet */}
        <div className="relative w-[90%] sm:w-[70%] lg:w-[65%] h-[95%] bg-white rounded-t-xl shadow-md p-3 flex flex-col gap-2 transition-all duration-300">
            <div className="w-full h-1.5 bg-gray-100 rounded-full" />
            <div className="w-3/4 h-1.5 bg-gray-100 rounded-full" />
            <div className="w-full h-1.5 bg-gray-100 rounded-full" />
            <div className="w-1/2 h-1.5 bg-gray-100 rounded-full" />
        </div>
    </div>
);

const FolderCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
    const gradients = [
        'bg-gradient-to-br from-[#60a5fa] to-[#2563eb]',
        'bg-gradient-to-br from-[#f472b6] to-[#db2777]',
        'bg-gradient-to-br from-[#fbbf24] to-[#d97706]',
        'bg-gradient-to-br from-[#34d399] to-[#059669]',
        'bg-gradient-to-br from-[#818cf8] to-[#4f46e5]',
    ];

    const bgGradient = gradients[index % gradients.length];

    return (
        <div className="group relative w-full aspect-[4/4.5] sm:aspect-square rounded-[32px] bg-white dark:bg-[#1e1e1e] overflow-hidden transition-all duration-300 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-1 cursor-pointer select-none border border-transparent dark:border-white/5">
            {/* Background Gradient Area */}
            <div className={`absolute top-0 left-0 right-0 h-[65%] ${bgGradient}`}>
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-20 transition-opacity" />
            </div>

            {/* Document Stack */}
            <div className="absolute top-[8%] left-0 right-0 h-[45%] z-0">
                <DocumentIllustration />
            </div>

            {/* Folder Foreground (The Pocket) */}
            <div className="absolute bottom-0 left-0 right-0 h-[55%] z-10">
                {/* The "Tab" visual trick */}
                <div className="absolute -top-[32px] left-0 w-[55%] h-[32px] bg-white dark:bg-[#1e1e1e] rounded-tr-[24px]" />
                {/* The "Curve" connector */}
                <div className="absolute -top-[32px] left-[55%] w-[32px] h-[32px] bg-transparent rounded-bl-[24px] shadow-[-16px_16px_0_0_#ffffff] dark:shadow-[-16px_16px_0_0_#1e1e1e]" />

                {/* Main Card Content */}
                <div className="absolute inset-0 bg-white dark:bg-[#1e1e1e] p-5 md:p-6 flex flex-col justify-between">
                    <div className="min-w-0">
                        {/* Header: Status & Menu */}
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest">
                                {project.status === 'In Progress' ? 'Active' : project.status}
                            </span>
                            <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                                <MoreHorizontal size={18} />
                            </button>
                        </div>

                        {/* Title & Desc */}
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-tight mb-2 truncate">
                            {project.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 hidden sm:block">
                            {project.description || 'No description provided.'}
                        </p>

                        {/* Tags (Desktop Only) */}
                        <div className="hidden sm:flex gap-2 mt-4 flex-wrap">
                            {project.tags?.slice(0, 2).map(tag => (
                                <span key={tag} className="px-3 py-1 rounded-lg bg-gray-100 dark:bg-[#2a2a2a] text-[10px] font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wide">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Footer: Members */}
                    <div className="mt-auto hidden sm:block">
                        <div className="flex -space-x-2">
                            {project.members.slice(0, 3).map((m, i) => (
                                <img
                                    key={i}
                                    src={m}
                                    alt="Member"
                                    className="w-8 h-8 lg:w-10 lg:h-10 rounded-full border-2 border-white dark:border-[#1e1e1e] object-cover"
                                />
                            ))}
                            {project.members.length > 3 && (
                                <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full border-2 border-white dark:border-[#1e1e1e] bg-gray-100 dark:bg-[#333] flex items-center justify-center text-[10px] lg:text-xs font-bold text-gray-500">
                                    +{project.members.length - 3}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function ProjectsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState<string>('All');
    const [projects, setProjects] = useState(MOCK_PROJECTS);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const filteredProjects = projects.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.description?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = filterStatus === 'All' || p.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const statuses = ['All', 'Active', 'Complete', 'Pending'];

    const handleCreateProject = (newProject: Project) => {
        setProjects([newProject, ...projects]);
        setIsCreateModalOpen(false);
    };

    return (
        <div className="min-h-full bg-white dark:bg-[#212121] transition-colors duration-300">
            <div className="px-4 sm:px-6 md:px-10 py-6 md:py-8 max-w-[1600px] mx-auto">
                {/* Header Section */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 md:mb-12 gap-6">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight mb-2 md:mb-3">Projects</h1>
                        <p className="text-gray-500 dark:text-gray-400 text-base md:text-lg max-w-xl">
                            Manage your ongoing work, track progress, and organize your deliverables.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full lg:w-auto">
                        <div className="relative group w-full sm:min-w-[280px]">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black dark:group-focus-within:text-white transition-colors" size={18} />
                            <input
                                type="text"
                                placeholder="Search projects..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 bg-gray-100 dark:bg-[#2f2f2f] rounded-full text-sm font-medium text-gray-900 dark:text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-black/5 dark:focus:ring-white/10 transition-all"
                            />
                        </div>

                        <button
                            onClick={() => setIsCreateModalOpen(true)}
                            className="flex items-center justify-center gap-2 px-6 py-2.5 bg-black dark:bg-white text-white dark:text-black rounded-full font-bold uppercase tracking-wider text-[11px] hover:opacity-90 active:scale-95 transition-all shadow-lg w-full sm:w-auto"
                        >
                            <Plus size={16} strokeWidth={3} />
                            <span>New Project</span>
                        </button>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex items-center gap-2 mb-8 overflow-x-auto no-scrollbar pb-2">
                    {statuses.map(status => (
                        <button
                            key={status}
                            onClick={() => setFilterStatus(status)}
                            className={`
                                px-5 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all whitespace-nowrap
                                ${filterStatus === status
                                    ? 'bg-black dark:bg-white text-white dark:text-black shadow-md'
                                    : 'bg-gray-100 dark:bg-[#2f2f2f] text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-[#383838]'
                                }
                            `}
                        >
                            {status}
                        </button>
                    ))}
                    <div className="w-px h-6 bg-gray-200 dark:bg-[#333] mx-2 hidden sm:block"></div>
                    <button className="p-2 rounded-full bg-gray-100 dark:bg-[#2f2f2f] text-gray-500 hover:text-black dark:hover:text-white transition-colors hidden sm:flex">
                        <Filter size={16} />
                    </button>
                </div>

                {/* Project Grid */}
                {filteredProjects.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 md:gap-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        {filteredProjects.map((project, idx) => (
                            <FolderCard key={project.id} project={project} index={idx} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-32 text-gray-400">
                        <div className="w-20 h-20 bg-gray-50 dark:bg-[#2f2f2f] rounded-full flex items-center justify-center mb-6">
                            <Search size={32} className="opacity-20" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No projects found</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-6">Try adjusting your search or filters.</p>
                        <button
                            onClick={() => { setSearchQuery(''); setFilterStatus('All'); }}
                            className="text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:underline uppercase tracking-widest"
                        >
                            Clear all filters
                        </button>
                    </div>
                )}
            </div>

            <CreateProjectModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onCreate={handleCreateProject}
            />
        </div>
    );
}
