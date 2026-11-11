'use client';

import React from 'react';
import { ThemeKey } from '../../types';

interface SidebarNavigationProps {
  activeView: string;
  onViewChange: (view: string) => void;
  activeTheme: ThemeKey;
  onThemeChange: (theme: ThemeKey) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onOpenProfile: () => void;
}

export const SidebarNavigation: React.FC<SidebarNavigationProps> = ({
  activeView,
  onViewChange,
  activeTheme,
  onThemeChange,
  isCollapsed,
  onToggleCollapse,
  onOpenProfile,
}) => {
  const navItems = [
    { key: 'dashboard', label: 'Dashboard', icon: '📊' },
    { key: 'habits', label: 'Daily Habits', icon: '⚡' },
    { key: 'calendar', label: 'Calendar & History', icon: '📅' },
    { key: 'timer', label: 'Focus Timer', icon: '⏱️' },
    { key: 'analytics', label: 'Streak & Heatmap', icon: '📈' },
    { key: 'learning', label: 'Learning & Skills', icon: '🎓' },
    { key: 'goals', label: 'Goals & Challenges', icon: '🎯' },
    { key: 'inspector', label: 'Motion Lab', icon: '🧪' },
  ];

  return (
    <aside
      className={`sidebar-panel w-full ${
        isCollapsed ? 'lg:w-20' : 'lg:w-64'
      } lg:min-h-screen bento-card !rounded-none lg:!rounded-r-3xl border-b lg:border-b-0 lg:border-r border-[var(--border-subtle)] flex flex-col justify-between p-4 lg:p-5 shrink-0 z-20 transition-all duration-300`}
    >
      <div>
        {/* Brand & Collapse */}
        <div className="flex items-center justify-between gap-2 mb-6">
          <div className="flex items-center gap-3 overflow-hidden cursor-pointer" onClick={() => onViewChange('dashboard')}>
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-lg text-white font-bold"
              style={{
                background: 'linear-gradient(135deg, var(--accent-bright), var(--accent))',
                boxShadow: '0 0 20px var(--accent-glow)',
              }}
            >
              HF
            </div>
            {!isCollapsed && (
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-lg tracking-tight text-[var(--text-main)]">HabitFlow</span>
                  <span className="text-[10px] font-mono-num uppercase px-1.5 py-0.5 rounded-md font-semibold bg-[var(--accent-soft)] text-[var(--accent-bright)] border border-[var(--border-subtle)]">
                    v3.0 Pro
                  </span>
                </div>
                <p className="text-xs text-[var(--text-dim)]">Personal OS & Flow</p>
              </div>
            )}
          </div>

          <button
            onClick={onToggleCollapse}
            className="hidden lg:flex w-8 h-8 rounded-lg items-center justify-center hover:bg-white/5 border border-[var(--border-subtle)] text-[var(--text-dim)]"
          >
            {isCollapsed ? '▶' : '◀'}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex lg:flex-col gap-1.5 overflow-x-auto pb-2 lg:pb-0">
          {navItems.map(item => {
            const isMatch = activeView === item.key;
            return (
              <button
                key={item.key}
                onClick={() => onViewChange(item.key)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all shrink-0 ${
                  isMatch
                    ? 'bg-[var(--accent-soft)] text-[var(--accent-bright)] border border-[var(--border-highlight)]'
                    : 'text-[var(--text-dim)] hover:bg-white/5 border border-transparent'
                }`}
              >
                <span className="text-base">{item.icon}</span>
                {!isCollapsed && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Profile & Themes */}
      <div className="mt-4 pt-4 border-t border-[var(--border-subtle)] space-y-3">
        {/* Profile Card */}
        {!isCollapsed && (
          <div
            onClick={onOpenProfile}
            className="flex items-center justify-between p-2 rounded-xl bg-[var(--bg-input)] border border-[var(--border-subtle)] cursor-pointer hover:border-[var(--border-highlight)]"
          >
            <div className="flex items-center gap-2 overflow-hidden">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs bg-[var(--accent-soft)] text-[var(--accent-bright)] border border-[var(--border-highlight)]">
                AR
              </div>
              <div className="truncate text-left">
                <div className="text-xs font-semibold truncate text-[var(--text-main)]">Alex Rivera</div>
                <div className="text-[10px] flex items-center gap-1 font-mono-num text-[var(--accent-bright)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Cloud Synced</span>
                </div>
              </div>
            </div>
            <span className="text-xs text-[var(--text-dim)]">⚙️</span>
          </div>
        )}

        {/* Theme Swatches */}
        {!isCollapsed && (
          <div className="grid grid-cols-4 gap-2">
            {(['emerald', 'ultraviolet', 'amber', 'daylight'] as const).map(t => (
              <button
                key={t}
                onClick={() => onThemeChange(t)}
                className={`h-8 rounded-xl border-2 flex items-center justify-center transition-all ${
                  activeTheme === t ? 'border-[var(--accent-bright)] scale-105' : 'border-transparent opacity-75'
                }`}
                style={{ background: t === 'daylight' ? '#e5e7eb' : '#121212' }}
              >
                <span className="w-3.5 h-3.5 rounded-full" style={{ background: t === 'emerald' ? '#34d399' : t === 'ultraviolet' ? '#c084fc' : t === 'amber' ? '#fbbf24' : '#3b82f6' }} />
              </button>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
};
