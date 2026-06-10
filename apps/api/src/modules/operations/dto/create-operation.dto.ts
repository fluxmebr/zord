import { IsString, IsEnum, IsOptional, IsArray, IsUUID, IsDateString } from 'class-validator'
import { Priority } from '@prisma/client'

export class CreateOperationDto {
  @IsString() title!: string
  @IsOptional() @IsString() description?: string
  @IsEnum(Priority) priority!: Priority
  @IsOptional() @IsUUID() investigationId?: string
  @IsOptional() @IsArray() @IsUUID(undefined, { each: true }) assigneeIds?: string[]
  @IsOptional() @IsDateString() dueDate?: string
  @IsOptional() @IsString() notes?: string
}
