'use client'

import { cn } from '@/lib/utils'
import { AlertTriangle, Info, ChevronRight } from 'lucide-react'

const MOCK_ALERTS = [
  {
    id: '1',
    severity: 'CRITICAL',
    title: 'New entity linked to Operation Nightfall',
    time: '4m ago',
    investigation: 'INV-2024-047',
  },
  {
    id: '2',
    severity: 'HIGH',
    title: 'Hypothesis contradiction detected',
    time: '12m ago',
    investigation: 'INV-2024-051',
  },
  {
    id: '3',
    severity: 'HIGH',
    title: 'Gap detected: 48h temporal gap in timeline',
    time: '31m ago',
    investigation: 'INV-2024-039',
  },
  {
    id: '4',
    severity: 'MEDIUM',
    title: 'Evidence processing complete — 12 items',
    time: '1h ago',
    investigation: 'INV-2024-055',
  },
  {
    id: '5',
    severity: 'INFO',
    title: 'Trust score updated: +8 points',
    time: '2h ago',
    investigation: 'INV-2024-043',
  },
  {
    id: '6',
    severity: 'MEDIUM',
    title: 'New entity relationship identified',
    time: '3h ago',
    investigation: 'INV-2024-047',
  },
]

const SEVERITY_STYLE: Record<string, { border: string; dot: string; label: string }> = {
  CRITICAL: { border: 'border-s-red-600', dot: 'bg-red-500', label: 'text-red-400' },
  HIGH: { border: 'border-s-orange-600', dot: 'bg-orange-500', label: 'text-orange-400' },
  MEDIUM: { border: 'border-s-yellow-600', dot: 'bg-yellow-500', label: 'text-yellow-400' },
  INFO: { border: 'border-s-blue-600', dot: 'bg-blue-500', label: 'text-blue-400' },
}

export function AlertsFeed() {
  return (
    <div className="panel flex flex-col">
      <div className="panel-header">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-yellow-400" />
          <span className="text-sm font-medium text-zord-text">Alerts</span>
          <span className="rounded bg-red-950 px-1.5 py-0.5 text-[10px] font-medium text-red-400">
            18
          </span>
        </div>
        <button className="flex items-center gap-1 text-xs text-zord-accent hover:underline">
          All <ChevronRight className="h-3 w-3" />
        </button>
      </div>

      <div className="divide-y divide-zord-border overflow-y-auto">
        {MOCK_ALERTS.map((alert) => {
          const style = SEVERITY_STYLE[alert.severity] ?? SEVERITY_STYLE['INFO']!
          return (
            <div
              key={alert.id}
              className={cn(
                'border-s-2 px-4 py-3 transition-colors hover:bg-zord-muted/50 cursor-pointer',
                style.border,
              )}
            >
              <div className="flex items-start gap-2">
                <div className={cn('mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full', style.dot)} />
                <div className="min-w-0 flex-1">
                  <p className="text-xs leading-relaxed text-zord-text">{alert.title}</p>
                  <div className="mt-1 flex items-center gap-2 text-[10px] text-zord-text-muted">
                    <span className="font-mono">{alert.investigation}</span>
                    <span>·</span>
                    <span>{alert.time}</span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
