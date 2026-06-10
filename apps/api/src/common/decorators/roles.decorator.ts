import { SetMetadata } from '@nestjs/common'
import type { Permission, UserRole } from '@zord/types'

export const ROLES_KEY = 'permissions'
export const ROLE_KEY = 'roles'

export const RequirePermissions = (...permissions: Permission[]) =>
  SetMetadata(ROLES_KEY, permissions)

export const Roles = (...roles: UserRole[]) =>
  SetMetadata(ROLE_KEY, roles)
