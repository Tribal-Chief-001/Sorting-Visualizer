import React from 'react';
import type { AlgorithmType } from '../types';
import { ALGORITHM_COMPLEXITIES } from '../constants';
import BrutalCard from './ui/BrutalCard';

interface ComplexityPanelProps {
  algorithm: AlgorithmType;
}

const ComplexityItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
    <div className="flex justify-between items-baseline border-b-2 border-black pb-1">
        <span className="text-sm font-bold uppercase">{label}</span>
        <span className="text-lg font-black">{value}</span>
    </div>
);

const ComplexityPanel: React.FC<ComplexityPanelProps> = ({ algorithm }) => {
  const complexity = ALGORITHM_COMPLEXITIES[algorithm];

  return (
    <BrutalCard title={`${algorithm.toUpperCase()} COMPLEXITY`}>
        <div className="p-4 space-y-4">
            <p className="text-sm border-b-2 border-dashed border-black pb-3">
                {complexity.description}
            </p>
            <div>
                <h3 className="text-xl font-black uppercase mb-2">Time Complexity</h3>
                <div className="space-y-2">
                    <ComplexityItem label="Best Case" value={complexity.time.best} />
                    <ComplexityItem label="Average Case" value={complexity.time.average} />
                    <ComplexityItem label="Worst Case" value={complexity.time.worst} />
                </div>
            </div>
             <div>
                <h3 className="text-xl font-black uppercase mb-2">Space Complexity</h3>
                 <div className="space-y-2">
                    <ComplexityItem label="Worst Case" value={complexity.space.worst} />
                </div>
            </div>
        </div>
    </BrutalCard>
  );
};

export default ComplexityPanel;