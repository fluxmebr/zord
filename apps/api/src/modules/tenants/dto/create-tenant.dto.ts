import { IsString, IsEmail, IsEnum, IsOptional, IsBoolean, IsInt, Min, ValidateNested, IsObject } from 'class-validator'
import { Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'

export class TenantSettingsDto {
  @IsString() defaultLanguage: string = 'en'
  @IsBoolean() @IsOptional() mfaRequired?: boolean = false
  @IsBoolean() @IsOptional() ssoEnabled?: boolean = false
  @IsBoolean() @IsOptional() watermarkEnabled?: boolean = true
  @IsInt() @Min(1) maxUsers: number = 5
  @IsInt() @Min(1) maxInvestigations: number = 10
  @IsInt() @Min(1) maxStorageGb: number = 5
  @IsInt() @Min(1) retentionDays: number = 90
  @IsOptional() allowedDomains?: string[] = []
}

export class AdminUserDto {
  @IsString() name: string
  @IsEmail() email: string
  @IsString() password: string
}

export class CreateTenantDto {
  @ApiProperty()
  @IsString()
  name: string

  @ApiProperty()
  @IsString()
  slug: string

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  domain?: string

  @ApiProperty({ enum: ['TRIAL', 'STARTER', 'PROFESSIONAL', 'ENTERPRISE'] })
  @IsEnum(['TRIAL', 'STARTER', 'PROFESSIONAL', 'ENTERPRISE'])
  plan: 'TRIAL' | 'STARTER' | 'PROFESSIONAL' | 'ENTERPRISE' = 'TRIAL'

  @ApiProperty()
  @ValidateNested()
  @Type(() => TenantSettingsDto)
  settings: TenantSettingsDto

  @ApiProperty()
  @ValidateNested()
  @Type(() => AdminUserDto)
  adminUser: AdminUserDto
}

export class UpdateTenantStatusDto {
  @ApiProperty({ enum: ['ACTIVE', 'SUSPENDED', 'ARCHIVED'] })
  @IsEnum(['ACTIVE', 'SUSPENDED', 'ARCHIVED'])
  status: 'ACTIVE' | 'SUSPENDED' | 'ARCHIVED'
}
