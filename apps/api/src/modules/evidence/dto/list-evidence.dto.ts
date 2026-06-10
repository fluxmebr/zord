import { IsOptional, IsEnum, IsString, IsInt, Min, IsUUID } from 'class-validator'
import { Type } from 'class-transformer'
import { EvidenceType, EvidenceStatus } from '@prisma/client'

export class ListEvidenceDto {
  @IsOptional() @Type(() => Number) @IsInt() @Min(1) page?: number = 1
  @IsOptional() @Type(() => Number) @IsInt() @Min(1) limit?: number = 20
  @IsOptional() @IsUUID() investigationId?: string
  @IsOptional() @IsEnum(EvidenceType) type?: EvidenceType
  @IsOptional() @IsEnum(EvidenceStatus) status?: EvidenceStatus
  @IsOptional() @IsString() search?: string
}
