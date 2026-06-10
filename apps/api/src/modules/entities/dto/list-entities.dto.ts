import { IsOptional, IsEnum, IsString, IsInt, Min } from 'class-validator'
import { Type } from 'class-transformer'
import { EntityType } from '@prisma/client'

export class ListEntitiesDto {
  @IsOptional() @Type(() => Number) @IsInt() @Min(1) page?: number = 1
  @IsOptional() @Type(() => Number) @IsInt() @Min(1) limit?: number = 20
  @IsOptional() @IsEnum(EntityType) type?: EntityType
  @IsOptional() @IsString() search?: string
  @IsOptional() @IsString() investigationId?: string
}
