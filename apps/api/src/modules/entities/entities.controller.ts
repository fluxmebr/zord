import { Controller, Get, Post, Put, Body, Param, Query, UseGuards, HttpCode, HttpStatus } from '@nestjs/common'
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger'
import { EntitiesService } from './entities.service'
import { CreateEntityDto } from './dto/create-entity.dto'
import { UpdateEntityDto } from './dto/update-entity.dto'
import { ListEntitiesDto } from './dto/list-entities.dto'
import { CreateRelationshipDto } from './dto/create-relationship.dto'
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard'
import { RolesGuard } from '../../common/guards/roles.guard'
import { TenantGuard } from '../../common/guards/tenant.guard'
import { CurrentUser } from '../../common/decorators/current-user.decorator'
import { RequirePermissions } from '../../common/decorators/roles.decorator'

@ApiTags('entities')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, TenantGuard, RolesGuard)
@Controller({ path: 'entities', version: '1' })
export class EntitiesController {
  constructor(private readonly service: EntitiesService) {}

  @Get()
  @RequirePermissions('entity:read')
  list(@CurrentUser('tenantId') tenantId: string, @Query() query: ListEntitiesDto) {
    return this.service.findAll(tenantId, query)
  }

  @Get(':id')
  @RequirePermissions('entity:read')
  findOne(@CurrentUser('tenantId') tenantId: string, @Param('id') id: string) {
    return this.service.findOne(tenantId, id)
  }

  @Post()
  @RequirePermissions('entity:create')
  @HttpCode(HttpStatus.CREATED)
  create(
    @CurrentUser('tenantId') tenantId: string,
    @CurrentUser('id') userId: string,
    @Body() dto: CreateEntityDto,
  ) {
    return this.service.create(tenantId, userId, dto)
  }

  @Put(':id')
  @RequirePermissions('entity:update')
  update(
    @CurrentUser('tenantId') tenantId: string,
    @Param('id') id: string,
    @Body() dto: UpdateEntityDto,
  ) {
    return this.service.update(tenantId, id, dto)
  }

  @Post(':id/relationships')
  @RequirePermissions('entity:update')
  @HttpCode(HttpStatus.CREATED)
  addRelationship(
    @CurrentUser('tenantId') tenantId: string,
    @Param('id') id: string,
    @Body() dto: CreateRelationshipDto,
  ) {
    return this.service.addRelationship(tenantId, id, dto)
  }
}
