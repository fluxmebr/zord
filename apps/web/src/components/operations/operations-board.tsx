'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Plus, User, Calendar, Flag, MoreHorizontal } from 'lucide-react'

const COLUMNS = [
  { id: 'PENDING', label: 'Pending', color: 'text-zinc-400', dot: 'bg-zinc-500' },
  { id: 'IN_PROGRESS', label: 'In Progress', color: 'text-blue-400', dot: 'bg-blue-500' },
  { id: 'BLOCKED', label: 'Blocked', color: 'text-red-400', dot: 'bg-red-500' },
  { id: 'COMPLETED', label: 'Completed', color: 'text-green-400', dot: 'bg-green-500' },
]

const MOCK_OPERATIONS = [
  {
    id: '1', status: 'IN_PROGRESS', priority: 'CRITICAL',
    title: 'Cross-reference entity network with OFAC SDN list',
    description: 'Check all 47 identified entities against current sanctions list.',
    assignee: 'D. Cohen', dueDate: '2024-06-12', investigationCode: 'INV-2024-047',
  },
  {
    id: '2', status: 'PENDING', priority: 'HIGH',
    title: 'Request banking records — Meridian Corp',
    description: 'Formal request through legal team for Q1-Q3 2023 statements.',
    assignee: 'M. Ivanova', dueDate: '2024-06-15', investigationCode: 'INV-2024-039',
  },
  {
    id: '3', status: 'BLOCKED', priority: 'HIGH',
    title: 'Obtain CCTV footage — Bosphorus Quay facility',
    description: 'Requires court order. Legal team working on request.',
    assignee: 'R. Silva', dueDate: '2024-06-20', investigationCode: 'INV-2024-047',
  },
  {
    id: '4', status: 'COMPLETED', priority: 'MEDIUM',
    title: 'Corporate registry extract — Cayman Islands',
    description: 'Obtained official extract for Titan Holdings Ltd.',
    assignee: 'A. Ben-David', dueDate: '2024-06-05', investigationCode: 'INV-2024-051',
  },
  {
    id: '5', status: 'IN_PROGRESS', priority: 'MEDIUM',
    title: 'Domain infrastructure analysis',
    description: 'Passive DNS and hosting analysis for 14 identified domains.',
    assignee: 'D. Cohen', dueDate: '2024-06-18', investigationCode: 'INV-2024-055',
  },
  {
    id: '6', status: 'PENDING', priority: 'LOW',
    title: 'Translate Russian business documents',
    description: '12 pages of corporate documents from Sakhalin registry.',
    assignee: 'M. Ivanova', dueDate: '2024-06-25', investigationCode: 'INV-2024-039',
  },
]

const PRIORITY_CONFIG: Record<string, { label: string; color: string }> = {
  CRITICAL: { label: 'Critical', color: 'text-red-400 bg-red-950 border-red-900' },
  HIGH: { label: 'High', color: 'text-orange-400 bg-orange-950 border-orange-900' },
  MEDIUM: { label: 'Medium', color: 'text-yellow-400 bg-yellow-950 border-yellow-900' },
  LOW: { label: 'Low', color: 'text-green-400 bg-green-950 border-green-900' },
}

