import { Module } from '@nestjs/common'
import { IntelligenceController } from './intelligence.controller'
import { IntelligenceService } from './intelligence.service'
import { GapDetectionService } from './gap-detection.service'

@Module({
  controllers: [IntelligenceController],
  providers: [IntelligenceService, GapDetectionService],
  exports: [IntelligenceService, GapDetectionService],
})
export class IntelligenceModule {}
