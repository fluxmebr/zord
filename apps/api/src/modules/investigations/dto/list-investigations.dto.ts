import { IsOptional, IsEnum, IsString, IsInt, Min, Max } from 'class-validator'
import { Type } from 'class-transformer'
import { ClassificationLevel, Priority, InvestigationStatus } from '@prisma/client'

export class ListInvestigationsDto {
  @IsOptional() @Type(() => Number) @IsInt() @Min(1) page?: number = 1
  @IsOptional() @Type(() => Number) @IsInt() @Min(1) @Max(100) limit?: number = 20
  @IsOptional() @IsEnum(InvestigationStatus) status?: InvestigationStatus
  @IsOptional() @IsEnum(Priority) priority?: Priority
  @IsOptional() @IsEnum(ClassificationLevel) classification?: ClassificationLevel
  @IsOptional() @IsString() search?: string
}
