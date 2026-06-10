'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Search, Plus, Filter, Network, Eye, Edit } from 'lucide-react'

const MOCK_ENTITIES = [
  { id: '1', type: 'PERSON', label: 'Viktor Malkov', trustScore: 82, relationships: 14, investigations: 3, updatedAt: '4m ago' },
  { id: '2', type: 'COMPANY', label: 'Titan Holdings Ltd.', trustScore: 71, relationships: 31, investigations: 2, updatedAt: '12m ago' },
  { id: '3', type: 'DOMAIN', label: 'titan-offshore.io', trustScore: 55, relationships: 7, investigations: 1, updatedAt: '1h ago' },
  { id: '4', type: 'EMAIL', label: 'v.malkov@proton.me', trustScore: 90, relationships: 5, investigations: 2, updatedAt: '2h ago' },
  { id: '5', type: 'ADDRESS', label: '14 Bosphorus Quay, Istanbul', trustScore: 63, relationships: 9, investigations: 1, updatedAt: '5h ago' },
  { id: '6', type: 'PHONE', label: '+7 495 XXX-XXXX', trustScore: 45, relationships: 3, investigations: 1, updatedAt: '1d ago' },
]

const TYPE_COLORS: Record<string, string> = {
  PERSON: 'text-blue-400 bg-blue-950 border-blue-900',
  COMPANY: 'text-purple-400 bg-purple-950 border-purple-900',
  DOMAIN: 'text-cyan-400 bg-cyan-950 border-cyan-900',
  EMAIL: 'text-green-400 bg-green-950 border-green-900',
  ADDRESS: 'text-yellow-400 bg-yellow-950 border-yellow-900',
  PHONE: 'text-orange-400 bg-orange-950 border-orange-900',
  VEHICLE: 'text-red-400 bg-red-950 border-red-900',
  ORGANIZATION: 'text-indigo-400 bg-indigo-950 border-indigo-900',
}

function TrustBar({ score }: { score: number }) {
  const color = score >= 80 ? 'bg-green-500' : score >= 60 ? 'bg-yellow-500' : score >= 40 ? 'bg-orange-500' : 'bg-red-500'
  return (
    <div className="flex items-center gap-2">
      <div className="h-1 w-20 rounded-full bg-zord-border">
        <div className={cn('h-full rounded-full transition-all', color)} style={{ width: `${score}%` }} />
      </div>
      <span className="w-7 text-right font-mono text-xs tabular-nums text-zord-text-muted">{score}</span>
    </div>
  )
}

const ENTITY_TYPES = ['ALL', 'PERSON', 'COMPANY', 'DOMAIN', 'EMAIL', 'ADDRESS', 'PHONE']

export function EntitiesList() {
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('ALL')

  const filtered = MOCK_ENTITIES.filter((e) => {
    const matchSearch = !search || e.label.toLowerCase().includes(search.toLowerCase())
    const matchType = typeFilter === 'ALL' || e.type === typeFilter
    return matchSearch && matchType
  })

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute start-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zord-text-muted" />
          <input
            type="text"
            placeholder="Search entities..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded border border-zord-border bg-zord-panel ps-9 py-2 text-sm text-zord-text placeholder:text-zord-text-dim focus:border-zord-accent focus:outline-none"
          />
        </div>
        <div className="flex flex-wrap gap-1">
          {ENTITY_TYPES.map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={cn(
                'rounded px-2.5 py-1.5 text-xs transition-colors',
                typeFilter === t
                  ? 'bg-zord-accent text-white'
                  : 'bg-zord-panel border border-zord-border text-zord-text-muted hover:text-zord-text',
              )}
            >
              {t === 'ALL' ? 'All' : t.charAt(0) + t.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
        <button className="flex items-center gap-1.5 rounded bg-zord-accent px-3 py-1.5 text-xs font-medium text-white hover:bg-zord-accent-dim">
          <Plus className="h-3.5 w-3.5" />
          New Entity
        </button>
      </div>

      {/* Mobile: cards */}
      <div className="flex flex-col gap-2 md:hidden">
        {filtered.map((entity) => (
          <div key={entity.id} className="panel p-3">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <span className={cn('shrink-0 rounded border px-1.5 py-0.5 text-[9px] font-medium uppercase', TYPE_COLORS[entity.type] ?? 'text-zinc-400 bg-zinc-900 border-zinc-800')}>
                  {entity.type}
                </span>
                <span className="text-sm font-medium text-zord-text truncate">{entity.label}</span>
              </div>
              <span className="shrink-0 text-[10px] text-zord-text-dim">{entity.updatedAt}</span>
            </div>
            <div className="mt-2">
              <TrustBar score={entity.trustScore} />
            </div>
            <div className="mt-2 flex items-center gap-3 text-[10px] text-zord-text-muted">
              <span className="flex items-center gap-1"><Network className="h-3 w-3" />{entity.relationships} links</span>
              <span>{entity.investigations} investigations</span>
              <div className="ms-auto flex gap-1">
                <button className="rounded p-1 hover:bg-zord-muted"><Eye className="h-3.5 w-3.5" /></button>
                <button className="rounded p-1 hover:bg-zord-muted"><Edit className="h-3.5 w-3.5" /></button>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="py-12 text-center text-sm text-zord-text-muted">No entities found</div>
        )}
      </div>

      {/* Desktop: table */}
      <div className="panel hidden overflow-hidden md:block">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zord-border">
              {['Type', 'Label', 'Trust Score', 'Relationships', 'Investigations', 'Updated', ''].map((h) => (
                <th key={h} className="px-4 py-2.5 text-left text-[10px] font-medium uppercase tracking-wider text-zord-text-muted">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-zord-border">
            {filtered.map((entity) => (
              <tr key={entity.id} className="group transition-colors hover:bg-zord-muted/40">
                <td className="px-4 py-3">
                  <span className={cn('rounded border px-2 py-0.5 text-[10px] font-medium uppercase', TYPE_COLORS[entity.type] ?? 'text-zinc-400 bg-zinc-900 border-zinc-800')}>
                    {entity.type}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm font-medium text-zord-text">{entity.label}</span>
                </td>
                <td className="px-4 py-3">
                  <TrustBar score={entity.trustScore} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1.5 text-sm text-zord-text">
                    <Network className="h-3.5 w-3.5 text-zord-text-muted" />
                    {entity.relationships}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="tabular-nums text-sm text-zord-text">{entity.investigations}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-xs text-zord-text-dim">{entity.updatedAt}</span>
                </td>
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
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="py-12 text-center text-sm text-zord-text-muted">No entities found</div>
        )}
      </div>

      <div className="flex items-center justify-between text-xs text-zord-text-muted">
        <span>{filtered.length} of {MOCK_ENTITIES.length} entities</span>
        <div className="flex gap-1">
          <button className="rounded border border-zord-border px-2.5 py-1 hover:bg-zord-muted">Prev</button>
          <button className="rounded border border-zord-border bg-zord-accent px-2.5 py-1 text-white">1</button>
          <button className="rounded border border-zord-border px-2.5 py-1 hover:bg-zord-muted">Next</button>
        </div>
      </div>
    </div>
  )
}
