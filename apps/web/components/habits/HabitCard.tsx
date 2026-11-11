'use client';

import React from 'react';
import { TactileCheckbox } from '../ui/TactileCheckbox';
import { HabitDto } from '../../types';

interface HabitCardProps {
  habit: HabitDto;
  onToggle: (id: string) => void;
  onEdit: (habit: HabitDto) => void;
  onDelete: (id: string) => void;
  onStartTimer: (habit: HabitDto) => void;
  onOpenNotes: (habit: HabitDto) => void;
}

export const HabitCard: React.FC<HabitCardProps> = ({
  habit,
  onToggle,
  onEdit,
  onDelete,
  onStartTimer,
  onOpenNotes,
}) => {
  const priorityClasses = {
    HIGH: 'text-red-400 border-red-500/30 bg-red-500/10',
    NORMAL: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
    LOW: 'text-blue-400 border-blue-500/30 bg-blue-500/10',
  }[habit.priority || 'NORMAL'];

  return (
    <div
      className={`habit-row ${
        habit.completedToday ? 'is-completed' : ''
      } p-3.5 sm:px-4 sm:py-3.5 flex items-center justify-between gap-3 group rounded-2xl border transition-all duration-300`}
      style={{
        background: habit.completedToday
          ? 'linear-gradient(135deg, var(--accent-soft), var(--bg-input) 75%)'
          : 'var(--bg-input)',
        borderColor: habit.completedToday ? 'var(--border-highlight)' : 'var(--border-subtle)',
      }}
    >
      {/* Shimmer sweep effect */}
      <div className="habit-shimmer" />

      {/* Left: Tactile Checkbox + Title & Badges */}
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <TactileCheckbox checked={habit.completedToday} onToggle={() => onToggle(habit.id)} />

        <div className="min-w-0 flex-1">
          <div className="habit-title-wrap max-w-full">
            <span
              className={`font-semibold text-sm sm:text-base block truncate transition-opacity ${
                habit.completedToday ? 'opacity-60 line-through' : 'opacity-100'
              }`}
            >
              {habit.title}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 mt-1 text-xs">
            <span
              className="px-2 py-0.5 rounded-md font-medium text-[10px]"
              style={{
                background: 'var(--bg-card)',
                color: 'var(--text-muted)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              {habit.category}
            </span>
            <span className={`px-1.5 py-0.5 rounded border text-[10px] font-mono-num ${priorityClasses}`}>
              {habit.priority}
            </span>
            <span className="text-[11px] font-mono-num text-[var(--text-dim)]">
              ⏰ {habit.timeHint || 'Anytime'}
            </span>
            {habit.timeSpentToday > 0 && (
              <span className="text-[10px] font-mono-num text-cyan-400">
                ⏱️ {habit.timeSpentToday}m
              </span>
            )}
            {habit.notes && (
              <span className="text-[10px] text-amber-400 font-mono-num cursor-pointer" onClick={() => onOpenNotes(habit)}>
                📝 Notes
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Right: Actions Menu + Real Streak Flame */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Actions Hover Menu */}
        <div className="flex items-center gap-1 opacity-70 group-hover:opacity-100 transition-opacity">
          <button
            type="button"
            onClick={() => onStartTimer(habit)}
            title="Focus Timer"
            className="p-1.5 rounded-lg hover:bg-white/10 text-cyan-400"
          >
            ⏱️
          </button>
          <button
            type="button"
            onClick={() => onOpenNotes(habit)}
            title="Notes & Proof"
            className="p-1.5 rounded-lg hover:bg-white/10 text-amber-400"
          >
            📝
          </button>
          <button
            type="button"
            onClick={() => onEdit(habit)}
            title="Edit Ritual"
            className="p-1.5 rounded-lg hover:bg-white/10 text-gray-300"
          >
            ✏️
          </button>
          <button
            type="button"
            onClick={() => onDelete(habit.id)}
            title="Delete Ritual"
            className="p-1.5 rounded-lg hover:bg-white/10 text-red-400"
          >
            🗑️
          </button>
        </div>

        {/* Real Streak Flame Badge */}
        <div
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl font-mono-num text-xs font-semibold"
          style={{
            background: habit.completedToday ? 'var(--accent-soft)' : 'var(--bg-card)',
            color: habit.completedToday ? 'var(--accent-bright)' : 'var(--text-dim)',
            border: `1px solid ${habit.completedToday ? 'var(--border-highlight)' : 'var(--border-subtle)'}`,
          }}
        >
          <span>🔥</span>
          <span>{habit.currentStreak}d</span>
        </div>
      </div>
    </div>
  );
};
