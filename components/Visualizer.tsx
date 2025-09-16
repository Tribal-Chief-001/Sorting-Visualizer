import React from 'react';
import type { ArrayBar } from '../types';
import BrutalCard from './ui/BrutalCard';

interface VisualizerProps {
  array: ArrayBar[];
}

// Helper to darken a hex color by a percentage
const darkenColor = (hex: string, percent: number): string => {
  // Ensure the hex color starts with a #
  hex = hex.startsWith('#') ? hex.slice(1) : hex;

  // Handle 3-digit hex
  if (hex.length === 3) {
    hex = hex.split('').map(char => char + char).join('');
  }
  
  // Parse the R, G, B values
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);

  // Apply the darkness
  r = Math.floor(r * (1 - percent / 100));
  g = Math.floor(g * (1 - percent / 100));
  b = Math.floor(b * (1 - percent / 100));
  
  // Convert back to hex and pad with zeros
  const toHex = (c: number) => ('0' + c.toString(16)).slice(-2);

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

const Visualizer: React.FC<VisualizerProps> = ({ array }) => {
  return (
    <BrutalCard title="VISUALIZER" className="h-full flex flex-col">
        <div className="flex-grow flex items-end justify-center gap-[2px] p-4 min-h-[60vh] lg:min-h-0">
        {array.map((bar, idx) => (
            <div
            key={idx}
            className={`w-full bar-new ${bar.className || ''}`}
            style={{
                height: `${(bar.value / 500) * 100}%`,
                background: `linear-gradient(to bottom, ${bar.color}, ${darkenColor(bar.color, 35)})`,
                borderTop: '2px solid black',
                borderLeft: '2px solid black',
                borderRight: '2px solid black',
                transition: 'background 0.1s ease-out, transform 0.1s ease-out',
            }}
            ></div>
        ))}
        </div>
    </BrutalCard>
  );
};

export default Visualizer;