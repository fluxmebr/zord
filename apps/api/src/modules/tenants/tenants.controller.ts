import { Controller, Get, Post, Patch, Body, Param, UseGuards } from '@nestjs/common'
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger'
import { TenantsService } from './tenants.service'
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard'
import { RolesGuard } from '../../common/guards/roles.guard'
import { TenantGuard } from '../../common/guards/tenant.guard'
import { Roles } from '../../common/decorators/roles.decorator'
import { CurrentUser } from '../../common/decorators/current-user.decorator'
import { CreateTenantDto, UpdateTenantStatusDto } from './dto/create-tenant.dto'

@ApiTags('tenants')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, TenantGuard)
@Controller({ path: 'tenants', version: '1' })
export class TenantsController {
  constructor(private readonly service: TenantsService) {}

  @Get('me')
  me(@CurrentUser('tenantId') tenantId: string) {
    return this.service.getStats(tenantId)
  }
}

@ApiTags('admin/tenants')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('SUPER_ADMIN')
@Controller({ path: 'admin/tenants', version: '1' })
export class AdminTenantsController {
  constructor(private readonly service: TenantsService) {}

  @Get()
  listAll() {
    return this.service.listAll()
  }

  @Post()
  create(@Body() dto: CreateTenantDto) {
    return this.service.createWithAdmin(dto)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.getStats(id)
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() dto: UpdateTenantStatusDto) {
    return this.service.updateStatus(id, dto)
  }
}
