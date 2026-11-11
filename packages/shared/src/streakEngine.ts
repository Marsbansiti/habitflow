// HabitFlow Deterministic Streak Calculation Engine
// Computes real streaks, longest streaks, consistency percentages, and rest day freeze protection

export interface HistoricalDayRecord {
  date: string; // YYYY-MM-DD
  isScheduled: boolean;
  isCompleted: boolean;
  isRestDay: boolean;
  isFrozen: boolean;
}

export class StreakEngine {
  /**
   * Calculates consecutive active streak ending on or before today
   * Handles scheduled rest days and streak freeze shields without breaking the streak.
   */
  static calculateCurrentStreak(records: HistoricalDayRecord[], todayStr: string): number {
    const recordMap = new Map<string, HistoricalDayRecord>();
    records.forEach(r => recordMap.set(r.date, r));

    let streak = 0;
    const cursor = new Date(todayStr + 'T12:00:00Z');

    const todayRecord = recordMap.get(todayStr);
    // If today is completed or marked rest/frozen, today counts towards streak
    if (todayRecord && (todayRecord.isCompleted || todayRecord.isRestDay || todayRecord.isFrozen)) {
      if (todayRecord.isCompleted) streak++;
      cursor.setUTCDate(cursor.getUTCDate() - 1);
    } else {
      // If today is not yet done, verify backwards starting from yesterday
      cursor.setUTCDate(cursor.getUTCDate() - 1);
    }

    while (true) {
      const dStr = cursor.toISOString().slice(0, 10);
      const rec = recordMap.get(dStr);

      if (!rec) {
        // No recorded history before this date; end of streak sequence
        break;
      }

      // If day was not scheduled (e.g. weekend habit on weekday), skip without penalty
      if (!rec.isScheduled) {
        cursor.setUTCDate(cursor.getUTCDate() - 1);
        continue;
      }

      // Planned rest day or freeze shield preserves streak continuity
      if (rec.isRestDay || rec.isFrozen) {
        cursor.setUTCDate(cursor.getUTCDate() - 1);
        continue;
      }

      // Day was scheduled: must be completed to extend streak
      if (rec.isCompleted) {
        streak++;
        cursor.setUTCDate(cursor.getUTCDate() - 1);
      } else {
        // First missed day breaks the streak
        break;
      }
    }

    return streak;
  }

  /**
   * Calculates all-time longest streak across the complete historical dataset
   */
  static calculateLongestStreak(records: HistoricalDayRecord[]): number {
    if (!records || records.length === 0) return 0;

    // Sort ascending by date
    const sorted = [...records].sort((a, b) => a.date.localeCompare(b.date));

    let longest = 0;
    let current = 0;

    for (const rec of sorted) {
      if (!rec.isScheduled) continue;
      if (rec.isRestDay || rec.isFrozen) continue;

      if (rec.isCompleted) {
        current++;
        if (current > longest) longest = current;
      } else {
        current = 0;
      }
    }

    return longest;
  }

  /**
   * Calculates verified consistency percentage across a specific window of days (e.g. 7, 30, 90, 365)
   */
  static calculateConsistencyPercentage(
    records: HistoricalDayRecord[],
    startDateStr: string,
    endDateStr: string
  ): number {
    const windowRecords = records.filter(r => r.date >= startDateStr && r.date <= endDateStr && r.isScheduled);
    if (windowRecords.length === 0) return 0;

    const completedCount = windowRecords.filter(r => r.isCompleted || r.isRestDay).length;
    return Math.round((completedCount / windowRecords.length) * 100);
  }
}
