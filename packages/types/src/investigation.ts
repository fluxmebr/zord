import type { ID, Timestamp, ClassificationLevel, Priority, Status, AuditInfo, TrustScore } from './common'

export type InvestigationStatus = 'PLANNING' | 'ACTIVE' | 'ON_HOLD' | 'CONCLUDED' | 'ARCHIVED' | 'CANCELLED'

export interface Investigation {
  id: ID
  tenantId: ID
  code: string // e.g. INV-2024-001
  name: string
  description: string
  classification: ClassificationLevel
  priority: Priority
  status: InvestigationStatus
  objectives: string[]
  tags: string[]
  leadAnalystId: ID
  teamIds: ID[]
  startDate?: Timestamp
  targetDate?: Timestamp
  concludedAt?: Timestamp
  trustScore?: TrustScore
  audit: AuditInfo
}

export interface InvestigationSummary {
  id: ID
  code: string
  name: string
  classification: ClassificationLevel
  priority: Priority
  status: InvestigationStatus
  entityCount: number
  evidenceCount: number
  hypothesisCount: number
  openAlerts: number
  trustScore?: number
  leadAnalyst: { id: ID; name: string; avatarUrl?: string }
  updatedAt: Timestamp
}
