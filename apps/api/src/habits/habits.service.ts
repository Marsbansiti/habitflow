import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateHabitDto } from './dto/create-habit.dto';
import { StreakEngine, HistoricalDayRecord } from '../../../../packages/shared/src/streakEngine';

@Injectable()
export class HabitsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllForUser(userId: string) {
    const habits = await this.prisma.habit.findMany({
      where: { userId, deletedAt: null },
      include: {
        category: true,
        schedule: true,
        logs: {
          orderBy: { date: 'desc' },
          take: 90,
        },
      },
      orderBy: { sortOrder: 'asc' },
    });

    const todayStr = new Date().toISOString().slice(0, 10);

    return habits.map(h => {
      // Build day records for this habit
      const dayRecords: HistoricalDayRecord[] = h.logs.map(l => ({
        date: l.date,
        isScheduled: true,
        isCompleted: l.status === 'COMPLETED',
        isRestDay: l.isRestDay,
        isFrozen: l.isFrozen,
      }));

      const streak = StreakEngine.calculateCurrentStreak(dayRecords, todayStr);
      const todayLog = h.logs.find(l => l.date === todayStr);

      return {
        id: h.id,
        title: h.title,
        description: h.description,
        category: h.category?.name || 'General',
        priority: h.priority,
        routineStack: h.routineStack,
        targetDuration: h.targetDuration,
        targetUnit: h.targetUnit,
        difficulty: h.difficulty,
        timeHint: h.timeHint,
        status: h.status,
        currentStreak: streak,
        completedToday: todayLog?.status === 'COMPLETED',
        timeSpentToday: Math.round((todayLog?.actualValue || 0)),
        notes: todayLog?.notes || '',
      };
    });
  }

  async create(userId: string, dto: CreateHabitDto) {
    return this.prisma.habit.create({
      data: {
        userId,
        title: dto.title,
        description: dto.description,
        categoryId: dto.categoryId,
        priority: (dto.priority as any) || 'NORMAL',
        routineStack: (dto.routineStack as any) || 'ANYTIME',
        targetDuration: dto.targetDuration || 15,
        targetUnit: dto.targetUnit || 'mins',
        timeHint: dto.timeHint || 'Anytime',
        difficulty: (dto.difficulty as any) || 'MEDIUM',
        schedule: {
          create: {
            frequency: 'DAILY',
            daysOfWeek: [1, 2, 3, 4, 5, 6, 7],
          },
        },
      },
    });
  }

  async update(userId: string, habitId: string, data: any) {
    const habit = await this.prisma.habit.findUnique({ where: { id: habitId } });
    if (!habit) throw new NotFoundException('Habit not found');
    if (habit.userId !== userId) throw new ForbiddenException('Access denied');

    return this.prisma.habit.update({
      where: { id: habitId },
      data,
    });
  }

  async delete(userId: string, habitId: string) {
    const habit = await this.prisma.habit.findUnique({ where: { id: habitId } });
    if (!habit) throw new NotFoundException('Habit not found');
    if (habit.userId !== userId) throw new ForbiddenException('Access denied');

    // Soft delete
    return this.prisma.habit.update({
      where: { id: habitId },
      data: { deletedAt: new Date() },
    });
  }

  async logCompletion(userId: string, habitId: string, dateStr: string, isCompleted: boolean, notes?: string) {
    const habit = await this.prisma.habit.findUnique({ where: { id: habitId } });
    if (!habit) throw new NotFoundException('Habit not found');
    if (habit.userId !== userId) throw new ForbiddenException('Access denied');

    return this.prisma.habitLog.upsert({
      where: {
        habitId_date: { habitId, date: dateStr },
      },
      update: {
        status: isCompleted ? 'COMPLETED' : 'MISSED',
        notes: notes !== undefined ? notes : undefined,
        completedAt: isCompleted ? new Date() : null,
      },
      create: {
        userId,
        habitId,
        date: dateStr,
        status: isCompleted ? 'COMPLETED' : 'MISSED',
        notes: notes || '',
        completedAt: isCompleted ? new Date() : null,
      },
    });
  }
}
