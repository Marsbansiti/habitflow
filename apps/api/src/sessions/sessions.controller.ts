import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { SessionsService } from './sessions.service';

@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  private getUserId(): string {
    return 'user-primary-uuid';
  }

  @Post('start')
  async start(@Body() body: { habitId?: string; mode?: string; targetSeconds?: number }) {
    return this.sessionsService.startSession(this.getUserId(), body.habitId, body.mode as any, body.targetSeconds);
  }

  @Post(':id/complete')
  async complete(@Param('id') id: string, @Body() body: { durationSeconds: number; notes?: string }) {
    return this.sessionsService.completeSession(this.getUserId(), id, body.durationSeconds, body.notes);
  }

  @Get('history')
  async history() {
    return this.sessionsService.getRecentSessions(this.getUserId());
  }
}
