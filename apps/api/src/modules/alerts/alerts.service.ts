import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../../database/prisma/prisma.service'
import { AlertSeverity } from '@prisma/client'

export class CreateAlertDto {
  severity!: AlertSeverity
  title!: string
  description?: string
  sourceType!: string
  sourceId?: string
  investigationId?: string
  assignedTo?: string
}

@Injectable()
export class AlertsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(tenantId: string, dto: CreateAlertDto) {
    return this.prisma.alert.create({
      data: {
        tenantId,
        severity: dto.severity,
        title: dto.title,
        description: dto.description,
        sourceType: dto.sourceType,
        sourceId: dto.sourceId,
        investigationId: dto.investigationId,
        assignedTo: dto.assignedTo,
        metadata: {} as object,
      },
    })
  }

  async findAll(tenantId: string, status?: string, severity?: string) {
    const [data, total] = await Promise.all([
      this.prisma.alert.findMany({
        where: {
          tenantId,
          ...(status && { status: status as any }),
          ...(severity && { severity: severity as any }),
        },
        orderBy: [{ severity: 'asc' }, { createdAt: 'desc' }],
      }),
      this.prisma.alert.count({ where: { tenantId } }),
    ])
    return { data, total }
  }

  async acknowledge(tenantId: string, id: string, userId: string) {
    const alert = await this.prisma.alert.findFirst({ where: { id, tenantId } })
    if (!alert) throw new NotFoundException('Alert not found')
    return this.prisma.alert.update({
      where: { id },
      data: { status: 'ACKNOWLEDGED', assignedTo: userId },
    })
  }

  async resolve(tenantId: string, id: string) {
    const alert = await this.prisma.alert.findFirst({ where: { id, tenantId } })
    if (!alert) throw new NotFoundException('Alert not found')
    return this.prisma.alert.update({
      where: { id },
      data: { status: 'RESOLVED', resolvedAt: new Date() },
    })
  }
}
