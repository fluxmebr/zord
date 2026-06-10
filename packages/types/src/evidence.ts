import type { ID, Timestamp, AuditInfo } from './common'

export type EvidenceType = 'PDF' | 'IMAGE' | 'VIDEO' | 'AUDIO' | 'SPREADSHEET' | 'DOCUMENT' | 'TEXT' | 'OTHER'

export type EvidenceStatus = 'UPLOADING' | 'PROCESSING' | 'READY' | 'FAILED' | 'ARCHIVED'

export interface Evidence {
  id: ID
  tenantId: ID
  investigationId: ID
  type: EvidenceType
  status: EvidenceStatus
  filename: string
  originalFilename: string
  mimeType: string
  sizeBytes: number
  hash: string // SHA-256
  storageKey: string // MinIO key
  thumbnailKey?: string
  description?: string
  tags: string[]
  ocrText?: string
  transcription?: string
  metadata: Record<string, unknown>
  chainOfCustody: CustodyEvent[]
  audit: AuditInfo
}

export interface CustodyEvent {
  id: ID
  action: 'UPLOADED' | 'ACCESSED' | 'DOWNLOADED' | 'ANNOTATED' | 'TRANSFERRED' | 'ARCHIVED'
  userId: ID
  userName: string
  timestamp: Timestamp
  ipAddress: string
  notes?: string
}

export interface EvidenceAnnotation {
  id: ID
  evidenceId: ID
  userId: ID
  content: string
  position?: { x: number; y: number; page?: number }
  createdAt: Timestamp
}
