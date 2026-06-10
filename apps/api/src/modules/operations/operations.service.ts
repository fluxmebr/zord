import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../../database/prisma/prisma.service'
import { CreateOperationDto } from './dto/create-operation.dto'
import { UpdateOperationDto } from './dto/update-operation.dto'

@Injectable()
export class OperationsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(tenantId: string, dto: CreateOperationDto) {
    return this.prisma.operation.create({
      data: {
        tenantId,
        title: dto.title,
        description: dto.description,
        priority: dto.priority,
        investigationId: dto.investigationId,
        assigneeIds: dto.assigneeIds ?? [],
        dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
        notes: dto.notes,
        checklists: [] as object,
      },
    })
  }

  async findAll(tenantId: string, investigationId?: string, status?: string) {
    return this.prisma.operation.findMany({
      where: {
        tenantId,
        ...(investigationId && { investigationId }),
        ...(status && { status: status as any }),
      },
      orderBy: [{ priority: 'asc' }, { createdAt: 'desc' }],
    })
  }

  async findOne(tenantId: string, id: string) {
    const op = await this.prisma.operation.findFirst({ where: { id, tenantId } })
    if (!op) throw new NotFoundException('Operation not found')
    return op
  }

  async update(tenantId: string, id: string, dto: UpdateOperationDto) {
    await this.findOne(tenantId, id)
    return this.prisma.operation.update({
      where: { id },
      data: {
        ...dto,
        dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
      },
    })
  }

  async complete(tenantId: string, id: string) {
    await this.findOne(tenantId, id)
    return this.prisma.operation.update({
      where: { id },
      data: { status: 'COMPLETED', completedAt: new Date() },
    })
  }
}
