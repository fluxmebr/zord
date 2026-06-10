import { Module } from '@nestjs/common'
import { InvestigationsController } from './investigations.controller'
import { InvestigationsService } from './investigations.service'
import { AuditModule } from '../audit/audit.module'

@Module({
  imports: [AuditModule],
  controllers: [InvestigationsController],
  providers: [InvestigationsService],
  exports: [InvestigationsService],
})
export class InvestigationsModule {}
