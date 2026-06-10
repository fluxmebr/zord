import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ThrottlerModule } from '@nestjs/throttler'
import { EventEmitterModule } from '@nestjs/event-emitter'
import { ScheduleModule } from '@nestjs/schedule'
import { LoggerModule } from 'nestjs-pino'

import { DatabaseModule } from './database/prisma/database.module'
import { Neo4jModule } from './database/neo4j/neo4j.module'
import { OpenSearchModule } from './database/opensearch/opensearch.module'

import { AuthModule } from './modules/auth/auth.module'
import { UsersModule } from './modules/users/users.module'
import { TenantsModule } from './modules/tenants/tenants.module'
import { InvestigationsModule } from './modules/investigations/investigations.module'
import { EntitiesModule } from './modules/entities/entities.module'
import { EvidenceModule } from './modules/evidence/evidence.module'
import { HypothesisModule } from './modules/hypothesis/hypothesis.module'
import { OperationsModule } from './modules/operations/operations.module'
import { ReportsModule } from './modules/reports/reports.module'
import { GraphModule } from './modules/graph/graph.module'
import { TimelineModule } from './modules/timeline/timeline.module'
import { IntelligenceModule } from './modules/intelligence/intelligence.module'
import { AlertsModule } from './modules/alerts/alerts.module'
import { AuditModule } from './modules/audit/audit.module'

@Module({
  imports: [
    // Config
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),

    // Rate limiting
    ThrottlerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        throttlers: [
          { name: 'short', ttl: 1000, limit: 10 },
          { name: 'medium', ttl: 10000, limit: 50 },
          { name: 'long', ttl: 60000, limit: 200 },
        ],
      }),
    }),

    // Events
    EventEmitterModule.forRoot({ wildcard: true, delimiter: '.' }),

    // Scheduling
    ScheduleModule.forRoot(),

    // Logging
    LoggerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        pinoHttp: {
          level: config.get('NODE_ENV') === 'production' ? 'info' : 'debug',
          transport: config.get('NODE_ENV') !== 'production'
            ? { target: 'pino-pretty', options: { colorize: true } }
            : undefined,
          redact: ['req.headers.authorization', 'req.headers.cookie'],
        },
      }),
    }),

    // Database
    DatabaseModule,
    Neo4jModule,
    OpenSearchModule,

    // Feature modules
    AuthModule,
    UsersModule,
    TenantsModule,
    InvestigationsModule,
    EntitiesModule,
    EvidenceModule,
    HypothesisModule,
    OperationsModule,
    ReportsModule,
    GraphModule,
    TimelineModule,
    IntelligenceModule,
    AlertsModule,
    AuditModule,
  ],
})
export class AppModule {}
