'use client';

import React from 'react';

interface ProgressRingProps {
  percentage: number;
  completed: number;
  total: number;
  scope: 'day' | 'week' | 'month';
  onScopeChange: (scope: 'day' | 'week' | 'month') => void;
}

export const ProgressRing: React.FC<ProgressRingProps> = ({
  percentage,
  completed,
  total,
  scope,
  onScopeChange,
}) => {
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const strokeOffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="bento-card p-5 flex flex-col justify-between items-center text-center relative overflow-hidden">
      <div className="w-full flex items-center justify-between mb-2">
        <div className="flex items-center gap-1 p-0.5 rounded-lg bg-[var(--bg-input)] border border-[var(--border-subtle)]">
          {(['day', 'week', 'month'] as const).map(s => (
            <button
              key={s}
              onClick={() => onScopeChange(s)}
              className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-all ${
                scope === s ? 'bg-[var(--accent-soft)] text-[var(--accent-bright)]' : 'text-[var(--text-dim)]'
              }`}
            >
              {s.toUpperCase()}
            </button>
          ))}
        </div>
        <span className="text-[11px] font-mono-num px-2 py-0.5 rounded-md font-semibold bg-[var(--accent-soft)] text-[var(--accent-bright)]">
          {percentage === 100 ? '✦ Perfect' : percentage >= 70 ? 'High Momentum' : 'In Flow'}
        </span>
      </div>

      <div className="relative w-40 h-40 my-2 flex items-center justify-center">
        <svg className="w-full h-full overflow-visible" viewBox="0 0 160 160">
          <circle cx="80" cy="80" r={radius} fill="none" stroke="var(--border-subtle)" strokeWidth="12" />
          <circle cx="80" cy="80" r="52" fill="none" stroke="var(--border-subtle)" strokeWidth="1" strokeDasharray="3 7" />
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke="url(#ringStrokeGrad)"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeOffset}
            className="transition-all duration-700 ease-out origin-center -rotate-90"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="flex items-baseline">
            <span className="text-3xl font-extrabold font-mono-num tracking-tight">{percentage}</span>
            <span className="text-sm font-bold text-[var(--accent-bright)] ml-0.5">%</span>
          </div>
          <span className="text-xs font-mono-num text-[var(--text-dim)] mt-0.5">{completed} of {total} done</span>
        </div>
      </div>

      <p className="text-xs text-[var(--text-dim)] mt-1">
        {percentage === 100 ? 'All rituals locked in for this cycle!' : `${total - completed} more rituals to achieve 100%`}
      </p>
    </div>
  );
};
