import React, { useState, useEffect, useCallback, useRef } from 'react';
import type { AlgorithmType, ArrayBar, ArrayScenario, Language, SortStats } from './types';
import { AlgorithmType as AT, ArrayScenario as AS, Language as L } from './types';
import { COLORS, DEFAULT_ANIMATION_SPEED, ARRAY_SIZE_DEFAULT } from './constants';
import { soundService } from './lib/soundService';
import Header from './components/Header';
import Controls from './components/Controls';
import Visualizer from './components/Visualizer';
import ComplexityPanel from './components/ComplexityPanel';
import StatsPanel from './components/StatsPanel';
import ShowdownView from './components/ShowdownView';
import CodePanel from './components/CodePanel';
import { useSortAnimation } from './hooks/useSortAnimation';

const App: React.FC = () => {
  const [arraySize, setArraySize] = useState<number>(ARRAY_SIZE_DEFAULT);
  const [arrayScenario, setArrayScenario] = useState<ArrayScenario>(AS.Random);
  const [initialArray, setInitialArray] = useState<ArrayBar[]>([]);
  const [generationId, setGenerationId] = useState<number>(0);
  const [isInShowdownMode, setIsInShowdownMode] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [speed, setSpeed] = useState<number>(DEFAULT_ANIMATION_SPEED);
  const [algorithm, setAlgorithm] = useState<AlgorithmType>(AT.MergeSort);
  const [language, setLanguage] = useState<Language>(L.Python);
  
  const preSortArrayRef = useRef<ArrayBar[]>([]);

  const generateNewArray = useCallback(() => {
    let newNumericArray: number[] = [];
    const minVal = 5;
    const maxVal = 500;
    for (let i = 0; i < arraySize; i++) {
      newNumericArray.push(Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal);
    }

    switch (arrayScenario) {
      case AS.Sorted: newNumericArray.sort((a, b) => a - b); break;
      case AS.NearlySorted:
        newNumericArray.sort((a, b) => a - b);
        for (let i = 0; i < Math.floor(arraySize / 10); i++) {
          const r1 = Math.floor(Math.random() * arraySize);
          const r2 = Math.floor(Math.random() * arraySize);
          [newNumericArray[r1], newNumericArray[r2]] = [newNumericArray[r2], newNumericArray[r1]];
        }
        break;
      case AS.Reversed: newNumericArray.sort((a, b) => b - a); break;
      case AS.FewUnique:
        const uniqueCount = Math.max(2, Math.floor(arraySize / 10));
        const uniqueValues = Array.from({ length: uniqueCount }, () => Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal);
        newNumericArray = Array.from({ length: arraySize }, () => uniqueValues[Math.floor(Math.random() * uniqueCount)]);
        break;
    }

    const newArray: ArrayBar[] = newNumericArray.map(value => ({ value, color: COLORS.PRIMARY, className: '' }));
    setInitialArray(newArray);
    preSortArrayRef.current = newArray;
    setGenerationId(prev => prev + 1);
  }, [arraySize, arrayScenario]);

  useEffect(() => {
    generateNewArray();
  }, [generateNewArray]);

  const {
    array,
    stats,
    isSorting,
    isPaused,
    isSorted,
    activeCodeLine,
    startSorting,
    pauseSorting,
    resumeSorting,
    stepForward,
    stepBackward,
  } = useSortAnimation({
    algorithm,
    speed,
    initialArray,
  });

  const handleStep = (direction: 'next' | 'prev') => {
    if (direction === 'next') {
      stepForward();
    } else {
      stepBackward();
    }
  };

  const handleToggleMute = () => {
    const muted = !isMuted;
    setIsMuted(muted);
    soundService.setMuted(muted);
  };

  const handleEnterShowdown = () => setIsInShowdownMode(true);
  const handleExitShowdown = () => {
    setIsInShowdownMode(false);
    generateNewArray();
  };

  return (
    <div className="min-h-screen bg-white text-black p-4 md:p-8 flex flex-col font-mono">
      <Header />
      {isInShowdownMode ? (
        <ShowdownView
          initialNumericArray={initialArray.map(bar => bar.value)}
          speed={speed}
          onExit={handleExitShowdown}
        />
      ) : (
        <main className="flex-grow grid grid-cols-1 lg:grid-cols-5 gap-8 mt-8">
          <div className="lg:col-span-2 flex flex-col gap-8">
            <Controls
              isSorting={isSorting}
              isPaused={isPaused}
              isMuted={isMuted}
              algorithm={algorithm}
              onAlgorithmChange={setAlgorithm}
              arrayScenario={arrayScenario}
              onArrayScenarioChange={setArrayScenario}
              speed={speed}
              onSpeedChange={setSpeed}
              arraySize={arraySize}
              onArraySizeChange={setArraySize}
              onGenerateArray={generateNewArray}
              onSort={startSorting}
              onPause={pauseSorting}
              onResume={resumeSorting}
              onStep={handleStep}
              onToggleMute={handleToggleMute}
              onRunShowdown={handleEnterShowdown}
            />
            <StatsPanel stats={stats} />
            <ComplexityPanel algorithm={algorithm} />
          </div>
          <div className="lg:col-span-3 flex flex-col gap-8">
            <Visualizer key={generationId} array={array} />
            <CodePanel
              algorithm={algorithm}
              activeLine={activeCodeLine}
              language={language}
              onLanguageChange={setLanguage}
            />
          </div>
        </main>
      )}
    </div>
  );
};

export default App;