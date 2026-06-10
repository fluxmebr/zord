import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import neo4j, { Driver, Session, QueryResult } from 'neo4j-driver'

@Injectable()
export class Neo4jService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(Neo4jService.name)
  private driver: Driver

  constructor(private readonly config: ConfigService) {}

  async onModuleInit() {
    const uri = this.config.get<string>('NEO4J_URI', 'bolt://localhost:7687')
    const username = this.config.get<string>('NEO4J_USERNAME', 'neo4j')
    const password = this.config.get<string>('NEO4J_PASSWORD', 'password')

    this.driver = neo4j.driver(uri, neo4j.auth.basic(username, password))

    try {
      await this.driver.verifyConnectivity()
      this.logger.log('Neo4j connected')
    } catch (error) {
      this.logger.error('Neo4j connection failed', error)
    }
  }

  async onModuleDestroy() {
    await this.driver.close()
    this.logger.log('Neo4j disconnected')
  }

  getSession(database = 'neo4j'): Session {
    return this.driver.session({ database })
  }

  async run(cypher: string, params: Record<string, unknown> = {}): Promise<QueryResult> {
    const session = this.getSession()
    try {
      return await session.run(cypher, params)
    } finally {
      await session.close()
    }
  }

  async runWrite(cypher: string, params: Record<string, unknown> = {}): Promise<QueryResult> {
    const session = this.getSession()
    try {
      return await session.writeTransaction((tx) => tx.run(cypher, params))
    } finally {
      await session.close()
    }
  }

  async createEntityNode(tenantId: string, entityId: string, type: string, label: string) {
    return this.runWrite(
      `MERGE (e:Entity {id: $entityId, tenantId: $tenantId})
       SET e.type = $type, e.label = $label, e.updatedAt = datetime()
       RETURN e`,
      { entityId, tenantId, type, label },
    )
  }

  async createRelationship(
    tenantId: string,
    sourceId: string,
    targetId: string,
    relationshipType: string,
    properties: Record<string, unknown> = {},
  ) {
    return this.runWrite(
      `MATCH (a:Entity {id: $sourceId, tenantId: $tenantId})
       MATCH (b:Entity {id: $targetId, tenantId: $tenantId})
       MERGE (a)-[r:${relationshipType} {tenantId: $tenantId}]->(b)
       SET r += $properties, r.updatedAt = datetime()
       RETURN r`,
      { sourceId, targetId, tenantId, properties },
    )
  }

  async getEntityGraph(tenantId: string, investigationId: string, depth = 2) {
    return this.run(
      `MATCH path = (e:Entity {tenantId: $tenantId})-[*0..${depth}]-(related)
       WHERE e.investigationId = $investigationId
       RETURN path LIMIT 500`,
      { tenantId, investigationId },
    )
  }
}
