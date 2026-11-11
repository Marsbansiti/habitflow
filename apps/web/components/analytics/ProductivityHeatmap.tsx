'use client';

import React, { useState } from 'react';

export interface HeatmapDay {
  date: string;
  completed: number;
  total: number;
  percentage: number;
  level: number; // 0 to 4
}

interface ProductivityHeatmapProps {
  days: HeatmapDay[];
  onSelectDate?: (date: string) => void;
}

export const ProductivityHeatmap: React.FC<ProductivityHeatmapProps> = ({ days, onSelectDate }) => {
  const [hoveredDay, setHoveredDay] = useState<HeatmapDay | null>(null);

  // Group 364 days into 52 columns of 7 days
  const columns: HeatmapDay[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    columns.push(days.slice(i, i + 7));
  }

  const levelClasses = [
    'bg-[var(--bg-input)] border border-white/5',
    'bg-[var(--accent-soft)] border border-[var(--border-subtle)]',
    'bg-emerald-600/40 border border-emerald-500/20',
    'bg-[var(--accent)] border border-emerald-400/30',
    'bg-[var(--accent-bright)] shadow-[0_0_8px_var(--accent-glow)] border border-white/40',
  ];

  return (
    <div className="bento-card p-5 sm:p-6 flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold tracking-tight">52-Week Productivity & Consistency Matrix</h2>
          <p className="text-xs text-[var(--text-dim)]">Annual density calendar calculated from verified daily activity</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono-num text-[var(--text-dim)]">
          <span>Less</span>
          {levelClasses.map((cls, idx) => (
            <span key={idx} className={`w-3.5 h-3.5 rounded-sm inline-block ${cls}`} />
          ))}
          <span>More</span>
        </div>
      </div>

      <div className="overflow-x-auto pb-2">
        <div className="flex gap-1 min-w-[760px] pt-2">
          {columns.map((col, cIdx) => (
            <div key={cIdx} className="flex flex-col gap-1">
              {col.map((day, dIdx) => (
                <div
                  key={dIdx}
                  onClick={() => onSelectDate?.(day.date)}
                  onMouseEnter={() => setHoveredDay(day)}
                  className={`w-3.5 h-3.5 rounded-sm transition-transform hover:scale-125 cursor-pointer ${
                    levelClasses[day.level] || levelClasses[0]
                  }`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="text-xs font-mono-num text-center pt-2 border-t border-[var(--border-subtle)] text-[var(--accent-bright)]">
        {hoveredDay
          ? `${hoveredDay.date}: ${hoveredDay.completed} of ${hoveredDay.total} rituals completed (${hoveredDay.percentage}% consistency)`
          : 'Hover any day cell to view exact completion score and habits'}
      </div>
    </div>
  );
};
