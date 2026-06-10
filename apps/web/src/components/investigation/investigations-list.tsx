'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Search, Plus, Filter, User, Tag, Eye, Edit, ChevronRight, SlidersHorizontal } from 'lucide-react'

const MOCK_INVESTIGATIONS = [
  {
    id: '1', code: 'INV-2024-047', name: 'Operation Nightfall',
    description: 'Investigation into the financial and operational structure of a suspected criminal network.',
    classification: 'TOP_SECRET', priority: 'CRITICAL', status: 'ACTIVE',
    entities: 84, evidence: 217, hypotheses: 12, trustScore: 78,
    lead: 'D. Cohen', tags: ['financial', 'organized-crime'], updatedAt: '2m ago',
  },
  {
    id: '2', code: 'INV-2024-051', name: 'Corporate Structure Analysis — Titan Holdings',
    description: 'Mapping the complete corporate structure of Titan Holdings and related entities.',
    classification: 'SECRET', priority: 'HIGH', status: 'ACTIVE',
    entities: 312, evidence: 94, hypotheses: 8, trustScore: 85,
    lead: 'M. Ivanova', tags: ['corporate', 'ownership'], updatedAt: '18m ago',
  },
  {
    id: '3', code: 'INV-2024-039', name: 'Financial Network — Cross-border Flows',
    description: 'Tracing suspicious cross-border financial flows through multiple jurisdictions.',
    classification: 'CONFIDENTIAL', priority: 'HIGH', status: 'ACTIVE',
    entities: 156, evidence: 431, hypotheses: 19, trustScore: 91,
    lead: 'R. Silva', tags: ['financial', 'cross-border'], updatedAt: '1h ago',
  },
  {
    id: '4', code: 'INV-2024-055', name: 'Digital Infrastructure Mapping',
    description: 'Analysis of digital infrastructure associated with target organizations.',
    classification: 'INTERNAL', priority: 'MEDIUM', status: 'PLANNING',
    entities: 22, evidence: 8, hypotheses: 3, trustScore: 45,
    lead: 'A. Ben-David', tags: ['digital', 'infrastructure'], updatedAt: '3h ago',
  },
  {
    id: '5', code: 'INV-2024-043', name: 'Influence Network Analysis',
    description: 'Identifying key nodes in an influence and propaganda network.',
    classification: 'SECRET', priority: 'MEDIUM', status: 'ACTIVE',
    entities: 98, evidence: 167, hypotheses: 7, trustScore: 72,
    lead: 'D. Cohen', tags: ['influence', 'social-media'], updatedAt: '5h ago',
  },
]

const CLASSIFICATION_STYLE: Record<string, string> = {
  TOP_SECRET: 'badge-top-secret',
  SECRET: 'badge-secret',
  CONFIDENTIAL: 'badge-confidential',
  INTERNAL: 'badge-internal',
  OPEN: 'badge-open',
}

const PRIORITY_COLOR: Record<string, string> = {
  CRITICAL: 'text-red-400 bg-red-950 border-red-900',
  HIGH: 'text-orange-400 bg-orange-950 border-orange-900',
  MEDIUM: 'text-yellow-400 bg-yellow-950 border-yellow-900',
  LOW: 'text-green-400 bg-green-950 border-green-900',
}

const STATUS_STYLE: Record<string, string> = {
  ACTIVE: 'text-green-400',
  PLANNING: 'text-blue-400',
  ON_HOLD: 'text-yellow-400',
  CONCLUDED: 'text-zinc-400',
  ARCHIVED: 'text-zinc-600',
  CANCELLED: 'text-red-600',
}

const STATUS_DOT: Record<string, string> = {
  ACTIVE: 'bg-green-500 animate-pulse',
  PLANNING: 'bg-blue-500',
  ON_HOLD: 'bg-yellow-500',
  CONCLUDED: 'bg-zinc-500',
  ARCHIVED: 'bg-zinc-700',
  CANCELLED: 'bg-red-700',
}

function TrustBar({ score }: { score: number }) {
  const color = score >= 80 ? 'bg-green-500' : score >= 60 ? 'bg-yellow-500' : score >= 40 ? 'bg-orange-500' : 'bg-red-500'
  return (
    <div className="flex items-center gap-1.5">
      <div className="h-1 flex-1 rounded-full bg-zord-border">
        <div className={cn('h-full rounded-full', color)} style={{ width: `${score}%` }} />
      </div>
      <span className="w-6 shrink-0 text-right font-mono text-[10px] tabular-nums text-zord-text-muted">{score}</span>
    </div>
  )
}

