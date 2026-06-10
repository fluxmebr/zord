import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import Anthropic from '@anthropic-ai/sdk'
import { PrismaService } from '../../database/prisma/prisma.service'

export interface AIResponse {
  content: string
  confidence: number
  sources: string[]
  entities: string[]
  model: string
}

@Injectable()
export class IntelligenceService {
  private readonly logger = new Logger(IntelligenceService.name)
  private client: Anthropic

  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {
    this.client = new Anthropic({
      apiKey: this.config.get<string>('ANTHROPIC_API_KEY'),
    })
  }

  async analyzeInvestigation(tenantId: string, investigationId: string, question?: string): Promise<AIResponse> {
    const investigation = await this.prisma.investigation.findFirst({
      where: { id: investigationId, tenantId },
      include: {
        _count: { select: { entities: true, evidence: true, hypotheses: true } },
      },
    })

    if (!investigation) {
      return this.buildErrorResponse('Investigation not found')
    }

    const prompt = question
      ? `You are an intelligence analyst. Analyze this investigation and answer the question.\n\nInvestigation: ${investigation.name}\nDescription: ${investigation.description}\nStatus: ${investigation.status}\nEntities: ${investigation._count.entities}, Evidence: ${investigation._count.evidence}, Hypotheses: ${investigation._count.hypotheses}\n\nQuestion: ${question}`
      : `You are an intelligence analyst. Provide a comprehensive analysis of this investigation.\n\nInvestigation: ${investigation.name}\nDescription: ${investigation.description}\nStatus: ${investigation.status}\nEntities: ${investigation._count.entities}, Evidence: ${investigation._count.evidence}, Hypotheses: ${investigation._count.hypotheses}`

    return this.callClaude(prompt, 'analysis')
  }

  async generateSummary(tenantId: string, investigationId: string): Promise<AIResponse> {
    const investigation = await this.prisma.investigation.findFirst({
      where: { id: investigationId, tenantId },
      include: {
        hypotheses: { take: 5, orderBy: { updatedAt: 'desc' } },
        _count: { select: { entities: true, evidence: true } },
      },
    })

    if (!investigation) return this.buildErrorResponse('Investigation not found')

    const hypothesesSummary = investigation.hypotheses
      .map((h) => `- ${h.title} (${h.status})`)
      .join('\n')

    const prompt = `Generate an executive summary for this intelligence investigation:\n\nTitle: ${investigation.name}\nClassification: ${investigation.classification}\nStatus: ${investigation.status}\nEntities tracked: ${investigation._count.entities}\nEvidence items: ${investigation._count.evidence}\n\nKey Hypotheses:\n${hypothesesSummary || 'None yet'}\n\nProvide: executive summary, key findings, recommended next steps.`

    return this.callClaude(prompt, 'summary')
  }

  async detectGaps(tenantId: string, investigationId: string): Promise<AIResponse> {
    const investigation = await this.prisma.investigation.findFirst({
      where: { id: investigationId, tenantId },
      include: {
        hypotheses: true,
        _count: { select: { entities: true, evidence: true } },
      },
    })

    if (!investigation) return this.buildErrorResponse('Investigation not found')

    const prompt = `Analyze this investigation and identify intelligence gaps:\n\nInvestigation: ${investigation.name}\nObjectives: ${investigation.objectives.join(', ')}\nEntities: ${investigation._count.entities}\nEvidence: ${investigation._count.evidence}\nHypotheses: ${investigation.hypotheses.length}\n\nIdentify: missing evidence, unverified claims, temporal gaps, isolated entities, contradictions.`

    return this.callClaude(prompt, 'gap-detection')
  }

  async detectContradictions(tenantId: string, investigationId: string): Promise<AIResponse> {
    const hypotheses = await this.prisma.hypothesis.findMany({
      where: { tenantId, investigationId },
      include: {
        supportingEvidence: true,
        contradictingEvidence: true,
      },
    })

    const prompt = `Analyze these ${hypotheses.length} hypotheses for logical contradictions:\n\n${hypotheses.map((h) => `"${h.title}" — ${h.supportingEvidence.length} supporting, ${h.contradictingEvidence.length} contradicting evidence`).join('\n')}\n\nIdentify contradictions and inconsistencies between hypotheses.`

    return this.callClaude(prompt, 'contradiction-detection')
  }

  private async callClaude(prompt: string, analysisType: string): Promise<AIResponse> {
    try {
      const message = await this.client.messages.create({
        model: 'claude-opus-4-5',
        max_tokens: 1024,
        messages: [{ role: 'user', content: prompt }],
      })

      const content = message.content
        .filter((b) => b.type === 'text')
        .map((b) => (b as { type: 'text'; text: string }).text)
        .join('\n')

      return {
        content,
        confidence: 75,
        sources: ['ZORD Knowledge Base', 'Investigation Data'],
        entities: [],
        model: message.model,
      }
    } catch (error) {
      this.logger.error(`Claude API error for ${analysisType}:`, error)
      return this.buildErrorResponse('AI analysis temporarily unavailable')
    }
  }

  private buildErrorResponse(message: string): AIResponse {
    return {
      content: message,
      confidence: 0,
      sources: [],
      entities: [],
      model: 'unavailable',
    }
  }
}
