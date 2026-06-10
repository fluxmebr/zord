import { IsEnum, IsUUID, IsOptional, IsString, IsObject } from 'class-validator'
import { RelationshipType } from '@prisma/client'

export class CreateRelationshipDto {
  @IsUUID() targetEntityId!: string
  @IsEnum(RelationshipType) type!: RelationshipType
  @IsOptional() @IsString() description?: string
  @IsOptional() @IsObject() properties?: Record<string, unknown>
}
