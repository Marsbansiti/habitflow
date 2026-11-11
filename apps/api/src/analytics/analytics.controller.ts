import { Controller, Get } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  private getUserId(): string {
    return 'user-primary-uuid';
  }

  @Get('today')
  async getTodaySummary() {
    return this.analyticsService.getDashboardToday(this.getUserId());
  }

  @Get('heatmap')
  async getHeatmap() {
    return this.analyticsService.getHeatmapData(this.getUserId());
  }
}
