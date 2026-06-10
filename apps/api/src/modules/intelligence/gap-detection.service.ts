import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../database/prisma/prisma.service'

export interface HypothesisGap {
  hypothesisId: string
  title: string
  gapType: 'MISSING_EVIDENCE' | 'LOW_CORROBORATION' | 'TEMPORAL_GAP' | 'UNVERIFIED_ENTITY'
  description: string
  severity: 'HIGH' | 'MEDIUM' | 'LOW'
}

export interface Contradiction {
  hypothesisId1: string
  hypothesisId2: string
  description: string
  severity: 'HIGH' | 'MEDIUM' | 'LOW'
}

export interface GapReport {
  investigationId: string
  temporalGaps: HypothesisGap[]
  isolatedEntities: Array<{ id: string; label: string; type: string }>
  weakHypotheses: Array<{ id: string; title: string; trustScore: number | null }>
  contradictions: Contradiction[]
  generatedAt: Date
}

@Injectable()
export class GapDetectionService {
  constructor(private readonly prisma: PrismaService) {}

  async detectTemporalGaps(investigationId: string, tenantId: string): Promise<HypothesisGap[]> {
    const events = await this.prisma.timelineEvent.findMany({
      where: { tenantId, investigationId },
      orderBy: { occurredAt: 'asc' },
    })

    const gaps: HypothesisGap[] = []

    for (let i = 1; i < events.length; i++) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const prev = events[i - 1]!
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const curr = events[i]!
      const diffDays = Math.abs(
        (curr.occurredAt.getTime() - prev.occurredAt.getTime()) / (1000 * 60 * 60 * 24),
      )

      if (diffDays > 30) {
        gaps.push({
          hypothesisId: investigationId,
          title: `Temporal gap between "${prev.title}" and "${curr.title}"`,
          gapType: 'TEMPORAL_GAP',
          description: `No events recorded for ${Math.round(diffDays)} days between events`,
          severity: diffDays > 90 ? 'HIGH' : 'MEDIUM',
        })
      }
    }

    return gaps
  }

  async detectIsolatedEntities(investigationId: string, tenantId: string) {
    const links = await this.prisma.investigationEntity.findMany({
      where: { investigationId },
      include: { entity: true },
    })

    const isolated = []
    for (const link of links) {
      const relCount = await this.prisma.entityRelationship.count({
        where: {
          tenantId,
          OR: [
            { sourceEntityId: link.entityId },
            { targetEntityId: link.entityId },
          ],
        },
      })
      if (relCount === 0) {
        isolated.push({
          id: link.entity.id,
          label: link.entity.label,
          type: link.entity.type,
        })
      }
    }

    return isolated
  }

  async detectWeakHypotheses(investigationId: string, tenantId: string) {
    const hypotheses = await this.prisma.hypothesis.findMany({
      where: { tenantId, investigationId },
      include: {
        _count: { select: { supportingEvidence: true, contradictingEvidence: true } },
      },
    })

    return hypotheses
      .filter((h) => (h.trustScore ?? 100) < 50 || h._count.supportingEvidence === 0)
      .map((h) => ({ id: h.id, title: h.title, trustScore: h.trustScore }))
  }

  async detectContradictions(investigationId: string, tenantId: string): Promise<Contradiction[]> {
    const hypotheses = await this.prisma.hypothesis.findMany({
      where: { tenantId, investigationId },
      include: { supportingEvidence: true },
    })

    const contradictions: Contradiction[] = []

    for (let i = 0; i < hypotheses.length; i++) {
      for (let j = i + 1; j < hypotheses.length; j++) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const hi = hypotheses[i]!
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const hj = hypotheses[j]!
        const h1Ids = new Set(hi.supportingEvidence.map((e) => e.evidenceId))
        const h2ContradictingIds = hj.supportingEvidence.map((e) => e.evidenceId)
        const conflict = h2ContradictingIds.some((id) => h1Ids.has(id))

        if (conflict) {
          contradictions.push({
            hypothesisId1: hi.id,
            hypothesisId2: hj.id,
            description: `"${hi.title}" and "${hj.title}" share conflicting evidence`,
            severity: 'MEDIUM',
          })
        }
      }
    }

    return contradictions
  }

  async runFullAnalysis(investigationId: string, tenantId: string): Promise<GapReport> {
    const [temporalGaps, isolatedEntities, weakHypotheses, contradictions] = await Promise.all([
      this.detectTemporalGaps(investigationId, tenantId),
      this.detectIsolatedEntities(investigationId, tenantId),
      this.detectWeakHypotheses(investigationId, tenantId),
      this.detectContradictions(investigationId, tenantId),
    ])

    return {
      investigationId,
      temporalGaps,
      isolatedEntities,
      weakHypotheses,
      contradictions,
      generatedAt: new Date(),
    }
  }
}
