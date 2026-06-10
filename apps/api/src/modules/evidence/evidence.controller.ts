import { Controller, Get, Post, Body, Param, Query, UseGuards, HttpCode, HttpStatus } from '@nestjs/common'
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger'
import { EvidenceService } from './evidence.service'
import { UploadEvidenceDto } from './dto/upload-evidence.dto'
import { ListEvidenceDto } from './dto/list-evidence.dto'
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard'
import { RolesGuard } from '../../common/guards/roles.guard'
import { TenantGuard } from '../../common/guards/tenant.guard'
import { CurrentUser } from '../../common/decorators/current-user.decorator'
import { RequirePermissions } from '../../common/decorators/roles.decorator'

@ApiTags('evidence')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, TenantGuard, RolesGuard)
@Controller({ path: 'evidence', version: '1' })
export class EvidenceController {
  constructor(private readonly service: EvidenceService) {}

  @Get()
  @RequirePermissions('evidence:read')
  list(@CurrentUser('tenantId') tenantId: string, @Query() query: ListEvidenceDto) {
    return this.service.findAll(tenantId, query)
  }

  @Get(':id')
  @RequirePermissions('evidence:read')
  findOne(@CurrentUser('tenantId') tenantId: string, @Param('id') id: string) {
    return this.service.findOne(tenantId, id)
  }

  @Post('upload')
  @RequirePermissions('evidence:create')
  @HttpCode(HttpStatus.CREATED)
  upload(
    @CurrentUser('tenantId') tenantId: string,
    @CurrentUser('id') userId: string,
    @Body() dto: UploadEvidenceDto,
  ) {
    return this.service.upload(tenantId, userId, dto)
  }

  @Get(':id/custody')
  @RequirePermissions('evidence:read')
  custody(@CurrentUser('tenantId') tenantId: string, @Param('id') id: string) {
    return this.service.getChainOfCustody(tenantId, id)
  }

  @Post(':id/ocr')
  @RequirePermissions('evidence:update')
  ocr(@CurrentUser('tenantId') tenantId: string, @Param('id') id: string) {
    return this.service.processOcr(tenantId, id)
  }
}
