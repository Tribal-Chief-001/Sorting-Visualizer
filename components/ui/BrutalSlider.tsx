
import React from 'react';

interface BrutalSliderProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const BrutalSlider: React.FC<BrutalSliderProps> = ({ className = '', ...props }) => {
  return (
    <div className="w-full p-2 border-4 border-black bg-white shadow-[4px_4px_0px_#000000]">
      <input
        type="range"
        className={`w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer ${className}`}
        {...props}
      />
    </div>
  );
};

export default BrutalSlider;
