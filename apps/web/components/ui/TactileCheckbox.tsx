'use client';

import React from 'react';

interface TactileCheckboxProps {
  checked: boolean;
  onToggle: () => void;
  title?: string;
}

export const TactileCheckbox: React.FC<TactileCheckboxProps> = ({ checked, onToggle, title }) => {
  return (
    <div className="relative w-11 h-11 flex items-center justify-center shrink-0 cursor-pointer" onClick={onToggle}>
      <svg className="w-11 h-11 overflow-visible transition-transform hover:scale-105 active:scale-90" viewBox="0 0 44 44">
        {checked && (
          <g className="animate-ping opacity-75">
            <line x1="22" y1="8" x2="22" y2="2" stroke="var(--accent-bright)" strokeWidth="2" strokeLinecap="round" />
            <line x1="22" y1="36" x2="22" y2="42" stroke="var(--accent-bright)" strokeWidth="2" strokeLinecap="round" />
            <line x1="8" y1="22" x2="2" y2="22" stroke="var(--accent-bright)" strokeWidth="2" strokeLinecap="round" />
            <line x1="36" y1="22" x2="42" y2="22" stroke="var(--accent-bright)" strokeWidth="2" strokeLinecap="round" />
          </g>
        )}
        {/* Squircle Box */}
        <rect
          x="9"
          y="9"
          width="26"
          height="26"
          rx="8.5"
          fill={checked ? 'var(--accent)' : 'transparent'}
          stroke={checked ? 'var(--accent-bright)' : 'var(--text-dim)'}
          strokeWidth="2"
          className="transition-all duration-300"
        />
        {/* Spring Checkmark */}
        <path
          d="M15.5 22.5L20.2 27.2L29 17.5"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="26"
          strokeDashoffset={checked ? 0 : 26}
          className="transition-all duration-300"
        />
      </svg>
    </div>
  );
};
