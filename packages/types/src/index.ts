// HabitFlow Shared Domain Types & Contracts

export type ThemeKey = 'emerald' | 'ultraviolet' | 'amber' | 'daylight';

export type HabitPriority = 'LOW' | 'NORMAL' | 'HIGH';
export type RoutineStack = 'MORNING' | 'MIDDAY' | 'EVENING' | 'ANYTIME';
export type HabitDifficulty = 'EASY' | 'MEDIUM' | 'CHALLENGING' | 'ELITE';
export type HabitStatus = 'ACTIVE' | 'PAUSED' | 'ARCHIVED';
export type LogStatus = 'COMPLETED' | 'PARTIAL' | 'SKIPPED' | 'MISSED' | 'REST_DAY';
export type SessionMode = 'POMODORO' | 'DEEP_FLOW' | 'SHORT_BREAK' | 'LONG_BREAK' | 'STOPWATCH';
export type GoalPeriod = 'WEEKLY' | 'MONTHLY' | 'YEARLY' | 'CUSTOM';
export type MoodType = 'GREAT' | 'GOOD' | 'NEUTRAL' | 'TIRED' | 'STRESSED';

export interface UserDto {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  timezone: string;
}

export interface HabitDto {
  id: string;
  title: string;
  description?: string;
  category: string;
  priority: HabitPriority;
  routineStack: RoutineStack;
  targetValue?: number;
  targetUnit?: string;
  targetDuration?: number; // in minutes
  difficulty: HabitDifficulty;
  timeHint?: string;
  status: HabitStatus;
  currentStreak: number;
  completedToday: boolean;
  timeSpentToday: number;
  notes?: string;
}

export interface HabitLogDto {
  id: string;
  habitId: string;
  date: string; // YYYY-MM-DD
  status: LogStatus;
  actualValue?: number;
  notes?: string;
  evidenceUrl?: string;
  isRestDay: boolean;
  isFrozen: boolean;
}

export interface StreakMetricsDto {
  currentStreak: number;
  longestStreak: number;
  todayCompletionRate: number;
  weeklyConsistencyRate: number;
  monthlyConsistencyRate: number;
  totalActiveDays: number;
  bestWeekday: string;
  streakFreezeRemaining: number;
}

export interface DashboardMetricsDto {
  todayDate: string;
  habitsTotal: number;
  habitsCompleted: number;
  habitsRemaining: number;
  dailyCompletionPercentage: number;
  streak: StreakMetricsDto;
  weeklyProductivityHours: number;
  todayFocusMinutes: number;
  recentInsight?: {
    id: string;
    title: string;
    content: string;
  };
}

export interface SessionLogDto {
  id: string;
  habitId?: string;
  mode: SessionMode;
  startedAt: string;
  endedAt?: string;
  durationSeconds: number;
  isCompleted: boolean;
  ambientSound: string;
}

export interface GoalDto {
  id: string;
  title: string;
  period: GoalPeriod;
  targetValue: number;
  unit: string;
  currentValue: number;
  progressPercentage: number;
  startDate: string;
  endDate: string;
  isCompleted: boolean;
  connectedHabitIds: string[];
}

export interface SkillTrackDto {
  id: string;
  title: string;
  flag: string;
  level: number;
  levelName: string;
  progressPercentage: number;
  hoursLogged: number;
  sessionsCount: number;
  vocabulary?: {
    learned: number;
    target: number;
    revisionDue: number;
  };
  notes?: string;
}

export interface AIWeeklyReviewDto {
  grade: 'A+' | 'A' | 'B+' | 'B' | 'C';
  consistencyScore: number;
  ritualsCompleted: number;
  ritualsTotal: number;
  winningPattern: string;
  habitStackingAdvice: string;
  motivationalQuote: string;
}
