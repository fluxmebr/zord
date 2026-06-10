import { Controller, Get, Param, UseGuards } from '@nestjs/common'
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger'
import { GraphService } from './graph.service'
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard'
import { RolesGuard } from '../../common/guards/roles.guard'
import { TenantGuard } from '../../common/guards/tenant.guard'
import { CurrentUser } from '../../common/decorators/current-user.decorator'
import { RequirePermissions } from '../../common/decorators/roles.decorator'

@ApiTags('graph')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, TenantGuard, RolesGuard)
@Controller({ path: 'graph', version: '1' })
export class GraphController {
  constructor(private readonly service: GraphService) {}

  @Get(':investigationId')
  @RequirePermissions('investigation:read')
  getGraph(
    @CurrentUser('tenantId') tenantId: string,
    @Param('investigationId') investigationId: string,
  ) {
    return this.service.getInvestigationGraph(tenantId, investigationId)
  }

  @Get('path/:sourceId/:targetId')
  @RequirePermissions('investigation:read')
  searchPath(
    @CurrentUser('tenantId') tenantId: string,
    @Param('sourceId') sourceId: string,
    @Param('targetId') targetId: string,
  ) {
    return this.service.searchPath(tenantId, sourceId, targetId)
  }
}
