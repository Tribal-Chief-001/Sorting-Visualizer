import React, { useState, useCallback } from 'react';
import type { AlgorithmType, Language } from '../types';
import { Language as L } from '../types';
import { ALGORITHM_CODE } from '../algorithms/codeSnippets';
import BrutalCard from './ui/BrutalCard';
import BrutalButton from './ui/BrutalButton';

interface CodePanelProps {
  algorithm: AlgorithmType;
  activeLine: number | null;
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

const CodePanel: React.FC<CodePanelProps> = ({ algorithm, activeLine, language, onLanguageChange }) => {
  const code = ALGORITHM_CODE[algorithm][language].trim();
  const lines = code.split('\n');
  const [copyStatus, setCopyStatus] = useState('Copy');

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code).then(() => {
      setCopyStatus('Copied!');
      setTimeout(() => setCopyStatus('Copy'), 2000);
    });
  }, [code]);


  return (
    <BrutalCard title="CODE INSPECTOR">
      <div className="border-b-4 border-black flex">
        {Object.values(L).map((lang) => (
          <button
            key={lang}
            onClick={() => onLanguageChange(lang)}
            className={`flex-1 p-2 font-bold text-sm uppercase border-r-4 border-black last:border-r-0 transition-colors ${
              language === lang ? 'bg-[#FF0040] text-white' : 'bg-white hover:bg-gray-200'
            }`}
          >
            {lang}
          </button>
        ))}
      </div>
      <div className="relative p-4 bg-gray-900 text-white overflow-x-auto">
        <BrutalButton 
            onClick={handleCopy} 
            className="absolute top-3 right-3 bg-gray-700 hover:bg-gray-600 text-white text-xs px-2 py-1 border-2 border-black shadow-[2px_2px_0px_#000000] active:shadow-none"
        >
            {copyStatus}
        </BrutalButton>
        <pre className="text-sm">
          <code>
            {lines.map((line, index) => {
              // Regex to handle both # and // comments
              const match = line.match(/(?:#|\/\/)\s*Line\s*(\d+)/);
              const lineNumber = match ? parseInt(match[1], 10) : null;
              const lineContent = line.replace(/\s*(?:#|\/\/)\s*Line\s*\d+.*/, '').trimEnd();
              
              return (
                <span
                  key={index}
                  className={lineNumber === activeLine ? 'line-highlight' : ''}
                >
                  {lineContent + '\n'}
                </span>
              );
            })}
          </code>
        </pre>
      </div>
    </BrutalCard>
  );
};

export default CodePanel;