import { Global, Module } from '@nestjs/common'
import { AuditService } from './audit.service'
import { TrustEngineService } from './trust-engine.service'

@Global()
@Module({
  providers: [AuditService, TrustEngineService],
  exports: [AuditService, TrustEngineService],
})
export class AuditModule {}
