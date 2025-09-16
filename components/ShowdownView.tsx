import React, { useState, useCallback, useMemo } from 'react';
import type { ComparisonResult } from '../types';
import { AlgorithmType as AT } from '../types';
import { getSortAnimations } from '../algorithms';
import MiniVisualizer from './MiniVisualizer';
import BrutalButton from './ui/BrutalButton';
import ResultsTable from './ResultsTable';

interface ShowdownViewProps {
  initialNumericArray: number[];
  speed: number;
  onExit: () => void;
}

const ShowdownView: React.FC<ShowdownViewProps> = ({ initialNumericArray, speed, onExit }) => {
  const [mode, setMode] = useState<'idle' | 'race' | 'calculating' | 'results'>('idle');
  const [results, setResults] = useState<ComparisonResult[]>([]);

  const handleRaceComplete = useCallback((result: Omit<ComparisonResult, 'rank'>) => {
    setResults((prev) => {
      const updatedResults = [...prev, { ...result, rank: 0 }];
      
      if (updatedResults.length === Object.values(AT).length) {
        const sorted = [...updatedResults].sort(
          (a, b) =>
            (a.stats.comparisons + a.stats.arrayWrites) - (b.stats.comparisons + b.stats.arrayWrites)
        );
        const finalRanked = sorted.map((res, index) => ({ ...res, rank: index + 1 }));
        return finalRanked;
      }
      return updatedResults;
    });
  }, []);

  const handleInstantCalculate = () => {
    setMode('calculating');
    
    const allAlgos = Object.values(AT);
    const calculatedResults: Omit<ComparisonResult, 'rank'>[] = allAlgos.map(algo => {
      const arrayCopy = [...initialNumericArray];
      const animations = getSortAnimations(algo, arrayCopy);
      
      let comparisons = 0;
      let arrayWrites = 0;
      
      for (const step of animations) {
        const type = step[0];
        if (type === 'compare') comparisons++;
        else if (type === 'swap') arrayWrites += 2;
        else if (type === 'overwrite') arrayWrites += 1;
      }
      
      return {
        algorithm: algo,
        stats: { comparisons, arrayWrites }
      };
    });
    
    const sorted = [...calculatedResults].sort(
      (a, b) =>
        (a.stats.comparisons + a.stats.arrayWrites) - (b.stats.comparisons + b.stats.arrayWrites)
    );
    
    const finalRanked = sorted.map((res, index) => ({ ...res, rank: index + 1 }));
    
    setTimeout(() => { // Give animation time to breathe
        setResults(finalRanked);
        setMode('results');
    }, 1000);
  };

  const handleStartRace = () => {
    setResults([]);
    setMode('race');
  };

  const handleReset = () => {
    setResults([]);
    setMode('idle');
  };

  return (
    <main className="flex-grow mt-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
        <h2 className="text-2xl md:text-3xl font-black uppercase">Algorithm Showdown</h2>
        <BrutalButton onClick={onExit} className="bg-[#00FF88] hover:bg-[#00dd77] w-full sm:w-auto">
          Back to Sandbox
        </BrutalButton>
      </div>

      {mode === 'idle' && (
        <div className="text-center p-8 border-4 border-dashed border-black animate-fade-in">
          <h3 className="text-2xl font-bold mb-6">Choose your showdown:</h3>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <BrutalButton onClick={handleStartRace} className="bg-[#00FF88] hover:bg-[#00dd77] text-xl">
              Start Visual Race
            </BrutalButton>
            <BrutalButton onClick={handleInstantCalculate} className="bg-[#00C4FF] hover:bg-[#00aadd] text-xl">
              Get Instant Results
            </BrutalButton>
          </div>
        </div>
      )}

      {mode === 'calculating' && (
         <div className="text-center p-8 flex flex-col items-center justify-center animate-fade-in">
            <div className="loader"></div>
            <p className="text-2xl font-bold mt-4">Crunching the Numbers...</p>
         </div>
      )}
      
      {mode === 'race' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
          {Object.values(AT).map((algo) => {
            const resultForAlgo = results.find((r) => r.algorithm === algo);
            return (
              <MiniVisualizer
                key={algo}
                algorithm={algo}
                initialNumericArray={initialNumericArray}
                speed={speed}
                onComplete={handleRaceComplete}
                rank={resultForAlgo?.rank}
              />
            );
          })}
        </div>
      )}

      {mode === 'results' && (
        <div className="animate-fade-in">
          <ResultsTable results={results} />
          <div className="text-center mt-6">
             <BrutalButton onClick={handleReset} className="bg-[#00FF88] hover:bg-[#00dd77]">
                Run Another Showdown
             </BrutalButton>
          </div>
        </div>
      )}

    </main>
  );
};

export default ShowdownView;
