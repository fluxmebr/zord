import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { ROLES_KEY } from '../decorators/roles.decorator'
import { ROLE_PERMISSIONS, type Permission, type UserRole } from '@zord/types'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<Permission[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (!requiredPermissions || requiredPermissions.length === 0) return true

    const request = context.switchToHttp().getRequest()
    const user = request.user as { role: UserRole }

    if (!user) throw new ForbiddenException('Unauthorized')

    const userPermissions = ROLE_PERMISSIONS[user.role] ?? []
    const hasPermission = requiredPermissions.every((p) => userPermissions.includes(p))

    if (!hasPermission) {
      throw new ForbiddenException('Insufficient permissions')
    }

    return true
  }
}
