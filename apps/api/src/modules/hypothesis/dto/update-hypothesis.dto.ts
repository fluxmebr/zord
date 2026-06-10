import { IsString, IsEnum, IsOptional } from 'class-validator'
import { HypothesisStatus } from '@prisma/client'

export class UpdateHypothesisDto {
  @IsOptional() @IsString() title?: string
  @IsOptional() @IsString() description?: string
  @IsOptional() @IsString() objective?: string
  @IsOptional() @IsEnum(HypothesisStatus) status?: HypothesisStatus
}
