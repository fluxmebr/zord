import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding ZORD database...')

  // Create default tenant
  const tenant = await prisma.tenant.upsert({
    where: { slug: 'default' },
    update: {},
    create: {
      name: 'ZORD Default Organization',
      slug: 'default',
      domain: 'zord.pro',
      status: 'ACTIVE',
      plan: 'ENTERPRISE',
      settings: {
        defaultLanguage: 'en',
        allowedDomains: ['zord.pro'],
        maxUsers: 100,
        maxInvestigations: 1000,
        maxStorageGb: 500,
        mfaRequired: false,
        ssoEnabled: false,
        watermarkEnabled: true,
        retentionDays: 2555,
      },
    },
  })

  console.log(`Tenant: ${tenant.name}`)

  // Create admin user
  const passwordHash = await bcrypt.hash('zord2026!', 12)

  const admin = await prisma.user.upsert({
    where: { tenantId_email: { tenantId: tenant.id, email: 'admin@zord.pro' } },
    update: {},
    create: {
      tenantId: tenant.id,
      email: 'admin@zord.pro',
      name: 'ZORD Administrator',
      passwordHash,
      role: 'TENANT_ADMIN',
      status: 'ACTIVE',
      language: 'en',
      timezone: 'UTC',
    },
  })

  console.log(`Admin user: ${admin.email}`)

  // Create analyst user
  const analyst = await prisma.user.upsert({
    where: { tenantId_email: { tenantId: tenant.id, email: 'analyst@zord.pro' } },
    update: {},
    create: {
      tenantId: tenant.id,
      email: 'analyst@zord.pro',
      name: 'D. Cohen',
      passwordHash,
      role: 'ANALYST',
      status: 'ACTIVE',
      language: 'he',
      timezone: 'Asia/Jerusalem',
    },
  })

  console.log(`Analyst user: ${analyst.email}`)

  // Create demo investigation
  const investigation = await prisma.investigation.create({
    data: {
      tenantId: tenant.id,
      code: 'INV-2024-001',
      name: 'Operation Nightfall — Demo',
      description: 'Demo investigation for ZORD platform testing.',
      classification: 'CONFIDENTIAL',
      priority: 'HIGH',
      status: 'ACTIVE',
      objectives: [
        'Map the financial network',
        'Identify key entities',
        'Establish timeline of events',
      ],
      tags: ['demo', 'financial', 'network-analysis'],
      leadAnalystId: analyst.id,
      createdById: admin.id,
      startDate: new Date('2024-01-15'),
    },
  })

  console.log(`Investigation: ${investigation.code}`)

  // Create sample entities
  const entities = await Promise.all([
    prisma.entity.create({
      data: {
        tenantId: tenant.id,
        type: 'PERSON',
        label: 'John Doe',
        aliases: ['J. Doe', 'JD'],
        attributes: { nationality: 'US', dateOfBirth: '1975-03-22' },
        sources: [{ type: 'ANALYST', description: 'Initial assessment', collectedAt: new Date().toISOString() }],
        trustScore: 75,
      },
    }),
    prisma.entity.create({
      data: {
        tenantId: tenant.id,
        type: 'COMPANY',
        label: 'Titan Holdings Ltd',
        aliases: ['Titan Holdings', 'THL'],
        attributes: { registrationNumber: 'GB12345678', jurisdiction: 'UK', founded: '2015' },
        sources: [{ type: 'WEB', description: 'Companies House', url: 'https://companieshouse.gov.uk', collectedAt: new Date().toISOString() }],
        trustScore: 90,
      },
    }),
    prisma.entity.create({
      data: {
        tenantId: tenant.id,
        type: 'DOMAIN',
        label: 'titan-holdings.com',
        aliases: [],
        attributes: { registrar: 'GoDaddy', registered: '2015-04-10', expires: '2025-04-10' },
        sources: [{ type: 'API', description: 'WHOIS lookup', collectedAt: new Date().toISOString() }],
        trustScore: 95,
      },
    }),
  ])

  console.log(`Created ${entities.length} entities`)

  // Link entities to investigation
  await Promise.all(
    entities.map((e) =>
      prisma.investigationEntity.create({
        data: { investigationId: investigation.id, entityId: e.id, addedBy: admin.id },
      }),
    ),
  )

  // Create sample timeline events
  await prisma.timelineEvent.createMany({
    data: [
      {
        tenantId: tenant.id,
        investigationId: investigation.id,
        eventType: 'ENTITY_CREATED',
        title: 'Entity John Doe identified',
        occurredAt: new Date('2024-01-16'),
        sourceType: 'ANALYST',
        sourceId: analyst.id,
        entityIds: [entities[0]!.id],
      },
      {
        tenantId: tenant.id,
        investigationId: investigation.id,
        eventType: 'ENTITY_LINKED',
        title: 'John Doe linked to Titan Holdings',
        occurredAt: new Date('2024-01-18'),
        sourceType: 'ANALYST',
        sourceId: analyst.id,
        entityIds: [entities[0]!.id, entities[1]!.id],
      },
    ],
  })

  console.log('ZORD seed complete.')
  console.log('')
  console.log('Default credentials:')
  console.log('  admin@zord.pro / zord2026!')
  console.log('  analyst@zord.pro / zord2026!')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
