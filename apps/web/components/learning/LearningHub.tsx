'use client';

import React from 'react';
import { SkillTrackDto } from '../../types';

interface LearningHubProps {
  skills: SkillTrackDto[];
  onLogSession: (skillId: string) => void;
  onAddVocab?: () => void;
}

export const LearningHub: React.FC<LearningHubProps> = ({ skills, onLogSession, onAddVocab }) => {
  return (
    <div className="bento-card p-5 sm:p-6 flex flex-col gap-5">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight">Personal Learning & Skills Operating System</h2>
          <p className="text-xs text-[var(--text-dim)]">Track mastery levels, vocabulary growth, code projects, practice logs, and milestones</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onLogSession(skills[0]?.id || '')}
            className="px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md"
            style={{
              background: 'var(--accent)',
              color: '#fff',
              boxShadow: '0 4px 14px var(--accent-glow)',
            }}
          >
            + Log Practice Session
          </button>
          {onAddVocab && (
            <button
              onClick={onAddVocab}
              className="px-3 py-2 rounded-xl text-xs font-semibold bg-[var(--bg-input)] border border-[var(--border-subtle)] text-[var(--text-main)]"
            >
              📖 Add Vocab Word
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {skills.map(s => (
          <div
            key={s.id}
            className="p-5 rounded-2xl flex flex-col justify-between gap-4 border border-[var(--border-subtle)] hover:border-[var(--border-highlight)] transition-all bg-[var(--bg-input)]"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{s.flag}</span>
                  <div>
                    <h3 className="font-bold text-sm sm:text-base">{s.title}</h3>
                    <span className="text-[11px] font-mono-num font-semibold text-[var(--accent-bright)]">
                      Level {s.level} • {s.levelName}
                    </span>
                  </div>
                </div>
                <span className="text-xs font-mono-num font-bold text-[var(--accent)]">
                  {s.progressPercentage}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-1.5 rounded-full overflow-hidden mt-3 bg-[var(--bg-card)]">
                <div
                  className="h-full rounded-full transition-all duration-500 bg-[var(--accent-bright)]"
                  style={{ width: `${s.progressPercentage}%` }}
                />
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-2 mt-4 text-xs font-mono-num">
                {s.vocabulary && (
                  <div className="p-2 rounded-xl bg-[var(--bg-card)]">
                    <div className="text-[10px] text-[var(--text-dim)]">VOCABULARY</div>
                    <div className="font-bold text-[var(--accent-bright)]">
                      {s.vocabulary.learned} / {s.vocabulary.target}
                    </div>
                  </div>
                )}
                <div className="p-2 rounded-xl bg-[var(--bg-card)]">
                  <div className="text-[10px] text-[var(--text-dim)]">PRACTICE HOURS</div>
                  <div className="font-bold">{s.hoursLogged}h Logged</div>
                </div>
                <div className="p-2 rounded-xl bg-[var(--bg-card)]">
                  <div className="text-[10px] text-[var(--text-dim)]">SESSIONS</div>
                  <div className="font-bold">{s.sessionsCount} Sessions</div>
                </div>
                {s.vocabulary && (
                  <div className="p-2 rounded-xl bg-[var(--bg-card)]">
                    <div className="text-[10px] text-[var(--text-dim)]">REVISION DUE</div>
                    <div className="font-bold text-amber-400">{s.vocabulary.revisionDue} Words</div>
                  </div>
                )}
              </div>

              {s.notes && (
                <p className="text-[11px] mt-3 text-[var(--text-dim)]">
                  💡 {s.notes}
                </p>
              )}
            </div>

            <button
              onClick={() => onLogSession(s.id)}
              className="w-full py-1.5 rounded-xl text-xs font-semibold text-white"
              style={{ background: 'var(--accent)' }}
            >
              + Log Session
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
