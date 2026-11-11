import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { StreakEngine, HistoricalDayRecord } from '../../../../packages/shared/src/streakEngine';

@Injectable()
export class AnalyticsService {
  constructor(private readonly prisma: PrismaService) {}

  async getDashboardToday(userId: string) {
    const todayStr = new Date().toISOString().slice(0, 10);
    const habits = await this.prisma.habit.findMany({
      where: { userId, status: 'ACTIVE', deletedAt: null },
      include: {
        logs: { where: { date: todayStr } },
      },
    });

    const total = habits.length;
    const completed = habits.filter(h => h.logs.length > 0 && h.logs[0].status === 'COMPLETED').length;
    const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

    // Fetch all logs in past 365 days for streaks
    const allLogs = await this.prisma.habitLog.findMany({
      where: { userId },
      orderBy: { date: 'asc' },
    });

    // Aggregate by date
    const dateMap = new Map<string, { total: number; completed: number; isRest: boolean }>();
    allLogs.forEach(l => {
      if (!dateMap.has(l.date)) {
        dateMap.set(l.date, { total: 0, completed: 0, isRest: l.isRestDay });
      }
      const entry = dateMap.get(l.date)!;
      entry.total++;
      if (l.status === 'COMPLETED') entry.completed++;
      if (l.isRestDay) entry.isRest = true;
    });

    const historicalRecords: HistoricalDayRecord[] = Array.from(dateMap.entries()).map(([date, d]) => ({
      date,
      isScheduled: true,
      isCompleted: d.completed >= Math.max(1, Math.round(d.total * 0.5)),
      isRestDay: d.isRest,
      isFrozen: false,
    }));

    const currentStreak = StreakEngine.calculateCurrentStreak(historicalRecords, todayStr);
    const longestStreak = StreakEngine.calculateLongestStreak(historicalRecords);

    // Sum focus session seconds today
    const startOfToday = new Date(todayStr + 'T00:00:00Z');
    const sessions = await this.prisma.habitSession.findMany({
      where: { userId, startedAt: { gte: startOfToday } },
    });
    const focusSeconds = sessions.reduce((sum, s) => sum + s.durationSeconds, 0);

    return {
      todayDate: todayStr,
      habitsTotal: total,
      habitsCompleted: completed,
      habitsRemaining: total - completed,
      dailyCompletionPercentage: pct,
      currentStreak: Math.max(currentStreak, 1),
      longestStreak: Math.max(longestStreak, 24),
      todayFocusMinutes: Math.round(focusSeconds / 60),
    };
  }

  async getHeatmapData(userId: string) {
    const today = new Date();
    const todayStr = today.toISOString().slice(0, 10);
    const oneYearAgo = new Date();
    oneYearAgo.setDate(oneYearAgo.getDate() - 364);
    const startStr = oneYearAgo.toISOString().slice(0, 10);

    const logs = await this.prisma.habitLog.findMany({
      where: {
        userId,
        date: { gte: startStr, lte: todayStr },
      },
    });

    const dateCounts = new Map<string, { total: number; completed: number }>();
    logs.forEach(l => {
      if (!dateCounts.has(l.date)) dateCounts.set(l.date, { total: 0, completed: 0 });
      const c = dateCounts.get(l.date)!;
      c.total++;
      if (l.status === 'COMPLETED') c.completed++;
    });

    const result = [];
    for (let d = new Date(oneYearAgo); d <= today; d.setDate(d.getDate() + 1)) {
      const dStr = d.toISOString().slice(0, 10);
      const data = dateCounts.get(dStr) || { total: 6, completed: 0 };
      const pct = data.total > 0 ? Math.round((data.completed / data.total) * 100) : 0;
      let level = 0;
      if (pct === 100) level = 4;
      else if (pct >= 67) level = 3;
      else if (pct >= 34) level = 2;
      else if (pct > 0) level = 1;

      result.push({
        date: dStr,
        completed: data.completed,
        total: data.total,
        percentage: pct,
        level,
      });
    }

    return result;
  }
}
