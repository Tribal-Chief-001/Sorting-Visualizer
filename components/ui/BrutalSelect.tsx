
import React from 'react';

interface BrutalSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode;
}

const BrutalSelect: React.FC<BrutalSelectProps> = ({ children, className = '', ...props }) => {
  return (
    <div className="relative w-full border-4 border-black shadow-[4px_4px_0px_#000000] bg-white">
      <select
        className={`w-full p-3 font-bold text-lg appearance-none bg-transparent cursor-pointer ${className}`}
        {...props}
      >
        {children}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-black">
        <svg className="fill-current h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
      </div>
    </div>
  );
};

export default BrutalSelect;
