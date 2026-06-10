import { Controller, Get, Post, Body, Param, Query, UseGuards, HttpCode, HttpStatus } from '@nestjs/common'
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger'
import { TimelineService } from './timeline.service'
import { CreateTimelineEventDto } from './dto/create-timeline-event.dto'
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard'
import { RolesGuard } from '../../common/guards/roles.guard'
import { TenantGuard } from '../../common/guards/tenant.guard'
import { CurrentUser } from '../../common/decorators/current-user.decorator'
import { RequirePermissions } from '../../common/decorators/roles.decorator'

@ApiTags('timeline')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, TenantGuard, RolesGuard)
@Controller({ path: 'timeline', version: '1' })
export class TimelineController {
  constructor(private readonly service: TimelineService) {}

  @Get()
  @RequirePermissions('investigation:read')
  list(
    @CurrentUser('tenantId') tenantId: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.service.findAll(tenantId, Number(page) || 1, Number(limit) || 50)
  }

  @Get('investigation/:id')
  @RequirePermissions('investigation:read')
  byInvestigation(@CurrentUser('tenantId') tenantId: string, @Param('id') id: string) {
    return this.service.getByInvestigation(tenantId, id)
  }

  @Post()
  @RequirePermissions('investigation:update')
  @HttpCode(HttpStatus.CREATED)
  create(@CurrentUser('tenantId') tenantId: string, @Body() dto: CreateTimelineEventDto) {
    return this.service.createEvent(tenantId, dto)
  }
}
