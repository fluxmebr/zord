import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../../database/prisma/prisma.service'
import { GenerateReportDto } from './dto/generate-report.dto'

@Injectable()
export class ReportsService {
  constructor(private readonly prisma: PrismaService) {}

  async generate(tenantId: string, userId: string, dto: GenerateReportDto) {
    const report = await this.prisma.report.create({
      data: {
        tenantId,
        type: dto.type,
        title: dto.title,
        investigationId: dto.investigationId,
        generatedById: userId,
        status: 'GENERATING',
        content: { notes: dto.notes ?? '' } as object,
      },
    })

    // In real impl, queue generation job; mark as ready immediately for stub
    setTimeout(async () => {
      await this.prisma.report.update({
        where: { id: report.id },
        data: { status: 'READY' },
      }).catch(() => null)
    }, 2000)

    return report
  }

  async findAll(tenantId: string, investigationId?: string) {
    return this.prisma.report.findMany({
      where: { tenantId, ...(investigationId && { investigationId }) },
      orderBy: { createdAt: 'desc' },
    })
  }

  async findOne(tenantId: string, id: string) {
    const report = await this.prisma.report.findFirst({ where: { id, tenantId } })
    if (!report) throw new NotFoundException('Report not found')
    return report
  }
}
