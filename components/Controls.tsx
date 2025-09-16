import React from 'react';
import type { AlgorithmType, ArrayScenario, Language } from '../types';
import { AlgorithmType as AT, ArrayScenario as AS } from '../types';
import { ANIMATION_SPEED_MIN, ANIMATION_SPEED_MAX, ARRAY_SIZE_MIN, ARRAY_SIZE_MAX } from '../constants';
import BrutalCard from './ui/BrutalCard';
import BrutalButton from './ui/BrutalButton';
import BrutalSelect from './ui/BrutalSelect';
import BrutalSlider from './ui/BrutalSlider';


interface ControlsProps {
  isSorting: boolean;
  isPaused: boolean;
  isMuted: boolean;
  algorithm: AlgorithmType;
  onAlgorithmChange: (algo: AlgorithmType) => void;
  arrayScenario: ArrayScenario;
  onArrayScenarioChange: (scenario: ArrayScenario) => void;
  speed: number;
  onSpeedChange: (speed: number) => void;
  arraySize: number;
  onArraySizeChange: (size: number) => void;
  onGenerateArray: () => void;
  onSort: () => void;
  onPause: () => void;
  onResume: () => void;
  onStep: (direction: 'next' | 'prev') => void;
  onToggleMute: () => void;
  onRunShowdown: () => void;
}

const Controls: React.FC<ControlsProps> = ({
  isSorting,
  isPaused,
  isMuted,
  algorithm,
  onAlgorithmChange,
  arrayScenario,
  onArrayScenarioChange,
  speed,
  onSpeedChange,
  arraySize,
  onArraySizeChange,
  onGenerateArray,
  onSort,
  onPause,
  onResume,
  onStep,
  onToggleMute,
  onRunShowdown,
}) => {
  return (
    <BrutalCard title="CONTROLS">
      <div className="space-y-6 p-4">
        <div className="flex items-center gap-4">
            <BrutalSelect
                id="scenario-select"
                value={arrayScenario}
                onChange={(e) => onArrayScenarioChange(e.target.value as ArrayScenario)}
                disabled={isSorting}
                className="flex-grow"
            >
                {Object.values(AS).map((sc) => (
                    <option key={sc} value={sc}>{sc}</option>
                ))}
            </BrutalSelect>
            <BrutalButton onClick={onGenerateArray} disabled={isSorting && !isPaused} className="bg-[#00FF88] hover:bg-[#00dd77]">
                New
            </BrutalButton>
        </div>
        
        <div className="flex gap-4">
           <BrutalButton 
              onClick={isSorting ? (isPaused ? onResume : onPause) : onSort}
              className={`w-full ${isPaused ? 'bg-[#00C4FF] hover:bg-[#00aadd]' : isSorting ? 'bg-[#FFFF00] hover:bg-[#eeee00]' : 'bg-[#FF0040] hover:bg-[#dd0033] text-white'}`}
          >
              {isSorting ? (isPaused ? 'RESUME' : 'PAUSE') : 'SORT!'}
          </BrutalButton>
          <BrutalButton onClick={onToggleMute} className="px-4">
            {isMuted ? '🔇' : '🔊'}
          </BrutalButton>
        </div>

        {isPaused && (
            <div className="flex gap-4">
                <BrutalButton onClick={() => onStep('prev')} className="w-full bg-white">
                    PREV STEP
                </BrutalButton>
                <BrutalButton onClick={() => onStep('next')} className="w-full bg-white">
                    NEXT STEP
                </BrutalButton>
            </div>
        )}

        <BrutalButton
          onClick={onRunShowdown}
          disabled={isSorting}
          className="w-full bg-[#00C4FF] hover:bg-[#00aadd] text-black"
        >
          ALGORITHM SHOWDOWN
        </BrutalButton>

        <div className="space-y-2">
            <label htmlFor="algorithm-select" className="font-bold text-lg">ALGORITHM</label>
            <BrutalSelect
                id="algorithm-select"
                value={algorithm}
                onChange={(e) => onAlgorithmChange(e.target.value as AlgorithmType)}
                disabled={isSorting}
            >
                {Object.values(AT).map((algo) => (
                    <option key={algo} value={algo} className="font-bold">
                    {algo}
                    </option>
                ))}
            </BrutalSelect>
        </div>
        <div className="space-y-2">
            <label htmlFor="size-slider" className="font-bold text-lg">ARRAY SIZE</label>
            <BrutalSlider
                id="size-slider"
                min={ARRAY_SIZE_MIN}
                max={ARRAY_SIZE_MAX}
                value={arraySize}
                onChange={(e) => onArraySizeChange(Number(e.target.value))}
                disabled={isSorting}
            />
        </div>
        <div className="space-y-2">
            <label htmlFor="speed-slider" className="font-bold text-lg">SPEED</label>
            <BrutalSlider
                id="speed-slider"
                min={ANIMATION_SPEED_MIN}
                max={ANIMATION_SPEED_MAX}
                value={speed}
                onChange={(e) => onSpeedChange(Number(e.target.value))}
                disabled={isSorting && !isPaused}
            />
        </div>
      </div>
    </BrutalCard>
  );
};

export default Controls;