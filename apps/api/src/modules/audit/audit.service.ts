import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../database/prisma/prisma.service'

@Injectable()
export class AuditService {
  constructor(private readonly prisma: PrismaService) {}

  async log(
    tenantId: string,
    userId: string | null,
    action: string,
    resource: string,
    resourceId?: string,
    changes?: Record<string, unknown>,
    metadata?: Record<string, unknown>,
  ) {
    return this.prisma.auditLog.create({
      data: {
        tenantId,
        userId,
        action,
        resource,
        resourceId,
        changes: changes ?? undefined,
        metadata: metadata ?? {},
      },
    })
  }

  async findAll(tenantId: string, page = 1, limit = 50) {
    const [data, total] = await Promise.all([
      this.prisma.auditLog.findMany({
        where: { tenantId },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { user: { select: { id: true, name: true, email: true } } },
      }),
      this.prisma.auditLog.count({ where: { tenantId } }),
    ])
    return { data, total, page, limit, totalPages: Math.ceil(total / limit) }
  }
}
