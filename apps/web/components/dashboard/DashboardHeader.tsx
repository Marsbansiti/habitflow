'use client';

import React from 'react';

interface DashboardHeaderProps {
  title: string;
  platformLabel?: string;
  speed: number;
  onToggleSpeed: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onRunDemoCascade: () => void;
  onOpenHabitBuilder: () => void;
  onSyncCloud: () => void;
  isSyncing?: boolean;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  title,
  platformLabel = 'Productivity OS',
  speed,
  onToggleSpeed,
  soundEnabled,
  onToggleSound,
  onRunDemoCascade,
  onOpenHabitBuilder,
  onSyncCloud,
  isSyncing,
}) => {
  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <div className="flex items-center gap-2.5 flex-wrap">
          <span
            className="inline-flex items-center gap-1.5 text-xs font-mono-num uppercase tracking-wider px-2.5 py-1 rounded-full"
            style={{
              background: 'var(--accent-soft)',
              color: 'var(--accent-bright)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <span className="w-2 h-2 rounded-full animate-pulse bg-[var(--accent-bright)]" />
            <span>{platformLabel}</span>
          </span>

          {/* Cloud Sync Button */}
          <button
            onClick={onSyncCloud}
            title="Click to trigger cloud synchronization"
            className="inline-flex items-center gap-1.5 text-xs font-mono-num px-2.5 py-1 rounded-full transition-all hover:border-[var(--accent-bright)] bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-muted)]"
          >
            <span className={isSyncing ? 'animate-spin' : ''}>☁️</span>
            <span>{isSyncing ? 'Syncing...' : 'Cloud: Synced'}</span>
          </button>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-2 text-[var(--text-main)]">
          {title}
        </h1>
      </div>

      {/* Control Buttons */}
      <div className="flex flex-wrap items-center gap-2.5">
        {/* Speed Toggle */}
        <button
          type="button"
          onClick={onToggleSpeed}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono-num font-semibold transition-all bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-main)]"
        >
          <span>Speed:</span>
          <span className="px-1.5 py-0.5 rounded text-[11px] bg-[var(--accent-soft)] text-[var(--accent-bright)]">
            {speed === 0.4 ? '0.4x Slow-Mo' : '1.0x Normal'}
          </span>
        </button>

        {/* Audio Toggle */}
        <button
          type="button"
          onClick={onToggleSound}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono-num font-semibold transition-all bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-main)]"
        >
          <span>{soundEnabled ? '🔊 Synth SFX: ON' : '🔇 Synth SFX: MUTE'}</span>
        </button>

        {/* Demo Cascade */}
        <button
          type="button"
          onClick={onRunDemoCascade}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all hover:scale-[1.02] active:scale-95 text-white shadow-md"
          style={{
            background: 'linear-gradient(135deg, var(--accent-bright), var(--accent))',
            boxShadow: '0 6px 20px -4px var(--accent-glow)',
          }}
        >
          <span>▶ Demo Cascade</span>
        </button>

        {/* New Habit Builder Shortcut */}
        <button
          type="button"
          onClick={onOpenHabitBuilder}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all hover:scale-[1.02] active:scale-95 bg-[var(--bg-card)] border border-[var(--border-highlight)] text-[var(--accent-bright)]"
        >
          <span>+ Builder</span>
        </button>
      </div>
    </header>
  );
};
