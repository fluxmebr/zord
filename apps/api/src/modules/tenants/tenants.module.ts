import { Module } from '@nestjs/common'
import { TenantsController, AdminTenantsController } from './tenants.controller'
import { TenantsService } from './tenants.service'

@Module({
  controllers: [TenantsController, AdminTenantsController],
  providers: [TenantsService],
  exports: [TenantsService],
})
export class TenantsModule {}
