import { Controller, Get, Post, Patch, Body, Param, Query, UseGuards } from '@nestjs/common'
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger'
import { AlertsService, CreateAlertDto } from './alerts.service'
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard'
import { RolesGuard } from '../../common/guards/roles.guard'
import { TenantGuard } from '../../common/guards/tenant.guard'
import { CurrentUser } from '../../common/decorators/current-user.decorator'
import { RequirePermissions } from '../../common/decorators/roles.decorator'

@ApiTags('alerts')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, TenantGuard, RolesGuard)
@Controller({ path: 'alerts', version: '1' })
export class AlertsController {
  constructor(private readonly service: AlertsService) {}

  @Get()
  @RequirePermissions('investigation:read')
  list(
    @CurrentUser('tenantId') tenantId: string,
    @Query('status') status?: string,
    @Query('severity') severity?: string,
  ) {
    return this.service.findAll(tenantId, status, severity)
  }

  @Post()
  @RequirePermissions('investigation:update')
  create(@CurrentUser('tenantId') tenantId: string, @Body() dto: CreateAlertDto) {
    return this.service.create(tenantId, dto)
  }

  @Patch(':id/acknowledge')
  @RequirePermissions('investigation:update')
  acknowledge(
    @CurrentUser('tenantId') tenantId: string,
    @CurrentUser('id') userId: string,
    @Param('id') id: string,
  ) {
    return this.service.acknowledge(tenantId, id, userId)
  }

  @Patch(':id/resolve')
  @RequirePermissions('investigation:update')
  resolve(@CurrentUser('tenantId') tenantId: string, @Param('id') id: string) {
    return this.service.resolve(tenantId, id)
  }
}
