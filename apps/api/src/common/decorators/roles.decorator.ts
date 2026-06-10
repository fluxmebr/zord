import { SetMetadata } from '@nestjs/common'
import type { Permission } from '@zord/types'

export const ROLES_KEY = 'permissions'
export const RequirePermissions = (...permissions: Permission[]) =>
  SetMetadata(ROLES_KEY, permissions)
