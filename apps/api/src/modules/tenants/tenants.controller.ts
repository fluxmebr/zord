import { Controller, Get, UseGuards } from '@nestjs/common'
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger'
import { TenantsService } from './tenants.service'
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard'
import { TenantGuard } from '../../common/guards/tenant.guard'
import { CurrentUser } from '../../common/decorators/current-user.decorator'

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
