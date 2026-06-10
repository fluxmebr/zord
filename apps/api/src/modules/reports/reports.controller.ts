import { Controller, Get, Post, Body, Param, Query, UseGuards, HttpCode, HttpStatus } from '@nestjs/common'
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger'
import { ReportsService } from './reports.service'
import { GenerateReportDto } from './dto/generate-report.dto'
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard'
import { RolesGuard } from '../../common/guards/roles.guard'
import { TenantGuard } from '../../common/guards/tenant.guard'
import { CurrentUser } from '../../common/decorators/current-user.decorator'
import { RequirePermissions } from '../../common/decorators/roles.decorator'

@ApiTags('reports')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, TenantGuard, RolesGuard)
@Controller({ path: 'reports', version: '1' })
export class ReportsController {
  constructor(private readonly service: ReportsService) {}

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

  @Post('generate')
  @RequirePermissions('investigation:update')
  @HttpCode(HttpStatus.CREATED)
  generate(
    @CurrentUser('tenantId') tenantId: string,
    @CurrentUser('id') userId: string,
    @Body() dto: GenerateReportDto,
  ) {
    return this.service.generate(tenantId, userId, dto)
  }
}
