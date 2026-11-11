import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SessionsService {
  constructor(private readonly prisma: PrismaService) {}

  async startSession(userId: string, habitId?: string, mode: any = 'POMODORO', targetSeconds = 1500) {
    return this.prisma.habitSession.create({
      data: {
        userId,
        habitId,
        mode,
        targetSeconds,
        startedAt: new Date(),
        isCompleted: false,
      },
    });
  }

  async completeSession(userId: string, sessionId: string, durationSeconds: number, notes?: string) {
    const session = await this.prisma.habitSession.findUnique({ where: { id: sessionId } });
    if (!session || session.userId !== userId) throw new NotFoundException('Session not found');

    const updated = await this.prisma.habitSession.update({
      where: { id: sessionId },
      data: {
        durationSeconds,
        isCompleted: true,
        endedAt: new Date(),
        notes,
      },
    });

    // If attached to a habit, update today's log actualValue
    if (session.habitId) {
      const todayStr = new Date().toISOString().slice(0, 10);
      const minutesSpent = Math.round(durationSeconds / 60);

      const existingLog = await this.prisma.habitLog.findUnique({
        where: { habitId_date: { habitId: session.habitId, date: todayStr } },
      });

      const currentVal = existingLog?.actualValue || 0;
      await this.prisma.habitLog.upsert({
        where: { habitId_date: { habitId: session.habitId, date: todayStr } },
        update: {
          actualValue: currentVal + minutesSpent,
          status: 'COMPLETED',
        },
        create: {
          userId,
          habitId: session.habitId,
          date: todayStr,
          actualValue: minutesSpent,
          status: 'COMPLETED',
        },
      });
    }

    return updated;
  }

  async getRecentSessions(userId: string) {
    return this.prisma.habitSession.findMany({
      where: { userId },
      include: { habit: true },
      orderBy: { startedAt: 'desc' },
      take: 20,
    });
  }
}
