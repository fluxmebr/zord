import { IsString, IsOptional, IsUUID, MinLength } from 'class-validator'

export class CreateHypothesisDto {
  @IsUUID() investigationId!: string
  @IsString() @MinLength(3) title!: string
  @IsString() description!: string
  @IsString() objective!: string
}
