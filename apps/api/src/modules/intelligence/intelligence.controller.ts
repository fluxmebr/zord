import { Controller, Get, Post, Body, Param, UseGuards, HttpCode, HttpStatus } from '@nestjs/common'
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger'
import { IntelligenceService } from './intelligence.service'
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard'
import { RolesGuard } from '../../common/guards/roles.guard'
import { TenantGuard } from '../../common/guards/tenant.guard'
import { CurrentUser } from '../../common/decorators/current-user.decorator'
import { RequirePermissions } from '../../common/decorators/roles.decorator'
import { IsString, IsOptional, IsUUID } from 'class-validator'

class AnalyzeDto {
  @IsUUID() investigationId!: string
  @IsOptional() @IsString() question?: string
}

class SummaryDto {
  @IsUUID() investigationId!: string
}

@ApiTags('intelligence')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, TenantGuard, RolesGuard)
@Controller({ path: 'intelligence', version: '1' })
export class IntelligenceController {
  constructor(private readonly service: IntelligenceService) {}

  @Post('analyze')
  @RequirePermissions('investigation:read')
  @HttpCode(HttpStatus.OK)
  analyze(@CurrentUser('tenantId') tenantId: string, @Body() dto: AnalyzeDto) {
    return this.service.analyzeInvestigation(tenantId, dto.investigationId, dto.question)
  }

  @Post('summary')
  @RequirePermissions('investigation:read')
  @HttpCode(HttpStatus.OK)
  summary(@CurrentUser('tenantId') tenantId: string, @Body() dto: SummaryDto) {
    return this.service.generateSummary(tenantId, dto.investigationId)
  }

  @Get('gaps/:investigationId')
  @RequirePermissions('investigation:read')
  gaps(@CurrentUser('tenantId') tenantId: string, @Param('investigationId') id: string) {
    return this.service.detectGaps(tenantId, id)
  }

  @Get('contradictions/:investigationId')
  @RequirePermissions('investigation:read')
  contradictions(@CurrentUser('tenantId') tenantId: string, @Param('investigationId') id: string) {
    return this.service.detectContradictions(tenantId, id)
  }
}
