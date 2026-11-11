'use client';

import React, { useState } from 'react';

interface DaySummary {
  date: string;
  dayNumber: number;
  percentage: number;
  isPerfect: boolean;
  isRestDay: boolean;
}

interface HabitCalendarProps {
  year: number;
  month: number; // 0-indexed
  days: DaySummary[];
  selectedDate: string;
  onSelectDate: (date: string) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
}

export const HabitCalendar: React.FC<HabitCalendarProps> = ({
  year,
  month,
  days,
  selectedDate,
  onSelectDate,
  onPrevMonth,
  onNextMonth,
  onToday,
}) => {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const firstDay = new Date(year, month, 1).getDay();
  // Mon = 0, Sun = 6
  const startOffset = firstDay === 0 ? 6 : firstDay - 1;

  return (
    <div className="bento-card p-5 sm:p-6 flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg sm:text-xl font-bold tracking-tight">
            {monthNames[month]} {year}
          </h2>
          <p className="text-xs text-[var(--text-dim)]">Inspect and edit previous entries, log reflections, and track consistency</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onPrevMonth}
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/5 border border-[var(--border-subtle)] text-[var(--text-main)]"
          >
            ◀
          </button>
          <button
            onClick={onToday}
            className="px-2.5 py-1 rounded-lg text-xs font-semibold font-mono-num bg-[var(--accent-soft)] text-[var(--accent-bright)]"
          >
            Today
          </button>
          <button
            onClick={onNextMonth}
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/5 border border-[var(--border-subtle)] text-[var(--text-main)]"
          >
            ▶
          </button>
        </div>
      </div>

      {/* Weekday Labels */}
      <div className="grid grid-cols-7 gap-2 text-center text-xs font-mono-num font-semibold text-[var(--text-dim)]">
        <div>MON</div><div>TUE</div><div>WED</div><div>THU</div><div>FRI</div><div>SAT</div><div>SUN</div>
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-2">
        {/* Leading blanks */}
        {Array.from({ length: startOffset }).map((_, i) => (
          <div key={`blank-${i}`} className="aspect-square opacity-0 pointer-events-none" />
        ))}

        {days.map(d => {
          const isSelected = d.date === selectedDate;
          const isToday = d.date === new Date().toISOString().slice(0, 10);

          let badgeBg = 'transparent';
          let badgeColor = 'var(--text-dim)';
          if (d.isPerfect) {
            badgeBg = 'var(--accent-bright)';
            badgeColor = '#ffffff';
          } else if (d.percentage >= 70) {
            badgeBg = 'var(--accent)';
            badgeColor = '#ffffff';
          } else if (d.percentage > 0) {
            badgeBg = 'var(--accent-soft)';
            badgeColor = 'var(--accent-bright)';
          }

          return (
            <div
              key={d.date}
              onClick={() => onSelectDate(d.date)}
              className={`aspect-square p-2 rounded-xl flex flex-col justify-between cursor-pointer transition-all duration-200 border ${
                isSelected
                  ? 'border-[var(--accent-bright)] shadow-[0_0_14px_var(--accent-glow)]'
                  : isToday
                  ? 'border-2 border-[var(--accent-bright)]'
                  : 'border-[var(--border-subtle)] bg-[var(--bg-input)] hover:border-[var(--accent-bright)]'
              }`}
            >
              <div className="flex items-center justify-between text-[11px] font-mono-num font-semibold">
                <span className={isToday ? 'text-[var(--accent-bright)]' : 'text-[var(--text-main)]'}>
                  {d.dayNumber}
                </span>
                {d.isRestDay ? <span>💤</span> : d.isPerfect ? <span>⭐</span> : null}
              </div>

              <div className="flex items-center justify-center">
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-mono-num font-bold"
                  style={{ background: badgeBg, color: badgeColor }}
                >
                  {d.percentage > 0 ? `${d.percentage}%` : '—'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
