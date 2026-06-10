import { IsString, IsEnum, IsOptional, IsArray, IsUUID } from 'class-validator'
import { ClassificationLevel, Priority, InvestigationStatus } from '@prisma/client'

export class UpdateInvestigationDto {
  @IsOptional() @IsString() name?: string
  @IsOptional() @IsString() description?: string
  @IsOptional() @IsEnum(ClassificationLevel) classification?: ClassificationLevel
  @IsOptional() @IsEnum(Priority) priority?: Priority
  @IsOptional() @IsEnum(InvestigationStatus) status?: InvestigationStatus
  @IsOptional() @IsArray() @IsString({ each: true }) objectives?: string[]
  @IsOptional() @IsArray() @IsString({ each: true }) tags?: string[]
  @IsOptional() @IsUUID() leadAnalystId?: string
  @IsOptional() @IsString() startDate?: string
  @IsOptional() @IsString() targetDate?: string
}
