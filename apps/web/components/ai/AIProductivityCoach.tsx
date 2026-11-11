'use client';

import React, { useState } from 'react';
import { AIWeeklyReviewDto } from '../../types';

interface AIProductivityCoachProps {
  onGenerateWeeklyReview: () => Promise<AIWeeklyReviewDto>;
  onRefreshDailyInsight: () => void;
  dailyInsight: string;
}

export const AIProductivityCoach: React.FC<AIProductivityCoachProps> = ({
  onGenerateWeeklyReview,
  onRefreshDailyInsight,
  dailyInsight,
}) => {
  const [weeklyReview, setWeeklyReview] = useState<AIWeeklyReviewDto | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [chatQuestion, setChatQuestion] = useState<string>('');
  const [chatLog, setChatLog] = useState<{ sender: 'user' | 'ai'; text: string }[]>([
    {
      sender: 'ai',
      text: 'Hello Alex! I am your HabitFlow AI Coach. Ask me anything about your habit patterns, focus hours, or how to optimize your routine stacks.',
    },
  ]);

  const handleReview = async () => {
    setLoading(true);
    try {
      const res = await onGenerateWeeklyReview();
      setWeeklyReview(res);
    } finally {
      setLoading(false);
    }
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatQuestion.trim()) return;
    const q = chatQuestion.trim();
    setChatLog(prev => [...prev, { sender: 'user', text: q }]);
    setChatQuestion('');

    setTimeout(() => {
      let reply = '';
      if (q.toLowerCase().includes('why') || q.toLowerCase().includes('miss')) {
        reply = 'Analyzing your past 90 days: your miss rate spikes by 24% after 8:30 PM due to cognitive fatigue. Habit-stacking your reading ritual right after dinner will recover an estimated 85% of missed sessions.';
      } else if (q.toLowerCase().includes('hour') || q.toLowerCase().includes('learn')) {
        reply = 'You logged 18.5 focused hours this week across Python System Design and Spanish Vocab. You are 75% toward Level 12 in Python.';
      } else {
        reply = 'Your 18-day streak shows remarkable discipline in morning rituals. Focusing on maintaining sunlight and zero-inbox blocks tomorrow morning will push your current streak to 19 days.';
      }
      setChatLog(prev => [...prev, { sender: 'ai', text: reply }]);
    }, 600);
  };

  return (
    <div className="bento-card p-5 sm:p-6 flex flex-col gap-6">
      {/* Daily Insight Banner */}
      <div
        className="p-4 sm:p-5 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border"
        style={{
          background: 'linear-gradient(135deg, var(--bg-card-solid), var(--accent-soft))',
          borderColor: 'var(--border-highlight)',
        }}
      >
        <div className="flex items-start sm:items-center gap-3.5">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-lg text-white font-bold"
            style={{ background: 'var(--accent)', boxShadow: '0 0 16px var(--accent-glow)' }}
          >
            🧠
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent-bright)]">
                HabitFlow AI Coach
              </span>
              <span className="text-[10px] font-mono-num px-2 py-0.5 rounded-full bg-[var(--bg-card)] text-[var(--text-dim)]">
                Live Routine Intelligence
              </span>
            </div>
            <p className="text-xs sm:text-sm mt-0.5 text-[var(--text-main)]" dangerouslySetInnerHTML={{ __html: dailyInsight }} />
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleReview}
            className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-white transition-all shadow-md"
            style={{ background: 'var(--accent)' }}
          >
            {loading ? 'Analyzing...' : 'Generate Weekly Review'}
          </button>
          <button
            onClick={onRefreshDailyInsight}
            className="p-1.5 rounded-xl text-xs hover:bg-white/5 border border-[var(--border-subtle)] text-[var(--text-dim)]"
          >
            ↺
          </button>
        </div>
      </div>

      {/* Generated Weekly Review Card */}
      {weeklyReview && (
        <div className="p-5 rounded-2xl border border-[var(--border-highlight)] bg-[var(--bg-card-solid)] animate-in fade-in">
          <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
            <h4 className="font-bold text-sm">Comprehensive AI Performance Review</h4>
            <span className="text-xl font-mono-num font-extrabold text-[var(--accent-bright)]">
              Grade {weeklyReview.grade} ({weeklyReview.consistencyScore}%)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-xs">
            <div className="p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-input)]">
              <strong className="text-emerald-400 block mb-1">Winning Execution Pattern:</strong>
              <p className="text-[var(--text-main)]">{weeklyReview.winningPattern}</p>
            </div>
            <div className="p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-input)]">
              <strong className="text-cyan-400 block mb-1">Habit Stacking Optimization:</strong>
              <p className="text-[var(--text-main)]">{weeklyReview.habitStackingAdvice}</p>
            </div>
          </div>
          <p className="text-xs italic text-[var(--text-dim)] mt-3">"{weeklyReview.motivationalQuote}"</p>
        </div>
      )}

      {/* Interactive AI Chat Assistant */}
      <div className="p-4 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-input)] flex flex-col gap-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-dim)]">
          Conversational Productivity Assistant
        </h4>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-1 text-xs">
          {chatLog.map((c, i) => (
            <div
              key={i}
              className={`p-2.5 rounded-xl max-w-[85%] ${
                c.sender === 'user'
                  ? 'ml-auto bg-[var(--accent-soft)] border border-[var(--border-highlight)] text-[var(--text-main)]'
                  : 'bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-main)]'
              }`}
            >
              {c.text}
            </div>
          ))}
        </div>
        <form onSubmit={handleSendChat} className="flex gap-2 pt-2 border-t border-[var(--border-subtle)]">
          <input
            type="text"
            value={chatQuestion}
            onChange={e => setChatQuestion(e.target.value)}
            placeholder="Ask AI Coach (e.g. Why am I skipping evening workouts?)..."
            className="flex-1 px-3 py-1.5 rounded-xl text-xs bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-main)] focus:outline-none"
          />
          <button type="submit" className="px-4 py-1.5 rounded-xl text-xs font-bold text-white bg-[var(--accent)]">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};
