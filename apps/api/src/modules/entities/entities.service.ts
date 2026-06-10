import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../../database/prisma/prisma.service'
import { Neo4jService } from '../../database/neo4j/neo4j.service'
import { CreateEntityDto } from './dto/create-entity.dto'
import { UpdateEntityDto } from './dto/update-entity.dto'
import { ListEntitiesDto } from './dto/list-entities.dto'
import { CreateRelationshipDto } from './dto/create-relationship.dto'

@Injectable()
export class EntitiesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly neo4j: Neo4jService,
  ) {}

  async create(tenantId: string, userId: string, dto: CreateEntityDto) {
    const entity = await this.prisma.entity.create({
      data: {
        tenantId,
        type: dto.type,
        label: dto.label,
        aliases: dto.aliases ?? [],
        attributes: (dto.attributes ?? {}) as object,
        sources: (dto.sources ?? []) as object,
      },
    })

    await this.neo4j.createEntityNode(tenantId, entity.id, entity.type, entity.label).catch(() => null)

    return entity
  }

  async findAll(tenantId: string, query: ListEntitiesDto) {
    const { page = 1, limit = 20, type, search, investigationId } = query

    let entityIds: string[] | undefined
    if (investigationId) {
      const links = await this.prisma.investigationEntity.findMany({
        where: { investigationId },
        select: { entityId: true },
      })
      entityIds = links.map((l) => l.entityId)
    }

    const where = {
      tenantId,
      ...(type && { type }),
      ...(entityIds && { id: { in: entityIds } }),
      ...(search && {
        OR: [
          { label: { contains: search, mode: 'insensitive' as const } },
          { aliases: { has: search } },
        ],
      }),
    }

    const [data, total] = await Promise.all([
      this.prisma.entity.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { updatedAt: 'desc' },
        include: {
          _count: { select: { sourceRelations: true, targetRelations: true, hypothesisLinks: true } },
        },
      }),
      this.prisma.entity.count({ where }),
    ])

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) }
  }

  async findOne(tenantId: string, id: string) {
    const entity = await this.prisma.entity.findFirst({
      where: { id, tenantId },
      include: {
        sourceRelations: { include: { targetEntity: true } },
        targetRelations: { include: { sourceEntity: true } },
        _count: { select: { hypothesisLinks: true } },
      },
    })
    if (!entity) throw new NotFoundException('Entity not found')
    return entity
  }

  async update(tenantId: string, id: string, dto: UpdateEntityDto) {
    await this.findOne(tenantId, id)
    const entity = await this.prisma.entity.update({
      where: { id },
      data: {
        ...dto,
        attributes: dto.attributes as object | undefined,
        sources: dto.sources as object | undefined,
      },
    })
    await this.neo4j.createEntityNode(tenantId, entity.id, entity.type, entity.label).catch(() => null)
    return entity
  }

  async addRelationship(tenantId: string, sourceId: string, dto: CreateRelationshipDto) {
    await this.findOne(tenantId, sourceId)
    await this.findOne(tenantId, dto.targetEntityId)

    const rel = await this.prisma.entityRelationship.create({
      data: {
        tenantId,
        sourceEntityId: sourceId,
        targetEntityId: dto.targetEntityId,
        type: dto.type,
        description: dto.description,
        sources: [] as object,
      },
    })

    await this.neo4j
      .createRelationship(tenantId, sourceId, dto.targetEntityId, dto.type, dto.properties ?? {})
      .catch(() => null)

    return rel
  }

  async getByInvestigation(tenantId: string, investigationId: string) {
    return this.findAll(tenantId, { investigationId, page: 1, limit: 100 })
  }
}
