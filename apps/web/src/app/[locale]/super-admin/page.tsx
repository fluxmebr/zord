'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Building2, Plus, TrendingUp, CheckCircle, Clock, XCircle } from 'lucide-react'
import { InstitutionsTable, type Institution } from '@/components/super-admin/institutions-table'

const MOCK_INSTITUTIONS: Institution[] = [
  {
    id: '1', name: 'National Intelligence Agency', slug: 'nia-gov', domain: 'nia.gov',
    plan: 'ENTERPRISE', status: 'ACTIVE', users: 87, investigations: 312,
    createdAt: '2024-01-15T00:00:00Z',
  },
  {
    id: '2', name: 'Interpol Regional Office — EMEA', slug: 'interpol-emea',
    plan: 'PROFESSIONAL', status: 'ACTIVE', users: 34, investigations: 128,
    createdAt: '2024-02-20T00:00:00Z',
  },
  {
    id: '3', name: 'Municipal Police — Cyber Unit', slug: 'police-cyber',
    plan: 'STARTER', status: 'ACTIVE', users: 12, investigations: 41,
    createdAt: '2024-04-01T00:00:00Z',
  },
  {
    id: '4', name: 'Financial Intelligence Unit', slug: 'fiu-mof',
    plan: 'PROFESSIONAL', status: 'SUSPENDED', users: 22, investigations: 67,
    createdAt: '2024-03-10T00:00:00Z',
  },
  {
    id: '5', name: 'Counter-Terrorism Division', slug: 'ctd-pilot',
    plan: 'TRIAL', status: 'TRIAL', users: 3, investigations: 5,
    createdAt: '2024-06-01T00:00:00Z',
  },
]

export default function SuperAdminPage() {
  const router = useRouter()
  const [institutions, setInstitutions] = useState<Institution[]>(MOCK_INSTITUTIONS)

  const stats = {
    total: institutions.length,
    active: institutions.filter((i) => i.status === 'ACTIVE').length,
    trial: institutions.filter((i) => i.status === 'TRIAL').length,
    suspended: institutions.filter((i) => i.status === 'SUSPENDED').length,
  }

  const handleToggleStatus = (id: string, currentStatus: Institution['status']) => {
    setInstitutions((prev) =>
      prev.map((i) =>
        i.id === id
          ? { ...i, status: currentStatus === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE' }
          : i,
      ),
    )
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-lg font-semibold text-zord-text sm:text-xl">Institutions</h1>
          <p className="text-xs text-zord-text-muted">Manage all tenant organizations on the ZORD platform</p>
        </div>
        <button
          onClick={() => router.push('/he/super-admin/institutions/new')}
          className="btn-primary shrink-0 text-sm"
        >
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">New Institution</span>
          <span className="sm:hidden">New</span>
        </button>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: 'Total', value: stats.total, icon: Building2, color: 'text-zord-accent', bg: 'bg-zord-accent/10' },
          { label: 'Active', value: stats.active, icon: CheckCircle, color: 'text-green-400', bg: 'bg-green-950/40' },
          { label: 'Trial', value: stats.trial, icon: Clock, color: 'text-blue-400', bg: 'bg-blue-950/40' },
          { label: 'Suspended', value: stats.suspended, icon: XCircle, color: 'text-red-400', bg: 'bg-red-950/40' },
        ].map((s) => (
          <div key={s.label} className="panel p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-zord-text-muted">{s.label}</span>
              <div className={cn('flex h-7 w-7 items-center justify-center rounded', s.bg)}>
                <s.icon className={cn('h-4 w-4', s.color)} />
              </div>
            </div>
            <p className={cn('mt-2 text-2xl font-bold tabular-nums', s.color)}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <InstitutionsTable institutions={institutions} onToggleStatus={handleToggleStatus} />
    </div>
  )
}