function OperationCard({ op }: { op: typeof MOCK_OPERATIONS[0] }) {
  const priority = PRIORITY_CONFIG[op.priority]
  const isOverdue = new Date(op.dueDate) < new Date() && op.status !== 'COMPLETED'

  return (
    <div className="panel p-3 cursor-pointer transition-colors hover:bg-zord-muted/40">
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className={cn('rounded border px-1.5 py-0.5 text-[9px] font-medium uppercase', priority.color)}>
          {priority.label}
        </span>
        <button className="rounded p-0.5 hover:bg-zord-muted opacity-0 group-hover:opacity-100 transition-opacity">
          <MoreHorizontal className="h-3.5 w-3.5 text-zord-text-muted" />
        </button>
      </div>

      <p className="text-xs font-medium text-zord-text mb-1 leading-snug">{op.title}</p>
      <p className="text-[10px] text-zord-text-muted mb-2 line-clamp-2">{op.description}</p>

      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1.5 text-[10px] text-zord-text-dim">
          <User className="h-3 w-3" />
          {op.assignee}
        </div>
        <div className={cn('flex items-center gap-1.5 text-[10px]', isOverdue ? 'text-red-400' : 'text-zord-text-dim')}>
          <Calendar className="h-3 w-3" />
          {isOverdue && '⚠ '}
          {new Date(op.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </div>
        <span className="font-mono text-[10px] text-zord-text-dim">{op.investigationCode}</span>
      </div>
    </div>
  )
}

export function OperationsBoard() {
  const [mobileStatus, setMobileStatus] = useState<string>('ALL')
  const grouped = Object.fromEntries(
    COLUMNS.map((col) => [col.id, MOCK_OPERATIONS.filter((op) => op.status === col.id)])
  )
  const mobileFiltered = mobileStatus === 'ALL'
    ? MOCK_OPERATIONS
    : MOCK_OPERATIONS.filter((op) => op.status === mobileStatus)

  return (
    <>
      {/* Mobile: status tabs + card list */}
      <div className="flex flex-col gap-3 md:hidden">
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          <button
            onClick={() => setMobileStatus('ALL')}
            className={cn('shrink-0 rounded px-2.5 py-1.5 text-xs transition-colors', mobileStatus === 'ALL' ? 'bg-zord-accent text-white' : 'border border-zord-border bg-zord-panel text-zord-text-muted')}
          >
            All ({MOCK_OPERATIONS.length})
          </button>
          {COLUMNS.map((col) => (
            <button
              key={col.id}
              onClick={() => setMobileStatus(col.id)}
              className={cn('shrink-0 rounded px-2.5 py-1.5 text-xs transition-colors', mobileStatus === col.id ? 'bg-zord-accent text-white' : 'border border-zord-border bg-zord-panel text-zord-text-muted')}
            >
              <span className={mobileStatus === col.id ? 'text-white' : col.color}>{col.label}</span>
              <span className="ms-1 opacity-60">({(grouped[col.id] ?? []).length})</span>
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          {mobileFiltered.map((op) => {
            const priority = PRIORITY_CONFIG[op.priority]!
            const col = COLUMNS.find((c) => c.id === op.status)!
            const isOverdue = new Date(op.dueDate) < new Date() && op.status !== 'COMPLETED'
            return (
              <div key={op.id} className="panel p-3">
                <div className="mb-1.5 flex flex-wrap items-center gap-1.5">
                  <span className={cn('rounded border px-1.5 py-0.5 text-[9px] font-medium uppercase', priority.color)}>{priority.label}</span>
                  <div className="flex items-center gap-1">
                    <div className={cn('h-1.5 w-1.5 rounded-full', col.dot)} />
                    <span className={cn('text-[10px] font-medium uppercase', col.color)}>{col.label}</span>
                  </div>
                  <span className="ms-auto font-mono text-[10px] text-zord-text-dim">{op.investigationCode}</span>
                </div>
                <p className="text-sm font-medium text-zord-text leading-snug">{op.title}</p>
                <p className="mt-0.5 text-xs text-zord-text-muted line-clamp-2">{op.description}</p>
                <div className="mt-2 flex flex-wrap gap-x-3 gap-y-0.5 text-[10px] text-zord-text-dim">
                  <span className="flex items-center gap-1"><User className="h-3 w-3" />{op.assignee}</span>
                  <span className={cn('flex items-center gap-1', isOverdue && 'text-red-400')}>
                    <Calendar className="h-3 w-3" />{isOverdue && '⚠ '}{new Date(op.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Desktop: Kanban columns */}
      <div className="hidden gap-4 overflow-x-auto pb-2 md:flex">
        {COLUMNS.map((col) => {
          const ops = grouped[col.id] ?? []
          return (
            <div key={col.id} className="flex w-72 shrink-0 flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={cn('h-2 w-2 rounded-full', col.dot)} />
                  <span className={cn('text-xs font-medium uppercase tracking-wide', col.color)}>{col.label}</span>
                  <span className="rounded bg-zord-muted px-1.5 py-0.5 text-[10px] text-zord-text-muted">{ops.length}</span>
                </div>
                <button className="rounded p-1 hover:bg-zord-muted">
                  <Plus className="h-3.5 w-3.5 text-zord-text-muted" />
                </button>
              </div>
              <div className="flex flex-col gap-2">
                {ops.map((op) => (
                  <OperationCard key={op.id} op={op} />
                ))}
                {ops.length === 0 && (
                  <div className="rounded border border-dashed border-zord-border p-4 text-center text-xs text-zord-text-dim">
                    No operations
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
