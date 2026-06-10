import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../../database/prisma/prisma.service'

@Injectable()
export class TenantsService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(id: string) {
    const tenant = await this.prisma.tenant.findFirst({ where: { id } })
    if (!tenant) throw new NotFoundException('Tenant not found')
    return tenant
  }

  async findBySlug(slug: string) {
    return this.prisma.tenant.findUnique({ where: { slug } })
  }

  async getStats(id: string) {
    const tenant = await this.findOne(id)
    const [users, investigations, entities, evidence] = await Promise.all([
      this.prisma.user.count({ where: { tenantId: id } }),
      this.prisma.investigation.count({ where: { tenantId: id } }),
      this.prisma.entity.count({ where: { tenantId: id } }),
      this.prisma.evidence.count({ where: { tenantId: id } }),
    ])
    return { tenant, stats: { users, investigations, entities, evidence } }
  }
}
