import type { ID, Timestamp, Status } from './common'

export interface Tenant {
  id: ID
  name: string
  slug: string
  domain?: string
  logoUrl?: string
  status: Status
  plan: TenantPlan
  settings: TenantSettings
  createdAt: Timestamp
  updatedAt: Timestamp
}

export type TenantPlan = 'TRIAL' | 'STARTER' | 'PROFESSIONAL' | 'ENTERPRISE'

export interface TenantSettings {
  defaultLanguage: string
  allowedDomains: string[]
  maxUsers: number
  maxInvestigations: number
  maxStorageGb: number
  mfaRequired: boolean
  ssoEnabled: boolean
  watermarkEnabled: boolean
  retentionDays: number
}
