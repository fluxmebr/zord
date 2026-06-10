import type { ID, Timestamp, Language } from './common'

export type UserRole = 'SUPER_ADMIN' | 'TENANT_ADMIN' | 'ANALYST' | 'OPERATOR' | 'VIEWER'

export type Permission =
  | 'investigation:create'
  | 'investigation:read'
  | 'investigation:update'
  | 'investigation:delete'
  | 'investigation:archive'
  | 'entity:create'
  | 'entity:read'
  | 'entity:update'
  | 'entity:delete'
  | 'evidence:upload'
  | 'evidence:read'
  | 'evidence:delete'
  | 'hypothesis:create'
  | 'hypothesis:read'
  | 'hypothesis:update'
  | 'report:generate'
  | 'report:export'
  | 'operations:manage'
  | 'audit:read'
  | 'tenant:manage'
  | 'user:manage'

export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  SUPER_ADMIN: [
    'investigation:create', 'investigation:read', 'investigation:update',
    'investigation:delete', 'investigation:archive', 'entity:create', 'entity:read',
    'entity:update', 'entity:delete', 'evidence:upload', 'evidence:read', 'evidence:delete',
    'hypothesis:create', 'hypothesis:read', 'hypothesis:update', 'report:generate',
    'report:export', 'operations:manage', 'audit:read', 'tenant:manage', 'user:manage',
  ],
  TENANT_ADMIN: [
    'investigation:create', 'investigation:read', 'investigation:update',
    'investigation:delete', 'investigation:archive', 'entity:create', 'entity:read',
    'entity:update', 'entity:delete', 'evidence:upload', 'evidence:read', 'evidence:delete',
    'hypothesis:create', 'hypothesis:read', 'hypothesis:update', 'report:generate',
    'report:export', 'operations:manage', 'audit:read', 'user:manage',
  ],
  ANALYST: [
    'investigation:create', 'investigation:read', 'investigation:update',
    'entity:create', 'entity:read', 'entity:update', 'evidence:upload', 'evidence:read',
    'hypothesis:create', 'hypothesis:read', 'hypothesis:update', 'report:generate',
  ],
  OPERATOR: [
    'investigation:read', 'entity:read', 'evidence:read',
    'hypothesis:read', 'operations:manage',
  ],
  VIEWER: [
    'investigation:read', 'entity:read', 'evidence:read', 'hypothesis:read',
  ],
}

export interface User {
  id: ID
  tenantId: ID
  email: string
  name: string
  avatarUrl?: string
  role: UserRole
  permissions: Permission[]
  language: Language
  timezone: string
  mfaEnabled: boolean
  mfaMethod?: 'TOTP' | 'SMS' | 'EMAIL'
  lastLoginAt?: Timestamp
  status: 'ACTIVE' | 'SUSPENDED' | 'PENDING_VERIFICATION'
  createdAt: Timestamp
  updatedAt: Timestamp
}

export interface Session {
  id: ID
  userId: ID
  tenantId: ID
  deviceId: string
  ipAddress: string
  userAgent: string
  expiresAt: Timestamp
  createdAt: Timestamp
}
