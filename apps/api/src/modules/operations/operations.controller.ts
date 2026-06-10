import { Controller, Get, Post, Put, Patch, Body, Param, Query, UseGuards, HttpCode, HttpStatus } from '@nestjs/common'
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger'
import { OperationsService } from './operations.service'
import { CreateOperationDto } from './dto/create-operation.dto'
import { UpdateOperationDto } from './dto/update-operation.dto'
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard'
import { RolesGuard } from '../../common/guards/roles.guard'
import { TenantGuard } from '../../common/guards/tenant.guard'
import { CurrentUser } from '../../common/decorators/current-user.decorator'
import { RequirePermissions } from '../../common/decorators/roles.decorator'

@ApiTags('operations')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, TenantGuard, RolesGuard)
@Controller({ path: 'operations', version: '1' })
export class OperationsController {
  constructor(private readonly service: OperationsService) {}

  @Get()
  @RequirePermissions('investigation:read')
  list(
    @CurrentUser('tenantId') tenantId: string,
    @Query('investigationId') investigationId?: string,
    @Query('status') status?: string,
  ) {
    return this.service.findAll(tenantId, investigationId, status)
  }

  @Get(':id')
  @RequirePermissions('investigation:read')
  findOne(@CurrentUser('tenantId') tenantId: string, @Param('id') id: string) {
    return this.service.findOne(tenantId, id)
  }

  @Post()
  @RequirePermissions('investigation:update')
  @HttpCode(HttpStatus.CREATED)
  create(@CurrentUser('tenantId') tenantId: string, @Body() dto: CreateOperationDto) {
    return this.service.create(tenantId, dto)
  }

  @Put(':id')
  @RequirePermissions('investigation:update')
  update(
    @CurrentUser('tenantId') tenantId: string,
    @Param('id') id: string,
    @Body() dto: UpdateOperationDto,
  ) {
    return this.service.update(tenantId, id, dto)
  }

  @Patch(':id/complete')
  @RequirePermissions('investigation:update')
  complete(@CurrentUser('tenantId') tenantId: string, @Param('id') id: string) {
    return this.service.complete(tenantId, id)
  }
}
