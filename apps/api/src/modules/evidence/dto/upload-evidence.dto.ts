import { IsString, IsEnum, IsOptional, IsArray, IsUUID } from 'class-validator'
import { EvidenceType } from '@prisma/client'

export class UploadEvidenceDto {
  @IsUUID() investigationId!: string
  @IsEnum(EvidenceType) type!: EvidenceType
  @IsOptional() @IsString() description?: string
  @IsOptional() @IsArray() @IsString({ each: true }) tags?: string[]
  // In real impl these come from multipart; keeping as stubs
  @IsOptional() @IsString() filename?: string
  @IsOptional() @IsString() mimeType?: string
}
