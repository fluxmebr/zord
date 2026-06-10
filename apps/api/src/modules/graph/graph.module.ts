import { Module } from '@nestjs/common'
import { GraphController } from './graph.controller'
import { GraphService } from './graph.service'
import { Neo4jModule } from '../../database/neo4j/neo4j.module'

@Module({
  imports: [Neo4jModule],
  controllers: [GraphController],
  providers: [GraphService],
  exports: [GraphService],
})
export class GraphModule {}
