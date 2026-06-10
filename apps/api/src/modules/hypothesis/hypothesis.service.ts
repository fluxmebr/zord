import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../../database/prisma/prisma.service'
import { TrustEngineService } from '../audit/trust-engine.service'
import { CreateHypothesisDto } from './dto/create-hypothesis.dto'
import { UpdateHypothesisDto } from './dto/update-hypothesis.dto'
import { EvidenceRole } from '@prisma/client'

@Injectable()
export class HypothesisService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly trustEngine: TrustEngineService,
  ) {}

  async create(tenantId: string, dto: CreateHypothesisDto) {
    return this.prisma.hypothesis.create({
      data: {
        tenantId,
        investigationId: dto.investigationId,
        title: dto.title,
        description: dto.description,
        objective: dto.objective,
        gaps: [] as object,
      },
    })
  }

  async findAll(tenantId: string, investigationId?: string) {
    return this.prisma.hypothesis.findMany({
      where: { tenantId, ...(investigationId && { investigationId }) },
      orderBy: { updatedAt: 'desc' },
      include: {
        _count: { select: { supportingEvidence: true, contradictingEvidence: true, entities: true } },
      },
    })
  }

  async findOne(tenantId: string, id: string) {
    const hyp = await this.prisma.hypothesis.findFirst({
      where: { id, tenantId },
      include: {
        supportingEvidence: { include: { evidence: true } },
        contradictingEvidence: { include: { evidence: true } },
        entities: { include: { entity: true } },
      },
    })
    if (!hyp) throw new NotFoundException('Hypothesis not found')
    return hyp
  }

  async update(tenantId: string, id: string, dto: UpdateHypothesisDto) {
    await this.findOne(tenantId, id)
    return this.prisma.hypothesis.update({ where: { id }, data: dto })
  }

  async addEvidence(tenantId: string, id: string, evidenceId: string, role: EvidenceRole) {
    await this.findOne(tenantId, id)
    const result = await this.prisma.hypothesisEvidence.create({
      data: { hypothesisId: id, evidenceId, role },
    })
    await this.trustEngine.updateHypothesisTrust(id, tenantId).catch(() => null)
    return result
  }

  async removeEvidence(tenantId: string, id: string, evidenceId: string, role: EvidenceRole) {
    return this.prisma.hypothesisEvidence.delete({
      where: { hypothesisId_evidenceId_role: { hypothesisId: id, evidenceId, role } },
    })
  }
}
