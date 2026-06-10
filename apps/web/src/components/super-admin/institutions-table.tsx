'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { MoreHorizontal, Eye, Power, Users, Search, ExternalLink } from 'lucide-react'

export interface Institution {
  id: string
  name: string
  slug: string
  domain?: string
  plan: 'TRIAL' | 'STARTER' | 'PROFESSIONAL' | 'ENTERPRISE'
  status: 'ACTIVE' | 'SUSPENDED' | 'TRIAL' | 'ARCHIVED'
  users: number
  investigations: number
  createdAt: string
}

const PLAN_STYLE: Record<string, string> = {
  TRIAL:        'text-zinc-400 bg-zinc-900 border-zinc-700',
  STARTER:      'text-blue-400 bg-blue-950 border-blue-900',
  PROFESSIONAL: 'text-purple-400 bg-purple-950 border-purple-900',
  ENTERPRISE:   'text-yellow-400 bg-yellow-950 border-yellow-900',
}

const STATUS_STYLE: Record<string, string> = {
  ACTIVE:    'text-green-400 bg-green-950 border-green-900',
  TRIAL:     'text-blue-400 bg-blue-950 border-blue-900',
  SUSPENDED: 'text-red-400 bg-red-950 border-red-900',
  ARCHIVED:  'text-zinc-500 bg-zinc-900 border-zinc-800',
}

interface Props {
  institutions: Institution[]
  onToggleStatus: (id: string, status: Institution['status']) => void
}

export function InstitutionsTable({ institutions, onToggleStatus }: Props) {
  const [search, setSearch] = useState('')
  const [openMenu, setOpenMenu] = useState<string | null>(null)

  const filtered = institutions.filter(
    (i) => !search || i.name.toLowerCase().includes(search.toLowerCase()) || i.slug.includes(search.toLowerCase()),
  )

  return (
    <div className="flex flex-col gap-3">
      {/* Search */}
      <div className="relative">
        <Search className="absolute start-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zord-text-muted" />
        <input
          type="text"
          placeholder="Search by name or slug..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input ps-9"
        />
      </div>

      {/* Mobile: cards */}
      <div className="flex flex-col gap-2 md:hidden">
        {filtered.map((inst) => (
          <div key={inst.id} className="panel p-3">
            <div className="mb-1.5 flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-zord-text">{inst.name}</p>
                <p className="font-mono text-[10px] text-zord-text-muted">/{inst.slug}</p>
              </div>
              <div className="relative">
                <button
                  onClick={() => setOpenMenu(openMenu === inst.id ? null : inst.id)}
                  className="rounded p-1 hover:bg-zord-muted"
                >
                  <MoreHorizontal className="h-4 w-4 text-zord-text-muted" />
                </button>
                {openMenu === inst.id && (
                  <div className="absolute end-0 top-7 z-10 w-40 rounded border border-zord-border bg-zord-panel shadow-lg">
                    <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-zord-text hover:bg-zord-muted">
                      <Eye className="h-3.5 w-3.5" /> View Details
                    </button>
                    <button
                      onClick={() => { onToggleStatus(inst.id, inst.status); setOpenMenu(null) }}
                      className={cn('flex w-full items-center gap-2 px-3 py-2 text-xs hover:bg-zord-muted',
                        inst.status === 'ACTIVE' ? 'text-red-400' : 'text-green-400'
                      )}
                    >
                      <Power className="h-3.5 w-3.5" />
                      {inst.status === 'ACTIVE' ? 'Suspend' : 'Activate'}
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              <span className={cn('rounded border px-1.5 py-0.5 text-[9px] font-medium uppercase', PLAN_STYLE[inst.plan])}>
                {inst.plan}
              </span>
              <span className={cn('rounded border px-1.5 py-0.5 text-[9px] font-medium uppercase', STATUS_STYLE[inst.status])}>
                {inst.status}
              </span>
            </div>
            <div className="mt-2 flex gap-3 text-[10px] text-zord-text-muted">
              <span className="flex items-center gap-1"><Users className="h-3 w-3" />{inst.users} users</span>
              <span>{inst.investigations} investigations</span>
              <span className="ms-auto">{new Date(inst.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="py-10 text-center text-sm text-zord-text-muted">No institutions found</div>
        )}
      </div>

      {/* Desktop: table */}
      <div className="panel hidden overflow-x-auto md:block">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zord-border">
              {['Institution', 'Slug', 'Plan', 'Status', 'Users', 'Investigations', 'Created', ''].map((h) => (
                <th key={h} className="px-4 py-2.5 text-left text-[10px] font-medium uppercase tracking-wider text-zord-text-muted">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-zord-border">
            {filtered.map((inst) => (
              <tr key={inst.id} className="group transition-colors hover:bg-zord-muted/40">
                <td className="px-4 py-3">
                  <div>
                    <p className="text-sm font-medium text-zord-text">{inst.name}</p>
                    {inst.domain && (
                      <p className="flex items-center gap-1 text-[10px] text-zord-text-dim">
                        <ExternalLink className="h-2.5 w-2.5" />{inst.domain}
                      </p>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3 font-mono text-xs text-zord-text-muted">/{inst.slug}</td>
                <td className="px-4 py-3">
                  <span className={cn('rounded border px-1.5 py-0.5 text-[9px] font-medium uppercase', PLAN_STYLE[inst.plan])}>
                    {inst.plan}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={cn('rounded border px-1.5 py-0.5 text-[9px] font-medium uppercase', STATUS_STYLE[inst.status])}>
                    {inst.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-zord-text">{inst.users}</td>
                <td className="px-4 py-3 text-sm text-zord-text">{inst.investigations}</td>
                <td className="px-4 py-3 text-xs text-zord-text-muted whitespace-nowrap">
                  {new Date(inst.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                    <button className="rounded border border-zord-border px-2 py-1 text-[10px] text-zord-text-muted hover:text-zord-text">
                      View
                    </button>
                    <button
                      onClick={() => onToggleStatus(inst.id, inst.status)}
                      className={cn(
                        'rounded border px-2 py-1 text-[10px] transition-colors',
                        inst.status === 'ACTIVE'
                          ? 'border-red-900 text-red-400 hover:bg-red-950/40'
                          : 'border-green-900 text-green-400 hover:bg-green-950/40',
                      )}
                    >
                      {inst.status === 'ACTIVE' ? 'Suspend' : 'Activate'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={8} className="py-10 text-center text-sm text-zord-text-muted">
                  No institutions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
