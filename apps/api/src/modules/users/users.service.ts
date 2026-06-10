import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../../database/prisma/prisma.service'

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(tenantId: string) {
    return this.prisma.user.findMany({
      where: { tenantId },
      select: { id: true, name: true, email: true, role: true, status: true, createdAt: true },
    })
  }

  async findOne(tenantId: string, id: string) {
    const user = await this.prisma.user.findFirst({
      where: { id, tenantId },
      select: { id: true, name: true, email: true, role: true, status: true, language: true, timezone: true, createdAt: true },
    })
    if (!user) throw new NotFoundException('User not found')
    return user
  }

  async findByEmail(tenantId: string, email: string) {
    return this.prisma.user.findFirst({ where: { tenantId, email } })
  }
}
