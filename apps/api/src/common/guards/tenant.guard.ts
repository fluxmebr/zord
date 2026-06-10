import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common'

@Injectable()
export class TenantGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest()
    const user = request.user as { tenantId: string }
    const paramTenantId = request.params?.tenantId

    if (paramTenantId && paramTenantId !== user.tenantId) {
      throw new ForbiddenException('Cross-tenant access denied')
    }

    // Inject tenantId into query/body for filtering
    request.tenantId = user.tenantId

    return true
  }
}
