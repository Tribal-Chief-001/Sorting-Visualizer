import React, { useState, useEffect, useCallback, useRef } from 'react';
import type { AlgorithmType, ArrayBar, AnimationStep, SortStats, ArrayScenario, Language } from './types';
import { AlgorithmType as AT, ArrayScenario as AS, Language as L } from './types';
import {
  COLORS,
  DEFAULT_ANIMATION_SPEED,
  ARRAY_SIZE_DEFAULT,
} from './constants';
import { getSortAnimations } from './algorithms';
import { soundService } from './lib/soundService';
import Header from './components/Header';
import Controls from './components/Controls';
import Visualizer from './components/Visualizer';
import ComplexityPanel from './components/ComplexityPanel';
import StatsPanel from './components/StatsPanel';
import ShowdownView from './components/ShowdownView';
import CodePanel from './components/CodePanel';

const App: React.FC = () => {
  const [array, setArray] = useState<ArrayBar[]>([]);
  const [arraySize, setArraySize] = useState<number>(ARRAY_SIZE_DEFAULT);
  const [arrayScenario, setArrayScenario] = useState<ArrayScenario>(AS.Random);
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [isSorted, setIsSorted] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isPreparing, setIsPreparing] = useState<boolean>(false);
  const [isInShowdownMode, setIsInShowdownMode] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [speed, setSpeed] = useState<number>(DEFAULT_ANIMATION_SPEED);
  const [algorithm, setAlgorithm] = useState<AlgorithmType>(AT.MergeSort);
  const [stats, setStats] = useState<SortStats>({ comparisons: 0, arrayWrites: 0 });
  const [generationId, setGenerationId] = useState<number>(0);
  const [activeCodeLine, setActiveCodeLine] = useState<number | null>(null);
  const [language, setLanguage] = useState<Language>(L.Python);

  const animationFrameId = useRef<number | null>(null);
  const animationIndexRef = useRef<number>(0);
  const animationsRef = useRef<AnimationStep[]>([]);
  const preSortArrayRef = useRef<ArrayBar[]>([]);
  
  const generateNewArray = useCallback(() => {
    if (animationFrameId.current) {
        clearTimeout(animationFrameId.current);
        animationFrameId.current = null;
    }
    setIsSorting(false);
    setIsSorted(false);
    setIsPaused(false);
    setIsPreparing(false);
    setActiveCodeLine(null);
    animationIndexRef.current = 0;
    animationsRef.current = [];
    setStats({ comparisons: 0, arrayWrites: 0 });

    let newNumericArray: number[] = [];
    const minVal = 5;
    const maxVal = 500;
    for (let i = 0; i < arraySize; i++) {
        newNumericArray.push(Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal);
    }

    switch(arrayScenario) {
        case AS.Sorted:
            newNumericArray.sort((a,b) => a - b);
            break;
        case AS.NearlySorted:
            newNumericArray.sort((a,b) => a - b);
            // Introduce a few swaps to make it "nearly" sorted
            for (let i = 0; i < Math.floor(arraySize / 10); i++) {
                const rand1 = Math.floor(Math.random() * arraySize);
                const rand2 = Math.floor(Math.random() * arraySize);
                [newNumericArray[rand1], newNumericArray[rand2]] = [newNumericArray[rand2], newNumericArray[rand1]];
            }
            break;
        case AS.Reversed:
            newNumericArray.sort((a,b) => b - a);
            break;
        case AS.FewUnique:
            const uniqueCount = Math.max(2, Math.floor(arraySize / 10));
            const uniqueValues = Array.from({length: uniqueCount}, () => Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal);
            newNumericArray = Array.from({length: arraySize}, () => uniqueValues[Math.floor(Math.random() * uniqueCount)]);
            break;
        case AS.Random:
        default:
            // Already random
            break;
    }

    const newArray: ArrayBar[] = newNumericArray.map(value => ({
        value,
        color: COLORS.PRIMARY,
    }));
    
    setArray(newArray);
    setGenerationId(prev => prev + 1);
  }, [arraySize, arrayScenario]);

  useEffect(() => {
    generateNewArray();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arraySize, arrayScenario]);

  const executeStep = useCallback((index: number) => {
    if (index < 0 || index >= animationsRef.current.length) return;

    const step = animationsRef.current[index];
    const type = step[0];
    
    // The meta object with the line number is always the last element in the step array.
    const meta = step[step.length - 1] as { line: number };
    
    // Safely access the line number.
    if (meta && typeof meta.line === 'number') {
      setActiveCodeLine(meta.line);
    }

    // Update stats in real-time based on the animation step
    if (type === 'compare' || type === 'pivot') {
      soundService.playCompareSound();
      setStats(prev => ({ ...prev, comparisons: prev.comparisons + 1 }));
    } else if (type === 'swap') {
      soundService.playWriteSound();
      setStats(prev => ({ ...prev, arrayWrites: prev.arrayWrites + 2 }));
    } else if (type === 'overwrite') {
      soundService.playWriteSound();
      setStats(prev => ({ ...prev, arrayWrites: prev.arrayWrites + 1 }));
    }
    
    setArray((prevArray) => {
      const newArray = [...prevArray];

      if (type === 'compare' || type === 'pivot' || type === 'revert') {
        const [, barOneIdx, barTwoIdx] = step;
        let color, className;

        switch(type) {
            case 'compare': color = COLORS.SECONDARY; className = 'bar-comparing'; break;
            case 'pivot': color = COLORS.ACCENT; className = 'bar-pivot'; break;
            case 'revert': default: color = COLORS.PRIMARY; className = ''; break;
        }

        if (newArray[barOneIdx]) newArray[barOneIdx] = { ...newArray[barOneIdx], color, className };
        if (newArray[barTwoIdx]) newArray[barTwoIdx] = { ...newArray[barTwoIdx], color, className };

      } else if (type === 'swap') {
        const [, barOneIdx, barTwoIdx] = step;
        const temp = newArray[barOneIdx].value;
        newArray[barOneIdx] = { ...newArray[barOneIdx], value: newArray[barTwoIdx].value };
        newArray[barTwoIdx] = { ...newArray[barTwoIdx], value: temp };
      } else if (type === 'overwrite') {
        const [, barIdx, newValue] = step;
        if (newArray[barIdx]) newArray[barIdx] = { ...newArray[barIdx], value: newValue };
      } else if (type === 'finalize') {
        const [, barIdx] = step;
        if (newArray[barIdx]) newArray[barIdx] = { ...newArray[barIdx], color: COLORS.FINAL, className: '' };
      }
      return newArray;
    });
  }, []);

  const runAnimation = useCallback(() => {
    if (animationIndexRef.current >= animationsRef.current.length) {
      setActiveCodeLine(null);
      setArray((prevArray) =>
        prevArray.map((bar) => ({ ...bar, color: COLORS.SORTED, className: 'bar-pulse' }))
      );

      const celebrationTimeout = setTimeout(() => {
        setArray((prevArray) =>
          prevArray.map((bar) => ({ ...bar, color: COLORS.SORTED, className: '' }))
        );
        setIsSorting(false);
        setIsSorted(true);
        setIsPaused(false);
      }, 500);

      animationFrameId.current = celebrationTimeout as unknown as number;
      return;
    }

    executeStep(animationIndexRef.current);
    animationIndexRef.current++;
    const animationDelay = 301 - speed;
    animationFrameId.current = window.setTimeout(runAnimation, animationDelay);
  }, [speed, executeStep]);

  useEffect(() => {
    if (isSorting && !isPaused) {
      runAnimation();
    }
    return () => {
      if (animationFrameId.current) {
        clearTimeout(animationFrameId.current);
      }
    };
  }, [isSorting, isPaused, runAnimation]);
  
  const handleSort = () => {
    if (isSorting || isPreparing) return;
    preSortArrayRef.current = [...array];
    setIsPreparing(true);
    setIsSorted(false);
    setIsPaused(false);
    animationIndexRef.current = 0;
    setStats({ comparisons: 0, arrayWrites: 0 });
    
    const numericArray = array.map((bar) => bar.value);
    const animations = getSortAnimations(algorithm, numericArray);
    animationsRef.current = animations;
    
    setArray(prev => prev.map(bar => ({ ...bar, color: COLORS.ACCENT, className: '' })));

    setTimeout(() => {
        setIsPreparing(false);
        setIsSorting(true);
    }, 500);
  };

  const handlePause = () => {
    if (!isSorting || isPaused) return;
    setIsPaused(true);
  };

  const handleResume = () => {
    if (!isSorting || !isPaused) return;
    setIsPaused(false);
  };
  
  const handleStep = (direction: 'next' | 'prev') => {
    if (!isPaused) return;
    const newIndex = animationIndexRef.current + (direction === 'next' ? 1 : -1);

    if (direction === 'next' && newIndex < animationsRef.current.length) {
        animationIndexRef.current = newIndex;
        executeStep(newIndex);
    } else if (direction === 'prev' && newIndex >= 0) {
        // Critical bug fix: Re-calculate the entire visual state from the beginning.
        animationIndexRef.current = newIndex;
        
        let tempStats = { comparisons: 0, arrayWrites: 0 };
        // Start with the pre-sorted array values and base styling
        const tempArray: ArrayBar[] = preSortArrayRef.current.map(bar => ({
            value: bar.value,
            color: COLORS.PRIMARY,
            className: ''
        }));
        
        // Re-run the animation virtually up to the target step (newIndex)
        for (let i = 0; i <= newIndex; i++) {
            const step = animationsRef.current[i];
            const [type] = step;
            
            // Update stats
            if (type === 'compare' || type === 'pivot') tempStats.comparisons++;
            else if (type === 'swap') tempStats.arrayWrites += 2;
            else if (type === 'overwrite') tempStats.arrayWrites += 1;

            // Update array values and visual properties
            if (type === 'compare' || type === 'pivot' || type === 'revert') {
                const [, barOneIdx, barTwoIdx] = step;
                let color, className;
                switch(type) {
                    case 'compare': color = COLORS.SECONDARY; className = 'bar-comparing'; break;
                    case 'pivot': color = COLORS.ACCENT; className = 'bar-pivot'; break;
                    case 'revert': default: color = COLORS.PRIMARY; className = ''; break;
                }
                if (tempArray[barOneIdx]) { tempArray[barOneIdx].color = color; tempArray[barOneIdx].className = className; }
                if (tempArray[barTwoIdx]) { tempArray[barTwoIdx].color = color; tempArray[barTwoIdx].className = className; }
            } else if (type === 'swap') {
                const [, barOneIdx, barTwoIdx] = step;
                [tempArray[barOneIdx].value, tempArray[barTwoIdx].value] = [tempArray[barTwoIdx].value, tempArray[barOneIdx].value];
            } else if (type === 'overwrite') {
                const [, barIdx, newValue] = step;
                if (tempArray[barIdx]) tempArray[barIdx].value = newValue;
            } else if (type === 'finalize') {
                const [, barIdx] = step;
                if (tempArray[barIdx]) { tempArray[barIdx].color = COLORS.FINAL; tempArray[barIdx].className = ''; }
            }
        }
        
        // Update the active code line for the current step
        const currentStepMeta = animationsRef.current[newIndex][animationsRef.current[newIndex].length - 1] as { line: number };
        if (currentStepMeta && typeof currentStepMeta.line === 'number') {
            setActiveCodeLine(currentStepMeta.line);
        }
        
        setArray(tempArray);
        setStats(tempStats);
    }
  };
  
  const handleToggleMute = () => {
      const muted = !isMuted;
      setIsMuted(muted);
      soundService.setMuted(muted);
  }

  const handleEnterShowdown = () => {
    if (animationFrameId.current) clearTimeout(animationFrameId.current);
    setIsSorting(false); setIsPaused(false); setIsInShowdownMode(true);
  };

  const handleExitShowdown = () => {
    setIsInShowdownMode(false);
    generateNewArray();
  };


  return (
    <div className="min-h-screen bg-white text-black p-4 md:p-8 flex flex-col font-mono">
      <Header />
       {isInShowdownMode ? (
        <ShowdownView
          initialNumericArray={array.map((bar) => bar.value)}
          speed={speed}
          onExit={handleExitShowdown}
        />
      ) : (
        <main className="flex-grow grid grid-cols-1 lg:grid-cols-5 gap-8 mt-8">
          <div className="lg:col-span-2 flex flex-col gap-8">
            <Controls
              isSorting={isSorting || isPreparing}
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
              onSort={handleSort}
              onPause={handlePause}
              onResume={handleResume}
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