import { Injectable, NotFoundException, ConflictException } from '@nestjs/common'
import { PrismaService } from '../../database/prisma/prisma.service'
import { CreateTenantDto, UpdateTenantStatusDto } from './dto/create-tenant.dto'
import * as bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'

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

  async listAll() {
    const tenants = await this.prisma.tenant.findMany({
      orderBy: { createdAt: 'desc' },
    })
    const withStats = await Promise.all(
      tenants.map(async (t) => {
        const [users, investigations] = await Promise.all([
          this.prisma.user.count({ where: { tenantId: t.id } }),
          this.prisma.investigation.count({ where: { tenantId: t.id } }),
        ])
        return { ...t, users, investigations }
      }),
    )
    return withStats
  }

  async createWithAdmin(dto: CreateTenantDto) {
    const existing = await this.prisma.tenant.findUnique({ where: { slug: dto.slug } })
    if (existing) throw new ConflictException('Slug already in use')

    const passwordHash = await bcrypt.hash(dto.adminUser.password, 12)

    return this.prisma.$transaction(async (tx) => {
      const tenant = await tx.tenant.create({
        data: {
          id: uuidv4(),
          name: dto.name,
          slug: dto.slug,
          domain: dto.domain,
          plan: dto.plan,
          status: dto.plan === 'TRIAL' ? 'TRIAL' : 'ACTIVE',
          settings: dto.settings as any,
        },
      })

      const adminUser = await tx.user.create({
        data: {
          id: uuidv4(),
          tenantId: tenant.id,
          name: dto.adminUser.name,
          email: dto.adminUser.email,
          passwordHash,
          role: 'TENANT_ADMIN',
          language: (dto.settings.defaultLanguage as any) ?? 'en',
          timezone: 'UTC',
          status: 'ACTIVE',
        },
      })

      return { tenant, adminUser: { id: adminUser.id, email: adminUser.email, name: adminUser.name } }
    })
  }

  async updateStatus(id: string, dto: UpdateTenantStatusDto) {
    await this.findOne(id)
    return this.prisma.tenant.update({
      where: { id },
      data: { status: dto.status as any },
    })
  }
}
