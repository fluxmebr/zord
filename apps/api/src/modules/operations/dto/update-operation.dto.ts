import { IsString, IsEnum, IsOptional, IsArray, IsUUID, IsDateString } from 'class-validator'
import { Priority, OperationStatus } from '@prisma/client'

export class UpdateOperationDto {
  @IsOptional() @IsString() title?: string
  @IsOptional() @IsString() description?: string
  @IsOptional() @IsEnum(Priority) priority?: Priority
  @IsOptional() @IsEnum(OperationStatus) status?: OperationStatus
  @IsOptional() @IsArray() @IsUUID(undefined, { each: true }) assigneeIds?: string[]
  @IsOptional() @IsDateString() dueDate?: string
  @IsOptional() @IsString() notes?: string
}
