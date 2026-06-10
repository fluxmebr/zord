import type { ID, Timestamp, AuditInfo, TrustScore } from './common'

export type HypothesisStatus = 'DRAFT' | 'ACTIVE' | 'VALIDATED' | 'REFUTED' | 'SUSPENDED'

export interface Hypothesis {
  id: ID
  tenantId: ID
  investigationId: ID
  title: string
  description: string
  objective: string
  status: HypothesisStatus
  entityIds: ID[]
  supportingEvidenceIds: ID[]
  contradictingEvidenceIds: ID[]
  gaps: HypothesisGap[]
  aiAnalysis?: HypothesisAIAnalysis
  trustScore?: TrustScore
  audit: AuditInfo
}

export interface HypothesisGap {
  id: ID
  description: string
  type: 'TEMPORAL' | 'DOCUMENTARY' | 'ENTITY' | 'CORROBORATION'
  severity: 'HIGH' | 'MEDIUM' | 'LOW'
  detectedAt: Timestamp
  detectedBy: 'AI' | 'ANALYST'
  resolvedAt?: Timestamp
}

export interface HypothesisAIAnalysis {
  contradictions: string[]
  weaknesses: string[]
  missingEvidence: string[]
  relevantChanges: string[]
  confidenceLevel: number
  analyzedAt: Timestamp
}
