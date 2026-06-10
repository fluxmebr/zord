import { Module } from '@nestjs/common'
import { EntitiesController } from './entities.controller'
import { EntitiesService } from './entities.service'
import { Neo4jModule } from '../../database/neo4j/neo4j.module'

@Module({
  imports: [Neo4jModule],
  controllers: [EntitiesController],
  providers: [EntitiesService],
  exports: [EntitiesService],
})
export class EntitiesModule {}
