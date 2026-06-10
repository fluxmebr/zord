import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../database/prisma/prisma.service'
import { Neo4jService } from '../../database/neo4j/neo4j.service'

@Injectable()
export class GraphService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly neo4j: Neo4jService,
  ) {}

  async getInvestigationGraph(tenantId: string, investigationId: string) {
    // Fetch entities and relationships from Postgres
    const links = await this.prisma.investigationEntity.findMany({
      where: { investigationId },
      include: { entity: true },
    })

    const entityIds = links.map((l) => l.entityId)

    const relationships = await this.prisma.entityRelationship.findMany({
      where: {
        tenantId,
        OR: [
          { sourceEntityId: { in: entityIds } },
          { targetEntityId: { in: entityIds } },
        ],
      },
    })

    const nodes = links.map((l) => ({
      id: l.entity.id,
      type: l.entity.type,
      label: l.entity.label,
      trustScore: l.entity.trustScore,
      attributes: l.entity.attributes,
    }))

    const edges = relationships.map((r) => ({
      id: r.id,
      source: r.sourceEntityId,
      target: r.targetEntityId,
      type: r.type,
      description: r.description,
      trustScore: r.trustScore,
    }))

    return { nodes, edges, investigationId }
  }

  async searchPath(tenantId: string, sourceId: string, targetId: string) {
    const result = await this.neo4j.run(
      `MATCH path = shortestPath(
        (a:Entity {id: $sourceId, tenantId: $tenantId})-[*..6]-(b:Entity {id: $targetId, tenantId: $tenantId})
      )
      RETURN path`,
      { tenantId, sourceId, targetId },
    ).catch(() => ({ records: [] }))

    return { path: result.records }
  }
}
