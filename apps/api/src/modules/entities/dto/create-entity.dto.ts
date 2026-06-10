import { IsString, IsEnum, IsOptional, IsArray, IsObject, MinLength } from 'class-validator'
import { EntityType } from '@prisma/client'

export class CreateEntityDto {
  @IsEnum(EntityType) type!: EntityType
  @IsString() @MinLength(1) label!: string
  @IsOptional() @IsArray() @IsString({ each: true }) aliases?: string[]
  @IsOptional() @IsObject() attributes?: Record<string, unknown>
  @IsOptional() @IsArray() sources?: unknown[]
}
