import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { AlgorithmType, ArrayBar, AnimationStep, SortStats, ComparisonResult } from '../types';
import { getSortAnimations } from '../algorithms';
import { COLORS } from '../constants';
import BrutalCard from './ui/BrutalCard';

// Helper to darken a hex color by a percentage
const darkenColor = (hex: string, percent: number): string => {
  hex = hex.startsWith('#') ? hex.slice(1) : hex;
  if (hex.length === 3) hex = hex.split('').map(char => char + char).join('');
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);
  r = Math.floor(r * (1 - percent / 100));
  g = Math.floor(g * (1 - percent / 100));
  b = Math.floor(b * (1 - percent / 100));
  const toHex = (c: number) => ('0' + c.toString(16)).slice(-2);
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

interface MiniVisualizerProps {
  algorithm: AlgorithmType;
  initialNumericArray: number[];
  speed: number;
  onComplete: (result: Omit<ComparisonResult, 'rank'>) => void;
  rank?: number;
}

const MiniVisualizer: React.FC<MiniVisualizerProps> = ({ algorithm, initialNumericArray, speed, onComplete, rank }) => {
  const [array, setArray] = useState<ArrayBar[]>([]);
  const [stats, setStats] = useState<SortStats>({ comparisons: 0, arrayWrites: 0 });
  const [isDone, setIsDone] = useState(false);

  const animationFrameId = useRef<number | null>(null);
  const animationIndexRef = useRef<number>(0);
  const animationsRef = useRef<AnimationStep[]>([]);
  const finalStatsRef = useRef(stats);

  useEffect(() => {
    finalStatsRef.current = stats;
  }, [stats]);
  
  const runAnimation = useCallback(() => {
    if (animationIndexRef.current >= animationsRef.current.length) {
      setIsDone(true);
      onComplete({ algorithm, stats: finalStatsRef.current });
      setArray(prev => prev.map(bar => ({ ...bar, color: COLORS.SORTED, className: ''})));
      return;
    }

    const step = animationsRef.current[animationIndexRef.current];
    const [type] = step;

    setStats(prev => {
        if (type === 'compare') return { ...prev, comparisons: prev.comparisons + 1 };
        if (type === 'swap') return { ...prev, arrayWrites: prev.arrayWrites + 2 };
        if (type === 'overwrite') return { ...prev, arrayWrites: prev.arrayWrites + 1 };
        return prev;
    });

    setArray(prevArray => {
      const newArray = [...prevArray];
      if (type === 'compare' || type === 'pivot' || type === 'revert') {
        const [, barOneIdx, barTwoIdx] = step;
        const color = type === 'revert' ? COLORS.PRIMARY : type === 'pivot' ? COLORS.ACCENT : COLORS.SECONDARY;
        if (newArray[barOneIdx]) newArray[barOneIdx] = { ...newArray[barOneIdx], color };
        if (newArray[barTwoIdx]) newArray[barTwoIdx] = { ...newArray[barTwoIdx], color };
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
        if (newArray[barIdx]) newArray[barIdx] = { ...newArray[barIdx], color: COLORS.FINAL };
      }
      return newArray;
    });

    animationIndexRef.current++;
    const animationDelay = 301 - speed;
    animationFrameId.current = window.setTimeout(runAnimation, animationDelay);
  }, [speed, algorithm, onComplete]);

  useEffect(() => {
    const initialBars = initialNumericArray.map(value => ({
      value,
      color: COLORS.PRIMARY,
    }));
    setArray(initialBars);
    
    const animations = getSortAnimations(algorithm, [...initialNumericArray]);
    animationsRef.current = animations;
    
    runAnimation();

    return () => {
      if (animationFrameId.current) clearTimeout(animationFrameId.current);
    };
  }, [algorithm, initialNumericArray, runAnimation]);
  
  const getBorderClass = () => {
    if (!rank) return 'border-black border-4';
    if (rank === 1) return 'border-yellow-400 border-8';
    if (rank === 2) return 'border-gray-400 border-8';
    if (rank === 3) return 'border-amber-500 border-8'; // Bronze color
    return 'border-black border-4';
  };

  return (
    <div className={`bg-white shadow-[8px_8px_0px_#000000] ${getBorderClass()}`}>
      <h2 className="text-lg font-black p-2 border-b-4 uppercase bg-[#FFFF00] text-center truncate" style={{borderColor: 'inherit'}}>
        {algorithm}
      </h2>
      <div className="flex-grow flex items-end justify-center gap-[1px] p-2 min-h-[12rem]">
        {array.map((bar, idx) => (
          <div
            key={idx}
            className="w-full"
            style={{
              height: `${(bar.value / 500) * 100}%`,
              background: `linear-gradient(to bottom, ${bar.color}, ${darkenColor(bar.color, 35)})`,
              transition: 'background 0.1s ease-out',
            }}
          ></div>
        ))}
      </div>
      <div className="p-2 border-t-4 text-sm font-bold" style={{borderColor: 'inherit'}}>
        {isDone ? (
          <div className="text-center space-y-1">
            <p className="text-xl font-black">RANK #{rank}</p>
            <div className="flex justify-around text-xs">
                <span>{stats.comparisons.toLocaleString()} comps</span>
                <span>{stats.arrayWrites.toLocaleString()} writes</span>
            </div>
          </div>
        ) : (
          <div className="flex justify-between tabular-nums text-xs">
            <span>Comps: {stats.comparisons.toLocaleString()}</span>
            <span>Writes: {stats.arrayWrites.toLocaleString()}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MiniVisualizer;
