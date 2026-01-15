import React from 'react';
import { Cpu, Zap, Database, Terminal, FileText } from 'lucide-react';
import { Environment, Compute } from '../../types';

export const EnvBadge = ({ env }: { env: Environment }) => {
    const configs: Record<Environment, any> = {
        python: { icon: Terminal, label: 'Python 3.11', color: 'text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400' },
        r: { icon: FileText, label: 'R 4.2', color: 'text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400' },
        sql: { icon: Database, label: 'SQL (AlaSQL)', color: 'text-orange-600 bg-orange-50 dark:bg-orange-900/20 dark:text-orange-400' },
        'python-lite': { icon: Zap, label: 'Python Lite', color: 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 dark:text-yellow-400' },
    };
    const cfg = configs[env] || configs.python;
    return (
        <div className={`flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium border border-transparent ${cfg.color}`}>
            <cfg.icon size={12} />
            {cfg.label}
        </div>
    );
};

export const ComputeBadge = ({ comp }: { comp: Compute }) => {
    const configs: Record<Compute, any> = {
        'cpu-std': { icon: Cpu, label: 'Std (2 vCPU)', color: 'text-gray-600 bg-gray-100 dark:bg-[#333] dark:text-gray-300' },
        'cpu-pro': { icon: Cpu, label: 'Pro (8 vCPU)', color: 'text-purple-600 bg-purple-50 dark:bg-purple-900/20 dark:text-purple-400' },
        'gpu-t4': { icon: Zap, label: 'GPU (NVIDIA T4)', color: 'text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400' },
        'tpu-v5': { icon: Zap, label: 'TPU v5', color: 'text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400' },
    };
    const cfg = configs[comp] || configs['cpu-std'];
    return (
        <div className={`flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium border border-transparent ${cfg.color}`}>
            <cfg.icon size={12} />
            {cfg.label}
        </div>
    );
};
