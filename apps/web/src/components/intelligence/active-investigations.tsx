'use client'

import { cn } from '@/lib/utils'
import { ChevronRight, User } from 'lucide-react'
import { Link } from '@/i18n/navigation'

const MOCK_INVESTIGATIONS = [
  {
    id: '1', code: 'INV-2024-047', name: 'Operation Nightfall',
    classification: 'TOP_SECRET', priority: 'CRITICAL', status: 'ACTIVE',
    entities: 84, evidence: 217, trustScore: 78, lead: 'D. Cohen', updatedAt: '2m ago',
  },
  {
    id: '2', code: 'INV-2024-051', name: 'Corporate Structure — Titan Holdings',
    classification: 'SECRET', priority: 'HIGH', status: 'ACTIVE',
    entities: 312, evidence: 94, trustScore: 85, lead: 'M. Ivanova', updatedAt: '18m ago',
  },
  {
    id: '3', code: 'INV-2024-039', name: 'Financial Network — Cross-border',
    classification: 'CONFIDENTIAL', priority: 'HIGH', status: 'ACTIVE',
    entities: 156, evidence: 431, trustScore: 91, lead: 'R. Silva', updatedAt: '1h ago',
  },
  {
    id: '4', code: 'INV-2024-055', name: 'Digital Infrastructure Mapping',
    classification: 'INTERNAL', priority: 'MEDIUM', status: 'PLANNING',
    entities: 22, evidence: 8, trustScore: 45, lead: 'A. Ben-David', updatedAt: '3h ago',
  },
  {
    id: '5', code: 'INV-2024-043', name: 'Influence Network Analysis',
    classification: 'SECRET', priority: 'MEDIUM', status: 'ACTIVE',
    entities: 98, evidence: 167, trustScore: 72, lead: 'D. Cohen', updatedAt: '5h ago',
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
  CRITICAL: 'text-red-400',
  HIGH: 'text-orange-400',
  MEDIUM: 'text-yellow-400',
  LOW: 'text-green-400',
}

function TrustBar({ score }: { score: number }) {
  const color = score >= 80 ? 'bg-green-500' : score >= 60 ? 'bg-yellow-500' : score >= 40 ? 'bg-orange-500' : 'bg-red-500'
  return (
    <div className="flex items-center gap-1.5">
      <div className="h-1 w-12 rounded-full bg-zord-border sm:w-16">
        <div className={cn('h-full rounded-full', color)} style={{ width: `${score}%` }} />
      </div>
      <span className="w-6 text-right font-mono text-[10px] tabular-nums text-zord-text-muted">{score}</span>
    </div>
  )
}

export function ActiveInvestigations() {
  return (
    <div className="panel">
      <div className="panel-header">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-zord-text">Active Investigations</span>
          <span className="rounded bg-zord-muted px-1.5 py-0.5 text-[10px] text-zord-text-muted">24</span>
        </div>
        <Link href="/investigations" className="flex items-center gap-1 text-xs text-zord-accent hover:underline">
          View all <ChevronRight className="h-3 w-3" />
        </Link>
      </div>

      <div className="divide-y divide-zord-border">
        {MOCK_INVESTIGATIONS.map((inv) => (
          <div key={inv.id} className="flex items-start gap-3 px-4 py-3 transition-colors hover:bg-zord-muted/50 active:bg-zord-muted">
            {/* Priority indicator */}
            <div className={cn(
              'mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full',
              inv.priority === 'CRITICAL' ? 'bg-red-500 animate-pulse' :
              inv.priority === 'HIGH' ? 'bg-orange-500' :
              'bg-yellow-500'
            )} />

            <div className="min-w-0 flex-1">
              {/* Classification + code row */}
              <div className="mb-1 flex flex-wrap items-center gap-1.5">
                <span className={cn('rounded px-1.5 py-0.5', CLASSIFICATION_STYLE[inv.classification])}>
                  {inv.classification.replace('_', ' ')}
                </span>
                <span className="font-mono text-[10px] text-zord-text-muted">{inv.code}</span>
              </div>

              {/* Name */}
              <div className="truncate text-sm font-medium text-zord-text">{inv.name}</div>

              {/* Stats row */}
              <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-zord-text-muted">
                <span>{inv.entities} entities</span>
                <span>{inv.evidence} evidence</span>
                <span className="flex items-center gap-1">
                  <User className="h-2.5 w-2.5" />{inv.lead}
                </span>
                <span className="ms-auto">{inv.updatedAt}</span>
              </div>
            </div>

            {/* Trust score — hidden on small mobile */}
            <div className="hidden shrink-0 flex-col items-end gap-1 xs:flex sm:flex">
              <span className="text-[9px] uppercase tracking-wider text-zord-text-dim">Trust</span>
              <TrustBar score={inv.trustScore} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
