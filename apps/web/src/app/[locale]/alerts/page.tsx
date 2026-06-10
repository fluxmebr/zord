'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { AlertTriangle, Bell, CheckCheck, Eye, ChevronDown } from 'lucide-react'

const MOCK_ALERTS = [
  { id: '1', severity: 'CRITICAL', status: 'OPEN', title: 'New entity linked to sanctioned network', description: 'Entity Viktor Malkov appears on OFAC SDN list cross-reference.', investigation: 'INV-2024-047', time: '4m ago', source: 'AUTOMATED' },
  { id: '2', severity: 'HIGH', status: 'OPEN', title: 'Hypothesis contradiction detected', description: 'Evidence E-0231 contradicts Hypothesis H-051-B.', investigation: 'INV-2024-051', time: '12m ago', source: 'AI' },
  { id: '3', severity: 'HIGH', status: 'ACKNOWLEDGED', title: '48h temporal gap in timeline', description: 'No events recorded between Jun 6 18:00 and Jun 8 09:00.', investigation: 'INV-2024-039', time: '31m ago', source: 'GAP_DETECTION' },
  { id: '4', severity: 'MEDIUM', status: 'OPEN', title: 'Evidence processing complete — 12 items', description: 'OCR and hash verification complete for uploaded documents.', investigation: 'INV-2024-055', time: '1h ago', source: 'SYSTEM' },
  { id: '5', severity: 'MEDIUM', status: 'RESOLVED', title: 'Trust score threshold breach', description: 'Entity Meridian Corp trust score dropped below 50.', investigation: 'INV-2024-039', time: '2h ago', source: 'TRUST_ENGINE' },
  { id: '6', severity: 'LOW', status: 'OPEN', title: 'New WHOIS registration: titan-secure.io', description: 'Domain similar to known entity registered 6h ago.', investigation: 'INV-2024-047', time: '3h ago', source: 'MONITORING' },
]

const SEV: Record<string, { border: string; dot: string; badge: string }> = {
  CRITICAL: { border: 'border-s-red-600', dot: 'bg-red-500', badge: 'text-red-400 bg-red-950 border-red-900' },
  HIGH:     { border: 'border-s-orange-600', dot: 'bg-orange-500', badge: 'text-orange-400 bg-orange-950 border-orange-900' },
  MEDIUM:   { border: 'border-s-yellow-600', dot: 'bg-yellow-500', badge: 'text-yellow-400 bg-yellow-950 border-yellow-900' },
  LOW:      { border: 'border-s-blue-600', dot: 'bg-blue-500', badge: 'text-blue-400 bg-blue-950 border-blue-900' },
}

const STATUS_STYLE: Record<string, string> = {
  OPEN: 'text-red-400',
  ACKNOWLEDGED: 'text-yellow-400',
  RESOLVED: 'text-green-400',
  DISMISSED: 'text-zinc-500',
}

export default function AlertsPage() {
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [sevFilter, setSevFilter] = useState<string | null>(null)

  const filtered = MOCK_ALERTS.filter((a) => {
    if (statusFilter && a.status !== statusFilter) return false
    if (sevFilter && a.severity !== sevFilter) return false
    return true
  })

  const open = MOCK_ALERTS.filter((a) => a.status === 'OPEN').length
  const critical = MOCK_ALERTS.filter((a) => a.severity === 'CRITICAL' && a.status === 'OPEN').length

  return (
    <div className="flex flex-col gap-3 p-3 sm:gap-4 sm:p-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <h1 className="text-base font-semibold text-zord-text sm:text-lg">Alerts</h1>
          <p className="text-xs text-zord-text-muted">
            <span className="text-red-400 font-medium">{open} open</span>
            {critical > 0 && <> · <span className="text-red-500 font-semibold">{critical} critical</span></>}
          </p>
        </div>
        <button className="flex items-center gap-1.5 rounded border border-zord-border bg-zord-panel px-3 py-1.5 text-xs text-zord-text-muted hover:text-zord-text">
          <CheckCheck className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Acknowledge all</span>
          <span className="sm:hidden">All</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-1.5">
        {[null, 'OPEN', 'ACKNOWLEDGED', 'RESOLVED'].map((s) => (
          <button
            key={s ?? 'ALL'}
            onClick={() => setStatusFilter(s)}
            className={cn(
              'rounded px-2.5 py-1.5 text-xs transition-colors',
              statusFilter === s ? 'bg-zord-accent text-white' : 'border border-zord-border bg-zord-panel text-zord-text-muted hover:text-zord-text',
            )}
          >
            {s ?? 'All status'}
          </button>
        ))}
        <div className="mx-1 w-px bg-zord-border" />
        {[null, 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW'].map((s) => (
          <button
            key={s ?? 'ALL_SEV'}
            onClick={() => setSevFilter(s)}
            className={cn(
              'rounded px-2.5 py-1.5 text-xs transition-colors',
              sevFilter === s ? 'bg-zord-accent text-white' : 'border border-zord-border bg-zord-panel text-zord-text-muted hover:text-zord-text',
            )}
          >
            {s ?? 'All severity'}
          </button>
        ))}
      </div>

      {/* Alert list */}
      <div className="panel divide-y divide-zord-border overflow-hidden">
        {filtered.map((alert) => {
          const sev = SEV[alert.severity] ?? SEV['LOW']!
          return (
            <div key={alert.id} className={cn('border-s-2 px-4 py-3.5 transition-colors hover:bg-zord-muted/40', sev.border)}>
              <div className="flex items-start gap-3">
                <div className={cn('mt-1.5 h-2 w-2 shrink-0 rounded-full', sev.dot, alert.severity === 'CRITICAL' && 'animate-pulse')} />
                <div className="min-w-0 flex-1">
                  {/* Badges row */}
                  <div className="mb-1.5 flex flex-wrap items-center gap-1.5">
                    <span className={cn('rounded border px-1.5 py-0.5 text-[9px] font-medium uppercase', sev.badge)}>
                      {alert.severity}
                    </span>
                    <span className={cn('text-[10px] font-medium', STATUS_STYLE[alert.status])}>
                      {alert.status}
                    </span>
                    <span className="font-mono text-[10px] text-zord-text-dim">{alert.investigation}</span>
                    <span className="ms-auto text-[10px] text-zord-text-dim">{alert.time}</span>
                  </div>
                  {/* Title + desc */}
                  <p className="text-sm font-medium text-zord-text">{alert.title}</p>
                  <p className="mt-0.5 text-xs text-zord-text-muted">{alert.description}</p>
                  {/* Actions */}
                  <div className="mt-2.5 flex gap-2">
                    <button className="flex items-center gap-1 text-[10px] text-zord-accent hover:underline">
                      <Eye className="h-3 w-3" /> View
                    </button>
                    {alert.status === 'OPEN' && (
                      <button className="flex items-center gap-1 text-[10px] text-zord-text-muted hover:text-zord-text">
                        <CheckCheck className="h-3 w-3" /> Acknowledge
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
        {filtered.length === 0 && (
          <div className="py-12 text-center text-sm text-zord-text-muted">No alerts match the selected filters</div>
        )}
      </div>
    </div>
  )
}
