import { Controller, Get, Post, Patch, Delete, Body, Param, Query } from '@nestjs/common';
import { HabitsService } from './habits.service';
import { CreateHabitDto } from './dto/create-habit.dto';

@Controller('habits')
export class HabitsController {
  constructor(private readonly habitsService: HabitsService) {}

  // Mock authenticated userId for development context or extract from @Req() req.user.id
  private getUserId(): string {
    return 'user-primary-uuid';
  }

  @Get()
  async getHabits() {
    return this.habitsService.findAllForUser(this.getUserId());
  }

  @Post()
  async createHabit(@Body() dto: CreateHabitDto) {
    return this.habitsService.create(this.getUserId(), dto);
  }

  @Patch(':id')
  async updateHabit(@Param('id') id: string, @Body() data: any) {
    return this.habitsService.update(this.getUserId(), id, data);
  }

  @Delete(':id')
  async deleteHabit(@Param('id') id: string) {
    return this.habitsService.delete(this.getUserId(), id);
  }

  @Post(':id/logs')
  async logHabitCompletion(
    @Param('id') id: string,
    @Body() body: { date: string; isCompleted: boolean; notes?: string }
  ) {
    return this.habitsService.logCompletion(this.getUserId(), id, body.date, body.isCompleted, body.notes);
  }
}
