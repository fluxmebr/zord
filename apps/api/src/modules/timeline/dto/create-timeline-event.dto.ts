import { IsString, IsOptional, IsArray, IsObject, IsDateString, IsUUID } from 'class-validator'

export class CreateTimelineEventDto {
  @IsString() eventType!: string
  @IsString() title!: string
  @IsOptional() @IsString() description?: string
  @IsDateString() occurredAt!: string
  @IsString() sourceType!: string
  @IsString() sourceId!: string
  @IsOptional() @IsUUID() investigationId?: string
  @IsOptional() @IsArray() @IsString({ each: true }) entityIds?: string[]
  @IsOptional() @IsObject() metadata?: Record<string, unknown>
}
