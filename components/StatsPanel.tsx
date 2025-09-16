import React from 'react';
import type { SortStats } from '../types';
import BrutalCard from './ui/BrutalCard';

interface StatsPanelProps {
  stats: SortStats;
}

const StatItem: React.FC<{ label: string; value: number }> = ({ label, value }) => (
    <div className="flex justify-between items-baseline border-b-2 border-black pb-1">
        <span className="text-sm font-bold uppercase">{label}</span>
        <span className="text-lg font-black">{value.toLocaleString()}</span>
    </div>
);

const StatsPanel: React.FC<StatsPanelProps> = ({ stats }) => {
  return (
    <BrutalCard title="STATISTICS">
        <div className="p-4 space-y-3">
            <StatItem label="Comparisons" value={stats.comparisons} />
            <StatItem label="Array Writes" value={stats.arrayWrites} />
        </div>
    </BrutalCard>
  );
};

export default StatsPanel;
