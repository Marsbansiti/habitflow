import { IsString, IsNotEmpty, IsOptional, IsEnum, IsNumber, Min } from 'class-validator';

export class CreateHabitDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  categoryId?: string;

  @IsString()
  @IsOptional()
  priority?: 'LOW' | 'NORMAL' | 'HIGH';

  @IsString()
  @IsOptional()
  routineStack?: 'MORNING' | 'MIDDAY' | 'EVENING' | 'ANYTIME';

  @IsNumber()
  @IsOptional()
  @Min(1)
  targetDuration?: number;

  @IsString()
  @IsOptional()
  targetUnit?: string;

  @IsString()
  @IsOptional()
  timeHint?: string;

  @IsString()
  @IsOptional()
  difficulty?: 'EASY' | 'MEDIUM' | 'CHALLENGING' | 'ELITE';
}
