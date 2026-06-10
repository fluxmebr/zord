import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../database/prisma/prisma.service'
import { CreateTimelineEventDto } from './dto/create-timeline-event.dto'

@Injectable()
export class TimelineService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(tenantId: string, page = 1, limit = 50) {
    const [data, total] = await Promise.all([
      this.prisma.timelineEvent.findMany({
        where: { tenantId },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { occurredAt: 'desc' },
      }),
      this.prisma.timelineEvent.count({ where: { tenantId } }),
    ])
    return { data, total, page, limit, totalPages: Math.ceil(total / limit) }
  }

  async getByInvestigation(tenantId: string, investigationId: string) {
    return this.prisma.timelineEvent.findMany({
      where: { tenantId, investigationId },
      orderBy: { occurredAt: 'asc' },
    })
  }

  async createEvent(tenantId: string, dto: CreateTimelineEventDto) {
    return this.prisma.timelineEvent.create({
      data: {
        tenantId,
        eventType: dto.eventType,
        title: dto.title,
        description: dto.description,
        occurredAt: new Date(dto.occurredAt),
        sourceType: dto.sourceType,
        sourceId: dto.sourceId,
        investigationId: dto.investigationId,
        entityIds: dto.entityIds ?? [],
        metadata: (dto.metadata ?? {}) as object,
      },
    })
  }
}
