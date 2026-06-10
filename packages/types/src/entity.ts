import type { ID, Timestamp, AuditInfo, TrustScore } from './common'

export type EntityType =
  | 'PERSON'
  | 'COMPANY'
  | 'EMAIL'
  | 'PHONE'
  | 'ADDRESS'
  | 'DOMAIN'
  | 'VEHICLE'
  | 'PROCESS'
  | 'DOCUMENT'
  | 'WEBSITE'
  | 'SOCIAL_PROFILE'
  | 'ORGANIZATION'

export type RelationshipType =
  | 'PARTNER'
  | 'ADMINISTRATOR'
  | 'CONTACT'
  | 'OWNER'
  | 'CITATION'
  | 'TRANSFER'
  | 'PARTICIPANT'
  | 'LINKED'
  | 'EMPLOYEE'
  | 'SUBSIDIARY'
  | 'ASSOCIATED'

export interface Entity {
  id: ID
  tenantId: ID
  globalId: string // unique cross-investigation identifier
  type: EntityType
  label: string
  aliases: string[]
  attributes: Record<string, unknown>
  sources: EntitySource[]
  trustScore?: TrustScore
  audit: AuditInfo
}

export interface EntitySource {
  id: ID
  type: 'WEB' | 'DOCUMENT' | 'ANALYST' | 'API' | 'IMPORT'
  url?: string
  description: string
  hash?: string
  collectedAt: Timestamp
  collectedBy: ID
}

export interface EntityRelationship {
  id: ID
  tenantId: ID
  sourceEntityId: ID
  targetEntityId: ID
  type: RelationshipType
  description?: string
  startDate?: Timestamp
  endDate?: Timestamp
  sources: EntitySource[]
  trustScore?: TrustScore
  audit: AuditInfo
}

export interface GraphNode {
  id: ID
  type: EntityType
  label: string
  x?: number
  y?: number
  trustScore?: number
}

export interface GraphEdge {
  id: ID
  source: ID
  target: ID
  type: RelationshipType
  label: string
}
