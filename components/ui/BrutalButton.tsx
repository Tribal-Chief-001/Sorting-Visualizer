
import React from 'react';

interface BrutalButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const BrutalButton: React.FC<BrutalButtonProps> = ({ children, className = '', ...props }) => {
  return (
    <button
      className={`p-3 border-4 border-black font-bold text-lg uppercase shadow-[4px_4px_0px_#000000] transition-all duration-150 ease-in-out hover:-translate-x-px hover:-translate-y-px active:translate-x-1 active:translate-y-1 active:shadow-none disabled:bg-gray-400 disabled:text-gray-600 disabled:cursor-not-allowed disabled:shadow-[4px_4px_0px_#999] ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default BrutalButton;
