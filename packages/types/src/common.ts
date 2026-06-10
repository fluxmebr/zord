export type ID = string

export type Timestamp = string // ISO 8601

export type Language = 'he' | 'en' | 'ru' | 'pt'

export type Direction = 'ltr' | 'rtl'

export const LANGUAGE_DIRECTION: Record<Language, Direction> = {
  he: 'rtl',
  en: 'ltr',
  ru: 'ltr',
  pt: 'ltr',
}

export type ClassificationLevel = 'TOP_SECRET' | 'SECRET' | 'CONFIDENTIAL' | 'INTERNAL' | 'OPEN'

export type Priority = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW'

export type Status = 'ACTIVE' | 'ARCHIVED' | 'CLOSED' | 'PENDING' | 'SUSPENDED'

export interface PaginationParams {
  page: number
  limit: number
}

export interface PaginatedResult<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface AuditInfo {
  createdAt: Timestamp
  updatedAt: Timestamp
  createdBy: ID
  updatedBy: ID
}

export interface TrustScore {
  score: number // 0-100
  sourceReliability: number
  corroboration: number
  recency: number
  quality: number
  consistency: number
  calculatedAt: Timestamp
}

export interface ApiResponse<T> {
  data: T
  meta?: Record<string, unknown>
}

export interface ApiError {
  code: string
  message: string
  details?: Record<string, unknown>
}
