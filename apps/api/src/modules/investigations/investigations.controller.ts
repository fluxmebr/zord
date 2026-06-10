import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Body,
  Param,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common'
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger'
import { InvestigationsService } from './investigations.service'
import { CreateInvestigationDto } from './dto/create-investigation.dto'
import { UpdateInvestigationDto } from './dto/update-investigation.dto'
import { ListInvestigationsDto } from './dto/list-investigations.dto'
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard'
import { RolesGuard } from '../../common/guards/roles.guard'
import { TenantGuard } from '../../common/guards/tenant.guard'
import { CurrentUser } from '../../common/decorators/current-user.decorator'
import { RequirePermissions } from '../../common/decorators/roles.decorator'

@ApiTags('investigations')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, TenantGuard, RolesGuard)
@Controller({ path: 'investigations', version: '1' })
export class InvestigationsController {
  constructor(private readonly service: InvestigationsService) {}

  @Get()
  @RequirePermissions('investigation:read')
  list(
    @CurrentUser('tenantId') tenantId: string,
    @Query() query: ListInvestigationsDto,
  ) {
    return this.service.findAll(tenantId, query)
  }

  @Get('stats')
  @RequirePermissions('investigation:read')
  stats(@CurrentUser('tenantId') tenantId: string) {
    return this.service.getStats(tenantId)
  }

  @Get(':id')
  @RequirePermissions('investigation:read')
  findOne(
    @CurrentUser('tenantId') tenantId: string,
    @Param('id') id: string,
  ) {
    return this.service.findOne(tenantId, id)
  }

  @Post()
  @RequirePermissions('investigation:create')
  @HttpCode(HttpStatus.CREATED)
  create(
    @CurrentUser('tenantId') tenantId: string,
    @CurrentUser('id') userId: string,
    @Body() dto: CreateInvestigationDto,
  ) {
    return this.service.create(tenantId, userId, dto)
  }

  @Put(':id')
  @RequirePermissions('investigation:update')
  update(
    @CurrentUser('tenantId') tenantId: string,
    @CurrentUser('id') userId: string,
    @Param('id') id: string,
    @Body() dto: UpdateInvestigationDto,
  ) {
    return this.service.update(tenantId, id, userId, dto)
  }

  @Patch(':id/archive')
  @RequirePermissions('investigation:archive')
  archive(
    @CurrentUser('tenantId') tenantId: string,
    @CurrentUser('id') userId: string,
    @Param('id') id: string,
  ) {
    return this.service.archive(tenantId, id, userId)
  }
}
