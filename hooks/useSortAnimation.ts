import { useState, useEffect, useCallback, useRef } from 'react';
import type { AlgorithmType, ArrayBar, AnimationStep, SortStats } from '../types';
import { getSortAnimations } from '../algorithms';
import { COLORS } from '../constants';
import { soundService } from '../lib/soundService';

interface UseSortAnimationProps {
  algorithm: AlgorithmType;
  speed: number;
  initialArray: ArrayBar[];
  onAnimationComplete?: () => void;
}

export const useSortAnimation = ({
  algorithm,
  speed,
  initialArray,
  onAnimationComplete,
}: UseSortAnimationProps) => {
  const [array, setArray] = useState<ArrayBar[]>(initialArray);
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isSorted, setIsSorted] = useState<boolean>(false);
  const [stats, setStats] = useState<SortStats>({ comparisons: 0, arrayWrites: 0 });
  const [activeCodeLine, setActiveCodeLine] = useState<number | null>(null);

  const animationFrameId = useRef<number | null>(null);
  const animationIndexRef = useRef<number>(0);
  const animationsRef = useRef<AnimationStep[]>([]);
  const preSortArrayRef = useRef<ArrayBar[]>([]);

  useEffect(() => {
    setArray(initialArray);
    setIsSorted(false);
    setIsSorting(false);
    setIsPaused(false);
  }, [initialArray]);

  const executeStep = useCallback((index: number) => {
    if (index < 0 || index >= animationsRef.current.length) return;

    const step = animationsRef.current[index];
    const [type] = step;
    const meta = step[step.length - 1] as { line: number };
    if (meta && typeof meta.line === 'number') setActiveCodeLine(meta.line);

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

    setArray(prevArray => {
      const newArray = [...prevArray];
      if (type === 'compare' || type === 'pivot' || type === 'revert') {
        const [, barOneIdx, barTwoIdx] = step;
        let color, className;
        switch (type) {
          case 'compare': color = COLORS.SECONDARY; className = 'bar-comparing'; break;
          case 'pivot': color = COLORS.ACCENT; className = 'bar-pivot'; break;
          default: color = COLORS.PRIMARY; className = ''; break;
        }
        if (newArray[barOneIdx]) newArray[barOneIdx] = { ...newArray[barOneIdx], color, className };
        if (newArray[barTwoIdx]) newArray[barTwoIdx] = { ...newArray[barTwoIdx], color, className };
      } else if (type === 'swap') {
        const [, barOneIdx, barTwoIdx] = step;
        [newArray[barOneIdx].value, newArray[barTwoIdx].value] = [newArray[barTwoIdx].value, newArray[barOneIdx].value];
      } else if (type === 'overwrite') {
        const [, barIdx, newValue] = step;
        if (newArray[barIdx]) newArray[barIdx].value = newValue;
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
      setArray(prev => prev.map(bar => ({ ...bar, color: COLORS.SORTED, className: 'bar-pulse' })));
      const celebrationTimeout = setTimeout(() => {
        setArray(prev => prev.map(bar => ({ ...bar, color: COLORS.SORTED, className: '' })));
        setIsSorting(false);
        setIsSorted(true);
        setIsPaused(false);
        onAnimationComplete?.();
      }, 500);
      animationFrameId.current = celebrationTimeout as unknown as number;
      return;
    }

    executeStep(animationIndexRef.current);
    animationIndexRef.current++;
    const animationDelay = 301 - speed;
    animationFrameId.current = window.setTimeout(runAnimation, animationDelay);
  }, [speed, executeStep, onAnimationComplete]);

  const startSorting = useCallback(() => {
    if (isSorting) return;
    preSortArrayRef.current = [...array];
    setIsSorted(false);
    setIsPaused(false);
    animationIndexRef.current = 0;
    setStats({ comparisons: 0, arrayWrites: 0 });

    const numericArray = array.map(bar => bar.value);
    animationsRef.current = getSortAnimations(algorithm, numericArray);

    setIsSorting(true);
  }, [isSorting, array, algorithm]);

  useEffect(() => {
    if (isSorting && !isPaused) {
      runAnimation();
    }
    return () => {
      if (animationFrameId.current) clearTimeout(animationFrameId.current);
    };
  }, [isSorting, isPaused, runAnimation]);

  const pauseSorting = () => setIsPaused(true);
  const resumeSorting = () => setIsPaused(false);

  const stepForward = () => {
      if (!isPaused || animationIndexRef.current >= animationsRef.current.length) return;
      executeStep(animationIndexRef.current);
      animationIndexRef.current++;
  };

  const stepBackward = () => {
    if (!isPaused || animationIndexRef.current <= 0) return;

    animationIndexRef.current--;
    const targetIndex = animationIndexRef.current;

    let tempStats: SortStats = { comparisons: 0, arrayWrites: 0 };
    const tempArray: ArrayBar[] = preSortArrayRef.current.map(bar => ({
        ...bar,
        color: COLORS.PRIMARY,
        className: ''
    }));

    for (let i = 0; i < targetIndex; i++) {
        const step = animationsRef.current[i];
        const [type] = step;

        if (type === 'compare' || type === 'pivot') tempStats.comparisons++;
        else if (type === 'swap') tempStats.arrayWrites += 2;
        else if (type === 'overwrite') tempStats.arrayWrites += 1;

        if (type === 'swap') {
            const [, barOneIdx, barTwoIdx] = step;
            [tempArray[barOneIdx].value, tempArray[barTwoIdx].value] = [tempArray[barTwoIdx].value, tempArray[barOneIdx].value];
        } else if (type === 'overwrite') {
            const [, barIdx, newValue] = step;
            if (tempArray[barIdx]) tempArray[barIdx].value = newValue;
        }
    }

    setArray(tempArray);
    setStats(tempStats);
    // Execute the target step to apply its visual styles (colors, classes)
    executeStep(targetIndex);
  };

  return {
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
  };
};
