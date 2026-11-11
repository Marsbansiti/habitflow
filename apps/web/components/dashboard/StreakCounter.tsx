'use client';

import React from 'react';

interface StreakCounterProps {
  currentStreak: number;
  longestStreak: number;
  isFrozen?: boolean;
}

export const StreakCounter: React.FC<StreakCounterProps> = ({ currentStreak, longestStreak, isFrozen }) => {
  return (
    <div className="bento-card p-5 flex flex-col justify-between relative overflow-hidden">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-dim)]">Active Streak</span>
        <span className="text-[11px] font-mono-num px-2 py-0.5 rounded-md font-semibold bg-[var(--accent-soft)] text-[var(--accent-bright)]">
          🔥 1.9x Aura
        </span>
      </div>

      <div className="my-3 flex items-center justify-around gap-2">
        <div className="relative w-16 h-16 flex items-center justify-center">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 64 64">
            <circle cx="32" cy="36" r="24" fill="var(--accent-glow)" />
            <path d="M32 6C32 6 14 26 14 42C14 51.9 22.1 60 32 60C41.9 60 50 51.9 50 42C50 26 32 6 32 6Z" fill="var(--flame-outer)" />
            <path d="M32 18C32 18 20 32 20 44C20 50.6 25.4 56 32 56C38.6 56 44 50.6 44 44C44 32 32 18 32 18Z" fill="var(--flame-mid)" />
            <path d="M32 28C32 28 24 36 24 44C24 48.8 27.6 53 32 53C36.4 53 40 48.8 40 44C40 36 32 28 32 28Z" fill="var(--flame-core)" />
          </svg>
        </div>

        <div>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-extrabold font-mono-num text-[var(--text-main)] tracking-tight">
              {currentStreak}
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent-bright)]">Days</span>
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <p className="text-xs text-[var(--text-dim)]">
              Personal Best: <strong className="font-mono-num text-[var(--text-main)]">{longestStreak}d</strong>
            </p>
            {isFrozen && (
              <span className="text-[10px] px-1.5 py-0.5 rounded font-semibold font-mono-num bg-cyan-500/10 text-cyan-400">
                🛡️ FREEZE
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
