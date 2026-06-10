import { IsString, IsOptional, IsArray, IsObject } from 'class-validator'

export class UpdateEntityDto {
  @IsOptional() @IsString() label?: string
  @IsOptional() @IsArray() @IsString({ each: true }) aliases?: string[]
  @IsOptional() @IsObject() attributes?: Record<string, unknown>
  @IsOptional() @IsArray() sources?: unknown[]
}