// ─── Mobile card ────────────────────────────────────────────
function InvestigationCard({ inv }: { inv: typeof MOCK_INVESTIGATIONS[0] }) {
  return (
    <div className="panel flex flex-col gap-3 p-4 active:bg-zord-muted/50">
      {/* Header row */}
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex flex-wrap items-center gap-1.5">
            <span className={cn('rounded px-1.5 py-0.5', CLASSIFICATION_STYLE[inv.classification])}>
              {inv.classification.replace('_', ' ')}
            </span>
            <span className="font-mono text-[10px] text-zord-text-muted">{inv.code}</span>
          </div>
          <h3 className="text-sm font-medium leading-snug text-zord-text">{inv.name}</h3>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1.5">
          <span className={cn('rounded border px-2 py-0.5 text-[10px] font-medium uppercase', PRIORITY_COLOR[inv.priority])}>
            {inv.priority}
          </span>
          <div className="flex items-center gap-1">
            <span className={cn('h-1.5 w-1.5 rounded-full', STATUS_DOT[inv.status])} />
            <span className={cn('text-[10px]', STATUS_STYLE[inv.status])}>{inv.status}</span>
          </div>
        </div>
      </div>

      {/* Trust bar */}
      <div>
        <div className="mb-1 flex items-center justify-between">
          <span className="text-[9px] uppercase tracking-wider text-zord-text-dim">Trust Score</span>
        </div>
        <TrustBar score={inv.trustScore} />
      </div>

      {/* Stats row */}
      <div className="flex items-center gap-4 text-xs text-zord-text-muted">
        <div className="flex flex-col items-center gap-0.5">
          <span className="text-sm font-semibold text-zord-text">{inv.entities}</span>
          <span className="text-[9px] uppercase">Entities</span>
        </div>
        <div className="h-6 w-px bg-zord-border" />
        <div className="flex flex-col items-center gap-0.5">
          <span className="text-sm font-semibold text-zord-text">{inv.evidence}</span>
          <span className="text-[9px] uppercase">Evidence</span>
        </div>
        <div className="h-6 w-px bg-zord-border" />
        <div className="flex flex-col items-center gap-0.5">
          <span className="text-sm font-semibold text-zord-text">{inv.hypotheses}</span>
          <span className="text-[9px] uppercase">Hypotheses</span>
        </div>
        <div className="ms-auto flex items-center gap-1 text-[10px]">
          <User className="h-3 w-3" />
          {inv.lead}
        </div>
      </div>

      {/* Tags + time */}
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-1">
          {inv.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="flex items-center gap-0.5 text-[10px] text-zord-text-dim">
              <Tag className="h-2.5 w-2.5" />{tag}
            </span>
          ))}
        </div>
        <span className="text-[10px] text-zord-text-dim">{inv.updatedAt}</span>
      </div>
    </div>
  )
}

// ─── Desktop table row ───────────────────────────────────────
function InvestigationRow({ inv }: { inv: typeof MOCK_INVESTIGATIONS[0] }) {
  return (
    <tr className="group transition-colors hover:bg-zord-muted/40">
      <td className="px-4 py-3">
        <span className="font-mono text-xs text-zord-text-muted">{inv.code}</span>
      </td>
      <td className="max-w-xs px-4 py-3">
        <div className="flex flex-col gap-1">
          <span className="truncate text-sm font-medium text-zord-text">{inv.name}</span>
          <div className="flex items-center gap-1.5">
            <span className={cn('rounded px-1.5 py-0.5 text-[9px]', CLASSIFICATION_STYLE[inv.classification])}>
              {inv.classification.replace('_', ' ')}
            </span>
            {inv.tags.slice(0, 2).map((t) => (
              <span key={t} className="flex items-center gap-0.5 text-[10px] text-zord-text-dim">
                <Tag className="h-2.5 w-2.5" />{t}
              </span>
            ))}
          </div>
        </div>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-1.5">
          <span className={cn('h-1.5 w-1.5 rounded-full', STATUS_DOT[inv.status])} />
          <span className={cn('text-xs', STATUS_STYLE[inv.status])}>{inv.status}</span>
        </div>
      </td>
      <td className="px-4 py-3">
        <span className={cn('rounded border px-2 py-0.5 text-[10px] font-medium uppercase', PRIORITY_COLOR[inv.priority])}>
          {inv.priority}
        </span>
      </td>
      <td className="px-4 py-3 tabular-nums text-sm text-zord-text">{inv.entities}</td>
      <td className="px-4 py-3 tabular-nums text-sm text-zord-text">{inv.evidence}</td>
      <td className="px-4 py-3">
        <TrustBar score={inv.trustScore} />
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-1.5 text-xs text-zord-text-muted">
          <User className="h-3 w-3" />{inv.lead}
        </div>
      </td>
      <td className="px-4 py-3 text-xs text-zord-text-dim">{inv.updatedAt}</td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          <button className="rounded p-1 hover:bg-zord-muted" title="View">
            <Eye className="h-3.5 w-3.5 text-zord-text-muted" />
          </button>
          <button className="rounded p-1 hover:bg-zord-muted" title="Edit">
            <Edit className="h-3.5 w-3.5 text-zord-text-muted" />
          </button>
        </div>
      </td>
    </tr>
  )
}

