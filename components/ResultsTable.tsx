import React from 'react';
import type { ComparisonResult } from '../types';
import BrutalCard from './ui/BrutalCard';

interface ResultsTableProps {
  results: ComparisonResult[];
}

const ResultsTable: React.FC<ResultsTableProps> = ({ results }) => {
  const getRowClass = (rank: number) => {
    switch (rank) {
      case 1: return 'bg-yellow-300 text-black font-bold'; // Gold
      case 2: return 'bg-gray-300 text-black font-bold'; // Silver
      case 3: return 'bg-amber-400 text-black font-bold'; // Bronze
      default: return 'bg-white text-black';
    }
  };

  return (
    <BrutalCard title="Instant Showdown Results">
      <div className="p-1 sm:p-4 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b-4 border-black text-black text-left text-sm sm:text-base">
              <th className="p-2 font-black text-center">RANK</th>
              <th className="p-2 font-black">ALGORITHM</th>
              <th className="p-2 font-black text-right">COMPARISONS</th>
              <th className="p-2 font-black text-right">WRITES</th>
              <th className="p-2 font-black text-right">TOTAL OPS</th>
            </tr>
          </thead>
          <tbody>
            {results.map((res, index) => (
              <tr 
                key={res.algorithm} 
                className={`border-b-2 border-dashed border-black animate-fade-in-row text-sm ${getRowClass(res.rank)}`}
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <td className="p-2 font-black text-2xl text-center">{res.rank}</td>
                <td className="p-2 font-bold">{res.algorithm}</td>
                <td className="p-2 text-right tabular-nums">
                    <span className="sm:hidden font-semibold">Comps: </span>
                    {res.stats.comparisons.toLocaleString()}
                </td>
                <td className="p-2 text-right tabular-nums">
                    <span className="sm:hidden font-semibold">Writes: </span>
                    {res.stats.arrayWrites.toLocaleString()}
                </td>
                <td className="p-2 font-bold text-right tabular-nums">
                    <span className="sm:hidden font-semibold">Total: </span>
                    {(res.stats.comparisons + res.stats.arrayWrites).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </BrutalCard>
  );
};

export default ResultsTable;