import { Controller, Get, Post } from '@nestjs/common';
import { AIService } from './ai.service';

@Controller('ai')
export class AIController {
  constructor(private readonly aiService: AIService) {}

  private getUserId(): string {
    return 'user-primary-uuid';
  }

  @Get('insights/daily')
  async getDailyInsight() {
    return this.aiService.getDailyCoachingInsight(this.getUserId());
  }

  @Post('review/weekly')
  async generateWeeklyReview() {
    return this.aiService.generateWeeklyReview(this.getUserId());
  }
}