// ─── Main component ─────────────────────────────────────────
export function InvestigationsList() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)

  const filtered = MOCK_INVESTIGATIONS.filter((inv) => {
    const matchesSearch =
      !search ||
      inv.name.toLowerCase().includes(search.toLowerCase()) ||
      inv.code.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = !statusFilter || inv.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="flex flex-col gap-3 sm:gap-4">
      {/* Toolbar */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute start-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zord-text-muted" />
          <input
            type="text"
            placeholder="Search investigations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9 w-full rounded border border-zord-border bg-zord-panel ps-9 text-sm text-zord-text placeholder:text-zord-text-dim focus:border-zord-accent focus:outline-none"
          />
        </div>

        {/* Action buttons row */}
        <div className="flex items-center gap-2">
          {/* Filter toggle — mobile */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              'flex h-9 items-center gap-1.5 rounded border px-3 text-xs transition-colors sm:hidden',
              showFilters
                ? 'border-zord-accent bg-zord-accent/10 text-zord-accent'
                : 'border-zord-border bg-zord-panel text-zord-text-muted',
            )}
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Filter
          </button>

          {/* Status filters — desktop always visible, mobile toggled */}
          <div className={cn('hidden flex-wrap gap-1 sm:flex', showFilters && 'flex')}>
            {[null, 'ACTIVE', 'PLANNING', 'ON_HOLD'].map((s) => (
              <button
                key={s ?? 'ALL'}
                onClick={() => setStatusFilter(s)}
                className={cn(
                  'h-9 rounded px-2.5 text-xs transition-colors sm:h-auto sm:py-1.5',
                  statusFilter === s
                    ? 'bg-zord-accent text-white'
                    : 'border border-zord-border bg-zord-panel text-zord-text-muted hover:text-zord-text',
                )}
              >
                {s ?? 'All'}
              </button>
            ))}
          </div>

          {/* New investigation — full on desktop, icon on mobile */}
          <button className="ms-auto flex h-9 items-center gap-1.5 rounded bg-zord-accent px-3 text-xs font-medium text-white hover:bg-zord-accent-dim sm:ms-0">
            <Plus className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">New Investigation</span>
            <span className="sm:hidden">New</span>
          </button>
        </div>
      </div>

      {/* Mobile: card list */}
      <div className="flex flex-col gap-3 md:hidden">
        {filtered.map((inv) => (
          <InvestigationCard key={inv.id} inv={inv} />
        ))}
        {filtered.length === 0 && (
          <div className="py-12 text-center text-sm text-zord-text-muted">No investigations found</div>
        )}
      </div>

      {/* Desktop: table */}
      <div className="panel hidden overflow-x-auto md:block">
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className="border-b border-zord-border">
              {['Code', 'Name', 'Status', 'Priority', 'Entities', 'Evidence', 'Trust', 'Lead', 'Updated', ''].map((h) => (
                <th key={h} className="px-4 py-2.5 text-left text-[10px] font-medium uppercase tracking-wider text-zord-text-muted">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-zord-border">
            {filtered.map((inv) => (
              <InvestigationRow key={inv.id} inv={inv} />
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="py-12 text-center text-sm text-zord-text-muted">No investigations found</div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between text-xs text-zord-text-muted">
        <span>{filtered.length} of {MOCK_INVESTIGATIONS.length}</span>
        <div className="flex gap-1">
          <button className="rounded border border-zord-border px-2.5 py-1.5 hover:bg-zord-muted">Prev</button>
          <button className="rounded border border-zord-border bg-zord-accent px-2.5 py-1.5 text-white">1</button>
          <button className="rounded border border-zord-border px-2.5 py-1.5 hover:bg-zord-muted">Next</button>
        </div>
      </div>
    </div>
  )
}
