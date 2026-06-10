import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../../database/prisma/prisma.service'
import { UploadEvidenceDto } from './dto/upload-evidence.dto'
import { ListEvidenceDto } from './dto/list-evidence.dto'
import { createHash } from 'crypto'

@Injectable()
export class EvidenceService {
  constructor(private readonly prisma: PrismaService) {}

  async upload(tenantId: string, userId: string, dto: UploadEvidenceDto) {
    const hash = createHash('sha256').update(`${Date.now()}-${dto.filename ?? 'file'}`).digest('hex')

    const evidence = await this.prisma.evidence.create({
      data: {
        tenantId,
        investigationId: dto.investigationId,
        type: dto.type,
        status: 'PROCESSING',
        filename: dto.filename ?? 'upload',
        originalFilename: dto.filename ?? 'upload',
        mimeType: dto.mimeType ?? 'application/octet-stream',
        sizeBytes: BigInt(0),
        hash,
        storageKey: `evidence/${tenantId}/${hash}`,
        description: dto.description,
        tags: dto.tags ?? [],
        uploadedById: userId,
        chainOfCustody: [{
          action: 'UPLOADED',
          userId,
          timestamp: new Date().toISOString(),
        }] as object,
      },
    })

    return evidence
  }

  async findAll(tenantId: string, query: ListEvidenceDto) {
    const { page = 1, limit = 20, investigationId, type, status, search } = query

    const where = {
      tenantId,
      ...(investigationId && { investigationId }),
      ...(type && { type }),
      ...(status && { status }),
      ...(search && {
        OR: [
          { filename: { contains: search, mode: 'insensitive' as const } },
          { description: { contains: search, mode: 'insensitive' as const } },
        ],
      }),
    }

    const [data, total] = await Promise.all([
      this.prisma.evidence.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { uploadedBy: { select: { id: true, name: true } } },
      }),
      this.prisma.evidence.count({ where }),
    ])

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) }
  }

  async findOne(tenantId: string, id: string) {
    const evidence = await this.prisma.evidence.findFirst({
      where: { id, tenantId },
      include: {
        uploadedBy: { select: { id: true, name: true, email: true } },
        annotations: true,
      },
    })
    if (!evidence) throw new NotFoundException('Evidence not found')
    return evidence
  }

  async getChainOfCustody(tenantId: string, id: string) {
    const evidence = await this.findOne(tenantId, id)
    return { evidenceId: id, hash: evidence.hash, chainOfCustody: evidence.chainOfCustody }
  }

  async processOcr(tenantId: string, id: string) {
    const evidence = await this.findOne(tenantId, id)
    // In real implementation, queue OCR job
    return this.prisma.evidence.update({
      where: { id },
      data: { status: 'PROCESSING' },
    })
  }
}
