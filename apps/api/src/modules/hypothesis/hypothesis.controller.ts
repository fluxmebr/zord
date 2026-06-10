import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, HttpCode, HttpStatus } from '@nestjs/common'
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger'
import { HypothesisService } from './hypothesis.service'
import { CreateHypothesisDto } from './dto/create-hypothesis.dto'
import { UpdateHypothesisDto } from './dto/update-hypothesis.dto'
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard'
import { RolesGuard } from '../../common/guards/roles.guard'
import { TenantGuard } from '../../common/guards/tenant.guard'
import { CurrentUser } from '../../common/decorators/current-user.decorator'
import { RequirePermissions } from '../../common/decorators/roles.decorator'
import { EvidenceRole } from '@prisma/client'

@ApiTags('hypothesis')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, TenantGuard, RolesGuard)
@Controller({ path: 'hypothesis', version: '1' })
export class HypothesisController {
  constructor(private readonly service: HypothesisService) {}

  @Get()
  @RequirePermissions('investigation:read')
  list(
    @CurrentUser('tenantId') tenantId: string,
    @Query('investigationId') investigationId?: string,
  ) {
    return this.service.findAll(tenantId, investigationId)
  }

  @Get(':id')
  @RequirePermissions('investigation:read')
  findOne(@CurrentUser('tenantId') tenantId: string, @Param('id') id: string) {
    return this.service.findOne(tenantId, id)
  }

  @Post()
  @RequirePermissions('investigation:update')
  @HttpCode(HttpStatus.CREATED)
  create(@CurrentUser('tenantId') tenantId: string, @Body() dto: CreateHypothesisDto) {
    return this.service.create(tenantId, dto)
  }

  @Put(':id')
  @RequirePermissions('investigation:update')
  update(
    @CurrentUser('tenantId') tenantId: string,
    @Param('id') id: string,
    @Body() dto: UpdateHypothesisDto,
  ) {
    return this.service.update(tenantId, id, dto)
  }

  @Post(':id/evidence/:evidenceId')
  @RequirePermissions('investigation:update')
  addEvidence(
    @CurrentUser('tenantId') tenantId: string,
    @Param('id') id: string,
    @Param('evidenceId') evidenceId: string,
    @Query('role') role: EvidenceRole = 'SUPPORTING',
  ) {
    return this.service.addEvidence(tenantId, id, evidenceId, role)
  }

  @Delete(':id/evidence/:evidenceId')
  @RequirePermissions('investigation:update')
  removeEvidence(
    @CurrentUser('tenantId') tenantId: string,
    @Param('id') id: string,
    @Param('evidenceId') evidenceId: string,
    @Query('role') role: EvidenceRole = 'SUPPORTING',
  ) {
    return this.service.removeEvidence(tenantId, id, evidenceId, role)
  }
}
