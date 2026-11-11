'use client';

import React, { useState } from 'react';
import { HabitCard } from './HabitCard';
import { HabitDto } from '../../types';

interface HabitListProps {
  habits: HabitDto[];
  onToggleHabit: (id: string) => void;
  onEditHabit: (habit: HabitDto) => void;
  onDeleteHabit: (id: string) => void;
  onStartTimer: (habit: HabitDto) => void;
  onOpenNotes: (habit: HabitDto) => void;
  onOpenCreateModal: () => void;
}

export const HabitList: React.FC<HabitListProps> = ({
  habits,
  onToggleHabit,
  onEditHabit,
  onDeleteHabit,
  onStartTimer,
  onOpenNotes,
  onOpenCreateModal,
}) => {
  const [filter, setFilter] = useState<string>('all');

  const filteredHabits = habits.filter(h => {
    if (filter === 'all') return true;
    if (filter === 'Morning' || filter === 'Evening' || filter === 'Midday') {
      return h.routineStack === filter.toUpperCase();
    }
    return h.category === filter;
  });

  return (
    <section className="bento-card p-5 sm:p-6 flex flex-col gap-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold tracking-tight">Today's Rituals & Flow</h2>
          </div>
          <p className="text-xs text-[var(--text-dim)] mt-0.5">
            Check off rituals to trigger spring physics, haptics, and Web Audio harmonic feedback
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {(['all', 'Mind', 'Body', 'Deep Work', 'Morning', 'Evening'] as const).map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                filter === cat
                  ? 'bg-[var(--accent-soft)] text-[var(--accent-bright)] border border-[var(--border-highlight)]'
                  : 'text-[var(--text-dim)] hover:bg-white/5 border border-transparent'
              }`}
            >
              {cat === 'all' ? 'All' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Habit Items */}
      <div className="flex flex-col gap-3">
        {filteredHabits.length === 0 ? (
          <div className="p-8 text-center rounded-2xl border border-dashed border-[var(--border-subtle)] text-[var(--text-dim)]">
            No rituals found in the "{filter}" filter. Add one below!
          </div>
        ) : (
          filteredHabits.map(h => (
            <HabitCard
              key={h.id}
              habit={h}
              onToggle={onToggleHabit}
              onEdit={onEditHabit}
              onDelete={onDeleteHabit}
              onStartTimer={onStartTimer}
              onOpenNotes={onOpenNotes}
            />
          ))
        )}
      </div>

      {/* Footer Shortcut to Full Habit Builder */}
      <div className="flex items-center justify-between pt-3 border-t border-[var(--border-subtle)] text-xs text-[var(--text-dim)]">
        <span>💡 Hover any ritual to start timer, view notes, or edit</span>
        <button
          type="button"
          onClick={onOpenCreateModal}
          className="font-semibold text-[var(--accent-bright)] hover:underline flex items-center gap-1"
        >
          <span>+ Full Habit Builder & Schedules</span>
        </button>
      </div>
    </section>
  );
};
