import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { ROLES_KEY, ROLE_KEY } from '../decorators/roles.decorator'
import { ROLE_PERMISSIONS, type Permission, type UserRole } from '@zord/types'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const handlers = [context.getHandler(), context.getClass()]
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLE_KEY, handlers)
    const requiredPermissions = this.reflector.getAllAndOverride<Permission[]>(ROLES_KEY, handlers)

    const hasNoRestrictions =
      (!requiredRoles || requiredRoles.length === 0) &&
      (!requiredPermissions || requiredPermissions.length === 0)
    if (hasNoRestrictions) return true

    const request = context.switchToHttp().getRequest<{ user?: { role: UserRole } }>()
    const user = request.user

    if (!user) throw new ForbiddenException('Unauthorized')

    if (requiredRoles?.length) {
      const hasRole = requiredRoles.includes(user.role)
      if (!hasRole) throw new ForbiddenException('Insufficient role')
    }

    if (requiredPermissions?.length) {
      const userPermissions = ROLE_PERMISSIONS[user.role] ?? []
      const hasPermission = requiredPermissions.every((p: Permission) => userPermissions.includes(p))
      if (!hasPermission) throw new ForbiddenException('Insufficient permissions')
    }

    return true
  }
}
