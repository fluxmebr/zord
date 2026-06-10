import { Controller, Get, Param, UseGuards } from '@nestjs/common'
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger'
import { UsersService } from './users.service'
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard'
import { RolesGuard } from '../../common/guards/roles.guard'
import { TenantGuard } from '../../common/guards/tenant.guard'
import { CurrentUser } from '../../common/decorators/current-user.decorator'
import { RequirePermissions } from '../../common/decorators/roles.decorator'

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, TenantGuard, RolesGuard)
@Controller({ path: 'users', version: '1' })
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get()
  @RequirePermissions('user:read')
  list(@CurrentUser('tenantId') tenantId: string) {
    return this.service.findAll(tenantId)
  }

  @Get(':id')
  @RequirePermissions('user:read')
  findOne(@CurrentUser('tenantId') tenantId: string, @Param('id') id: string) {
    return this.service.findOne(tenantId, id)
  }
}
