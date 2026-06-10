import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common'
import { PrismaService } from '../../database/prisma/prisma.service'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { CreateInvestigationDto } from './dto/create-investigation.dto'
import { UpdateInvestigationDto } from './dto/update-investigation.dto'
import { ListInvestigationsDto } from './dto/list-investigations.dto'

@Injectable()
export class InvestigationsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly events: EventEmitter2,
  ) {}

  async create(tenantId: string, userId: string, dto: CreateInvestigationDto) {
    const count = await this.prisma.investigation.count({ where: { tenantId } })
    const year = new Date().getFullYear()
    const code = `INV-${year}-${String(count + 1).padStart(3, '0')}`

    const investigation = await this.prisma.investigation.create({
      data: {
        tenantId,
        code,
        name: dto.name,
        description: dto.description ?? '',
        classification: dto.classification,
        priority: dto.priority,
        status: 'PLANNING',
        objectives: dto.objectives ?? [],
        tags: dto.tags ?? [],
        leadAnalystId: dto.leadAnalystId ?? userId,
        createdById: userId,
        startDate: dto.startDate ? new Date(dto.startDate) : undefined,
        targetDate: dto.targetDate ? new Date(dto.targetDate) : undefined,
      },
    })

    this.events.emit('investigation.created', { tenantId, investigation, userId })

    return investigation
  }

  async findAll(tenantId: string, query: ListInvestigationsDto) {
    const { page = 1, limit = 20, status, priority, classification, search } = query

    const where = {
      tenantId,
      ...(status && { status }),
      ...(priority && { priority }),
      ...(classification && { classification }),
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' as const } },
          { code: { contains: search, mode: 'insensitive' as const } },
          { description: { contains: search, mode: 'insensitive' as const } },
        ],
      }),
    }

    const [data, total] = await Promise.all([
      this.prisma.investigation.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: [{ priority: 'asc' }, { updatedAt: 'desc' }],
        include: {
          leadAnalyst: { select: { id: true, name: true, avatarUrl: true } },
          _count: { select: { entities: true, evidence: true, hypotheses: true, alerts: true } },
        },
      }),
      this.prisma.investigation.count({ where }),
    ])

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) }
  }

  async findOne(tenantId: string, id: string) {
    const investigation = await this.prisma.investigation.findFirst({
      where: { id, tenantId },
      include: {
        leadAnalyst: { select: { id: true, name: true, avatarUrl: true, email: true } },
        _count: { select: { entities: true, evidence: true, hypotheses: true, operations: true, alerts: true } },
      },
    })

    if (!investigation) throw new NotFoundException('Investigation not found')

    return investigation
  }

  async update(tenantId: string, id: string, userId: string, dto: UpdateInvestigationDto) {
    await this.findOne(tenantId, id)

    const investigation = await this.prisma.investigation.update({
      where: { id },
      data: {
        ...dto,
        startDate: dto.startDate ? new Date(dto.startDate) : undefined,
        targetDate: dto.targetDate ? new Date(dto.targetDate) : undefined,
        concludedAt: dto.status === 'CONCLUDED' ? new Date() : undefined,
      },
    })

    this.events.emit('investigation.updated', { tenantId, investigation, userId })

    return investigation
  }

  async archive(tenantId: string, id: string, userId: string) {
    await this.findOne(tenantId, id)

    const investigation = await this.prisma.investigation.update({
      where: { id },
      data: { status: 'ARCHIVED' },
    })

    this.events.emit('investigation.archived', { tenantId, investigation, userId })

    return investigation
  }

  async getStats(tenantId: string) {
    const [total, byStatus, byPriority, recent] = await Promise.all([
      this.prisma.investigation.count({ where: { tenantId } }),
      this.prisma.investigation.groupBy({
        by: ['status'],
        where: { tenantId },
        _count: true,
      }),
      this.prisma.investigation.groupBy({
        by: ['priority'],
        where: { tenantId, status: { in: ['ACTIVE', 'PLANNING'] } },
        _count: true,
      }),
      this.prisma.investigation.findMany({
        where: { tenantId },
        orderBy: { updatedAt: 'desc' },
        take: 5,
        select: { id: true, code: true, name: true, status: true, priority: true, updatedAt: true },
      }),
    ])

    return { total, byStatus, byPriority, recent }
  }
}
