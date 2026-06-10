import { Injectable, OnModuleInit, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Client } from '@opensearch-project/opensearch'

const INDICES = {
  ENTITIES: 'zord_entities',
  INVESTIGATIONS: 'zord_investigations',
  EVIDENCE: 'zord_evidence',
  TIMELINE: 'zord_timeline',
}

@Injectable()
export class OpenSearchService implements OnModuleInit {
  private readonly logger = new Logger(OpenSearchService.name)
  private client: Client

  constructor(private readonly config: ConfigService) {}

  async onModuleInit() {
    const node = this.config.get<string>('OPENSEARCH_URL', 'http://localhost:9200')

    this.client = new Client({
      node,
      auth: {
        username: this.config.get<string>('OPENSEARCH_USERNAME', 'admin'),
        password: this.config.get<string>('OPENSEARCH_PASSWORD', 'admin'),
      },
      ssl: { rejectUnauthorized: false },
    })

    try {
      await this.client.ping()
      this.logger.log('OpenSearch connected')
      await this.ensureIndices()
    } catch (error) {
      this.logger.warn('OpenSearch connection failed — search may be unavailable')
    }
  }

  private async ensureIndices() {
    for (const index of Object.values(INDICES)) {
      const exists = await this.client.indices.exists({ index })
      if (!exists.body) {
        await this.client.indices.create({
          index,
          body: {
            settings: {
              analysis: {
                analyzer: {
                  default: { type: 'standard' },
                },
              },
            },
          },
        })
        this.logger.log(`Created index: ${index}`)
      }
    }
  }

  async indexEntity(tenantId: string, entity: Record<string, unknown>) {
    return this.client.index({
      index: INDICES.ENTITIES,
      id: `${tenantId}_${entity['id']}`,
      body: { ...entity, tenantId, indexedAt: new Date().toISOString() },
    })
  }

  async searchEntities(tenantId: string, query: string, from = 0, size = 20) {
    const result = await this.client.search({
      index: INDICES.ENTITIES,
      body: {
        from,
        size,
        query: {
          bool: {
            must: [
              { term: { tenantId } },
              {
                multi_match: {
                  query,
                  fields: ['label^3', 'aliases^2', 'attributes.*'],
                  fuzziness: 'AUTO',
                },
              },
            ],
          },
        },
        highlight: {
          fields: { label: {}, aliases: {} },
        },
      },
    })

    return {
      total: (result.body.hits.total as { value: number }).value,
      hits: result.body.hits.hits.map((h: Record<string, unknown>) => ({
        ...(h['_source'] as Record<string, unknown>),
        highlight: h['highlight'],
      })),
    }
  }

  async globalSearch(tenantId: string, query: string) {
    const indices = Object.values(INDICES).join(',')
    const result = await this.client.search({
      index: indices,
      body: {
        size: 10,
        query: {
          bool: {
            must: [
              { term: { tenantId } },
              {
                multi_match: {
                  query,
                  fields: ['label^3', 'name^2', 'description', 'content'],
                  fuzziness: 'AUTO',
                },
              },
            ],
          },
        },
      },
    })

    return result.body.hits.hits.map((h: Record<string, unknown>) => ({
      index: h['_index'],
      ...(h['_source'] as Record<string, unknown>),
    }))
  }
}
