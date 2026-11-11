'use client';

import React, { useState, useEffect } from 'react';
import { SidebarNavigation } from '../components/dashboard/SidebarNavigation';
import { DashboardHeader } from '../components/dashboard/DashboardHeader';
import { ProgressRing } from '../components/dashboard/ProgressRing';
import { StreakCounter } from '../components/dashboard/StreakCounter';
import { HabitList } from '../components/habits/HabitList';
import { HabitCalendar } from '../components/calendar/HabitCalendar';
import { ProductivityHeatmap } from '../components/analytics/ProductivityHeatmap';
import { FocusTimer } from '../components/timer/FocusTimer';
import { LearningHub } from '../components/learning/LearningHub';
import { AIProductivityCoach } from '../components/ai/AIProductivityCoach';
import { ThemeKey, HabitDto, SkillTrackDto } from '../types';

export default function HabitFlowApp() {
  const [activeView, setActiveView] = useState<string>('dashboard');
  const [theme, setTheme] = useState<ThemeKey>('emerald');
  const [speed, setSpeed] = useState<number>(1.0);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [ringScope, setRingScope] = useState<'day' | 'week' | 'month'>('day');
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  // Initial Habits
  const [habits, setHabits] = useState<HabitDto[]>([
    {
      id: 'h1',
      title: 'Morning Sunlight & Hydration (15m)',
      category: 'Body',
      priority: 'HIGH',
      routineStack: 'MORNING',
      currentStreak: 18,
      completedToday: true,
      timeHint: '07:30 AM',
      targetDuration: 15,
      difficulty: 'EASY',
      status: 'ACTIVE',
      timeSpentToday: 15,
    },
    {
      id: 'h2',
      title: 'Zero-Inbox Deep Architecture Block',
      category: 'Deep Work',
      priority: 'HIGH',
      routineStack: 'MIDDAY',
      currentStreak: 19,
      completedToday: true,
      timeHint: '09:00 AM',
      targetDuration: 90,
      difficulty: 'CHALLENGING',
      status: 'ACTIVE',
      timeSpentToday: 90,
    },
    {
      id: 'h3',
      title: 'Mindful Breathwork & Box Breathing',
      category: 'Mind',
      priority: 'NORMAL',
      routineStack: 'MIDDAY',
      currentStreak: 18,
      completedToday: true,
      timeHint: '12:15 PM',
      targetDuration: 10,
      difficulty: 'EASY',
      status: 'ACTIVE',
      timeSpentToday: 10,
    },
    {
      id: 'h4',
      title: 'Zone 2 Cardio / Kettlebell Flow',
      category: 'Body',
      priority: 'NORMAL',
      routineStack: 'EVENING',
      currentStreak: 11,
      completedToday: false,
      timeHint: '05:30 PM',
      targetDuration: 35,
      difficulty: 'MEDIUM',
      status: 'ACTIVE',
      timeSpentToday: 0,
    },
    {
      id: 'h5',
      title: 'Read 20 Pages of Non-Fiction',
      category: 'Mind',
      priority: 'NORMAL',
      routineStack: 'EVENING',
      currentStreak: 22,
      completedToday: false,
      timeHint: '08:45 PM',
      targetDuration: 25,
      difficulty: 'EASY',
      status: 'ACTIVE',
      timeSpentToday: 0,
    },
    {
      id: 'h6',
      title: 'Ship Daily Design Commit & Log',
      category: 'Deep Work',
      priority: 'NORMAL',
      routineStack: 'EVENING',
      currentStreak: 18,
      completedToday: false,
      timeHint: '09:30 PM',
      targetDuration: 20,
      difficulty: 'MEDIUM',
      status: 'ACTIVE',
      timeSpentToday: 0,
    },
  ]);

  // Skills
  const [skills] = useState<SkillTrackDto[]>([
    {
      id: 'spanish',
      title: 'Spanish & Polyglot Track',
      flag: '🇪🇸',
      level: 7,
      levelName: 'Intermediate B1',
      progressPercentage: 84,
      hoursLogged: 48,
      sessionsCount: 64,
      vocabulary: { learned: 840, target: 1000, revisionDue: 142 },
    },
    {
      id: 'python',
      title: 'Python, ML & System Design',
      flag: '🐍',
      level: 11,
      levelName: 'Senior Architect',
      progressPercentage: 75,
      hoursLogged: 124,
      sessionsCount: 88,
    },
    {
      id: 'excel',
      title: 'Advanced Excel & Data Analytics',
      flag: '📊',
      level: 6,
      levelName: 'Financial Modeler',
      progressPercentage: 60,
      hoursLogged: 36,
      sessionsCount: 30,
    },
    {
      id: 'driving',
      title: 'Driving Practice & Road Mastery',
      flag: '🚗',
      level: 4,
      levelName: 'Advanced Road Ready',
      progressPercentage: 85,
      hoursLogged: 34,
      sessionsCount: 22,
    },
    {
      id: 'yoga',
      title: 'Fitness & Aerial Yoga Flow',
      flag: '🧘',
      level: 5,
      levelName: 'Aerial Silk Flow',
      progressPercentage: 70,
      hoursLogged: 32,
      sessionsCount: 28,
    },
    {
      id: 'reading',
      title: '2026 Non-Fiction Reading Quest',
      flag: '📚',
      level: 8,
      levelName: 'Avid Reader',
      progressPercentage: 72,
      hoursLogged: 54,
      sessionsCount: 38,
    },
  ]);

  const completedCount = habits.filter(h => h.completedToday).length;
  const totalCount = habits.length;
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const handleToggleHabit = (id: string) => {
    setHabits(prev =>
      prev.map(h => (h.id === id ? { ...h, completedToday: !h.completedToday } : h))
    );
  };

  const handleSyncCloud = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      alert('☁️ Cloud synchronization complete! All records verified.');
    }, 700);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen" data-theme={theme}>
      {/* Sidebar Navigation */}
      <SidebarNavigation
        activeView={activeView}
        onViewChange={setActiveView}
        activeTheme={theme}
        onThemeChange={setTheme}
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
        onOpenProfile={() => alert('Profile and Sync Settings')}
      />

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1440px] w-full mx-auto flex flex-col gap-6">
        <DashboardHeader
          title={
            activeView === 'dashboard'
              ? 'Daily Flow & Tactile Streak Lab'
              : activeView === 'habits'
              ? 'Habit Management & Routine Architect'
              : activeView === 'calendar'
              ? 'Calendar & Historical Logs'
              : activeView === 'timer'
              ? 'Tactile Focus Timer & Pomodoro'
              : activeView === 'analytics'
              ? 'Streak & Heatmap Analytics'
              : activeView === 'learning'
              ? 'Learning & Skills Operating System'
              : 'Productivity OS'
          }
          speed={speed}
          onToggleSpeed={() => setSpeed(s => (s === 1.0 ? 0.4 : 1.0))}
          soundEnabled={soundEnabled}
          onToggleSound={() => setSoundEnabled(prev => !prev)}
          onRunDemoCascade={() => {
            habits.forEach((h, i) => {
              setTimeout(() => handleToggleHabit(h.id), i * 300);
            });
          }}
          onOpenHabitBuilder={() => alert('Opening Full Habit Builder Modal')}
          onSyncCloud={handleSyncCloud}
          isSyncing={isSyncing}
        />

        {/* View Routing */}
        {activeView === 'dashboard' && (
          <div className="space-y-6 animate-in fade-in">
            <AIProductivityCoach
              dailyInsight="Outstanding momentum, Alex! Your 18-day streak is primed for lock-in. Stacking <strong>Mindful Breathwork</strong> right after lunch increases afternoon deep work focus by 40%."
              onGenerateWeeklyReview={async () => ({
                grade: 'A+',
                consistencyScore: 92,
                ritualsCompleted: 41,
                ritualsTotal: 45,
                winningPattern: 'High morning discipline with zero friction on early rituals.',
                habitStackingAdvice: 'Evening rituals experience higher drop-off after 8:30 PM. Stack your reading directly onto evening tea.',
                motivationalQuote: 'We are what we repeatedly do. Excellence is not an act, but a habit. — Will Durant',
              })}
              onRefreshDailyInsight={() => {}}
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-7">
                <HabitList
                  habits={habits}
                  onToggleHabit={handleToggleHabit}
                  onEditHabit={h => alert(`Edit ritual: ${h.title}`)}
                  onDeleteHabit={id => setHabits(prev => prev.filter(h => h.id !== id))}
                  onStartTimer={h => {
                    setActiveView('timer');
                  }}
                  onOpenNotes={h => alert(`Notes for: ${h.title}`)}
                  onOpenCreateModal={() => alert('Habit Creation Modal')}
                />
              </div>

              <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6">
                <div className="sm:col-span-1 lg:col-span-6">
                  <ProgressRing
                    percentage={percentage}
                    completed={completedCount}
                    total={totalCount}
                    scope={ringScope}
                    onScopeChange={setRingScope}
                  />
                </div>
                <div className="sm:col-span-1 lg:col-span-6">
                  <StreakCounter currentStreak={18} longestStreak={24} />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeView === 'habits' && (
          <HabitList
            habits={habits}
            onToggleHabit={handleToggleHabit}
            onEditHabit={h => alert(`Edit ritual: ${h.title}`)}
            onDeleteHabit={id => setHabits(prev => prev.filter(h => h.id !== id))}
            onStartTimer={() => setActiveView('timer')}
            onOpenNotes={h => alert(`Notes for: ${h.title}`)}
            onOpenCreateModal={() => alert('Habit Creation Modal')}
          />
        )}

        {activeView === 'calendar' && (
          <HabitCalendar
            year={2026}
            month={10}
            days={Array.from({ length: 30 }).map((_, i) => ({
              date: `2026-11-${String(i + 1).padStart(2, '0')}`,
              dayNumber: i + 1,
              percentage: i < 18 ? (i % 3 === 0 ? 100 : 83) : 60,
              isPerfect: i < 18 && i % 3 === 0,
              isRestDay: i === 18,
            }))}
            selectedDate="2026-11-11"
            onSelectDate={d => alert(`Selected date: ${d}`)}
            onPrevMonth={() => {}}
            onNextMonth={() => {}}
            onToday={() => {}}
          />
        )}

        {activeView === 'timer' && (
          <FocusTimer
            habits={habits}
            onSessionComplete={(habitId, secs) => {
              alert(`Session complete! Logged ${Math.round(secs / 60)} minutes.`);
            }}
          />
        )}

        {activeView === 'analytics' && (
          <ProductivityHeatmap
            days={Array.from({ length: 364 }).map((_, i) => ({
              date: `2026-${String(Math.floor(i / 30) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`,
              completed: (i % 6) + 1,
              total: 6,
              percentage: Math.round(((i % 6 + 1) / 6) * 100),
              level: (i % 5),
            }))}
            onSelectDate={d => alert(`Inspecting heatmap date: ${d}`)}
          />
        )}

        {activeView === 'learning' && (
          <LearningHub
            skills={skills}
            onLogSession={skillId => alert(`Logging practice for skill: ${skillId}`)}
            onAddVocab={() => alert('Add Vocabulary Flashcard')}
          />
        )}
      </main>
    </div>
  );
}
