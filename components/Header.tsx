
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="border-4 border-black p-4 bg-[#FFFF00] shadow-[8px_8px_0px_#000000]">
      <h1 className="text-2xl md:text-4xl font-black uppercase tracking-widest text-center">
        Sorting Visualizer
      </h1>
    </header>
  );
};

export default Header;
