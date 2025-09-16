
import React from 'react';

interface BrutalCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const BrutalCard: React.FC<BrutalCardProps> = ({ title, children, className = '' }) => {
  return (
    <div className={`border-4 border-black bg-white shadow-[8px_8px_0px_#000000] ${className}`}>
      <h2 className="text-xl font-black p-2 border-b-4 border-black uppercase bg-[#FFFF00]">
        {title}
      </h2>
      {children}
    </div>
  );
};

export default BrutalCard;
