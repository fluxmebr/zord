import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../database/prisma/prisma.service'

export interface TrustScoreParams {
  sourceReliability: number  // 0-100
  corroboration: number      // 0-100
  recency: number            // 0-100
  quality: number            // 0-100
  consistency: number        // 0-100
}

export interface TrustScore {
  score: number
  breakdown: TrustScoreParams
  level: 'HIGH' | 'MEDIUM' | 'LOW' | 'VERY_LOW'
}

@Injectable()
export class TrustEngineService {
  constructor(private readonly prisma: PrismaService) {}

  calculateTrustScore(params: TrustScoreParams): TrustScore {
    const score = Math.round(
      params.sourceReliability * 0.30 +
      params.corroboration    * 0.25 +
      params.recency          * 0.20 +
      params.quality          * 0.15 +
      params.consistency      * 0.10,
    )
    const level =
      score >= 80 ? 'HIGH' :
      score >= 60 ? 'MEDIUM' :
      score >= 40 ? 'LOW' : 'VERY_LOW'
    return { score, breakdown: params, level }
  }

  async updateEntityTrust(entityId: string, tenantId: string) {
    const entity = await this.prisma.entity.findFirst({ where: { id: entityId, tenantId } })
    if (!entity) return null

    const rels = await this.prisma.entityRelationship.count({
      where: { OR: [{ sourceEntityId: entityId }, { targetEntityId: entityId }] },
    })

    const params: TrustScoreParams = {
      sourceReliability: 70,
      corroboration: Math.min(100, rels * 10),
      recency: 80,
      quality: 75,
      consistency: 70,
    }
    const { score } = this.calculateTrustScore(params)

    return this.prisma.entity.update({ where: { id: entityId }, data: { trustScore: score } })
  }

  async updateHypothesisTrust(hypothesisId: string, tenantId: string) {
    const hyp = await this.prisma.hypothesis.findFirst({
      where: { id: hypothesisId, tenantId },
      include: {
        supportingEvidence: true,
        contradictingEvidence: true,
      },
    })
    if (!hyp) return null

    const supporting = hyp.supportingEvidence.length
    const contradicting = hyp.contradictingEvidence.length
    const total = supporting + contradicting

    const corroboration = total > 0 ? Math.round((supporting / total) * 100) : 50
    const params: TrustScoreParams = {
      sourceReliability: 70,
      corroboration,
      recency: 75,
      quality: 70,
      consistency: 65,
    }
    const { score } = this.calculateTrustScore(params)

    return this.prisma.hypothesis.update({ where: { id: hypothesisId }, data: { trustScore: score } })
  }
}
