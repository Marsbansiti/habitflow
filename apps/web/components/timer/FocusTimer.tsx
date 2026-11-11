'use client';

import React, { useState, useEffect } from 'react';
import { HabitDto } from '../../types';

interface FocusTimerProps {
  habits: HabitDto[];
  onSessionComplete: (habitId: string | undefined, durationSeconds: number, notes?: string) => void;
}

export const FocusTimer: React.FC<FocusTimerProps> = ({ habits, onSessionComplete }) => {
  const [minutes, setMinutes] = useState<number>(25);
  const [seconds, setSeconds] = useState<number>(0);
  const [totalSeconds, setTotalSeconds] = useState<number>(1500);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [mode, setMode] = useState<string>('Pomodoro');
  const [linkedHabitId, setLinkedHabitId] = useState<string>(habits[0]?.id || '');
  const [ambientSound, setAmbientSound] = useState<string>('mute');

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(interval!);
            setIsRunning(false);
            onSessionComplete(linkedHabitId, totalSeconds);
            alert('🎉 Focus block completed!');
            return;
          }
          setMinutes(prev => prev - 1);
          setSeconds(59);
        } else {
          setSeconds(prev => prev - 1);
        }
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, minutes, seconds, totalSeconds, linkedHabitId, onSessionComplete]);

  const setPreset = (mins: number, label: string) => {
    setIsRunning(false);
    setMinutes(mins);
    setSeconds(0);
    setTotalSeconds(mins * 60);
    setMode(label);
  };

  const currentSeconds = minutes * 60 + seconds;
  const radius = 100;
  const circumference = 2 * Math.PI * radius;
  const strokeOffset = circumference * (1 - currentSeconds / totalSeconds);

  return (
    <div className="bento-card p-6 sm:p-8 flex flex-col items-center justify-between text-center gap-6 relative overflow-hidden">
      {/* Presets */}
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-1.5 p-1 rounded-xl text-xs font-semibold bg-[var(--bg-input)] border border-[var(--border-subtle)]">
          <button
            onClick={() => setPreset(25, 'Pomodoro')}
            className={`px-3 py-1 rounded-lg transition-all ${
              mode === 'Pomodoro' ? 'bg-[var(--accent-soft)] text-[var(--accent-bright)]' : 'text-[var(--text-dim)]'
            }`}
          >
            25m Focus
          </button>
          <button
            onClick={() => setPreset(50, 'Deep Flow')}
            className={`px-3 py-1 rounded-lg transition-all ${
              mode === 'Deep Flow' ? 'bg-[var(--accent-soft)] text-[var(--accent-bright)]' : 'text-[var(--text-dim)]'
            }`}
          >
            50m Flow
          </button>
          <button
            onClick={() => setPreset(5, 'Short Break')}
            className={`px-3 py-1 rounded-lg transition-all ${
              mode === 'Short Break' ? 'bg-[var(--accent-soft)] text-[var(--accent-bright)]' : 'text-[var(--text-dim)]'
            }`}
          >
            5m Rest
          </button>
        </div>
        <span className="text-xs font-mono-num px-2.5 py-0.5 rounded-full font-semibold bg-[var(--accent-soft)] text-[var(--accent-bright)]">
          {isRunning ? 'FOCUSING' : 'READY'}
        </span>
      </div>

      {/* Circular Animated SVG Countdown */}
      <div className="relative w-64 h-64 flex items-center justify-center my-2">
        <svg className="w-full h-full overflow-visible" viewBox="0 0 240 240">
          <circle cx="120" cy="120" r={radius} fill="none" stroke="var(--border-subtle)" strokeWidth="12" />
          <circle
            cx="120"
            cy="120"
            r={radius}
            fill="none"
            stroke="url(#ringStrokeGrad)"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeOffset}
            className="transition-all duration-700 ease-linear origin-center -rotate-90"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-5xl font-extrabold font-mono-num tracking-tight text-[var(--text-main)]">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>
          <span className="text-xs font-semibold mt-1 uppercase tracking-wider text-[var(--accent-bright)]">
            {mode} Block
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className="px-8 py-3 rounded-2xl text-sm font-bold uppercase tracking-wider transition-all hover:scale-105 active:scale-95 shadow-lg"
          style={{
            background: 'linear-gradient(135deg, var(--accent-bright), var(--accent))',
            color: '#fff',
            boxShadow: '0 6px 24px var(--accent-glow)',
          }}
        >
          {isRunning ? 'Pause Focus' : 'Start Focus'}
        </button>
        <button
          onClick={() => {
            setIsRunning(false);
            setMinutes(25);
            setSeconds(0);
          }}
          className="p-3 rounded-2xl hover:bg-white/5 border border-[var(--border-subtle)] text-[var(--text-dim)]"
        >
          ↺
        </button>
      </div>

      {/* Habit Linker */}
      <div className="w-full max-w-sm pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs">
        <span className="text-[var(--text-dim)]">Contributes to Ritual:</span>
        <select
          value={linkedHabitId}
          onChange={e => setLinkedHabitId(e.target.value)}
          className="px-3 py-1.5 rounded-xl font-semibold bg-[var(--bg-input)] text-[var(--text-main)] border border-[var(--border-subtle)]"
        >
          {habits.map(h => (
            <option key={h.id} value={h.id}>{h.title}</option>
          ))}
        </select>
      </div>
    </div>
  );
};
