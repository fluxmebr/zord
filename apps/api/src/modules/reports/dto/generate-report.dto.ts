import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator'
import { ReportType } from '@prisma/client'

export class GenerateReportDto {
  @IsEnum(ReportType) type!: ReportType
  @IsString() title!: string
  @IsOptional() @IsUUID() investigationId?: string
  @IsOptional() @IsString() notes?: string
}
