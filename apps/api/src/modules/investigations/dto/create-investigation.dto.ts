import { IsString, IsEnum, IsOptional, IsArray, IsUUID, MinLength } from 'class-validator'
import { ClassificationLevel, Priority } from '@prisma/client'

export class CreateInvestigationDto {
  @IsString() @MinLength(3) name!: string
  @IsOptional() @IsString() description?: string
  @IsEnum(ClassificationLevel) classification!: ClassificationLevel
  @IsEnum(Priority) priority!: Priority
  @IsOptional() @IsArray() @IsString({ each: true }) objectives?: string[]
  @IsOptional() @IsArray() @IsString({ each: true }) tags?: string[]
  @IsOptional() @IsUUID() leadAnalystId?: string
  @IsOptional() @IsString() startDate?: string
  @IsOptional() @IsString() targetDate?: string
}
