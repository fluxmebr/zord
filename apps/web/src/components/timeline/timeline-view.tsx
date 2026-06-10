'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Clock, Filter, ChevronDown } from 'lucide-react'

const MOCK_EVENTS = [
  {
    id: '1', date: '2024-06-09', time: '14:32', eventType: 'ENTITY_LINKED', title: 'Viktor Malkov linked to Titan Holdings',
    description: 'Entity relationship established via corporate records.', severity: 'HIGH', investigationCode: 'INV-2024-047',
  },
  {
    id: '2', date: '2024-06-09', time: '09:15', eventType: 'EVIDENCE_UPLOADED', title: 'Financial statement PDF uploaded',
    description: 'Q4 2023 statement for Titan Holdings. OCR processing complete.', severity: 'MEDIUM', investigationCode: 'INV-2024-047',
  },
  {
    id: '3', date: '2024-06-08', time: '17:44', eventType: 'HYPOTHESIS_UPDATED', title: 'Hypothesis "Shell Company Network" validated',
    description: 'Trust score increased to 87 after 3 new corroborating evidence items.', severity: 'CRITICAL', investigationCode: 'INV-2024-051',
  },
  {
    id: '4', date: '2024-06-08', time: '11:20', eventType: 'ALERT_TRIGGERED', title: 'New domain registered: titan-secure.io',
    description: 'Automated monitoring flagged new domain registration similar to target entity.', severity: 'HIGH', investigationCode: 'INV-2024-047',
  },
  {
    id: '5', date: '2024-06-07', time: '16:05', eventType: 'INVESTIGATION_UPDATED', title: 'INV-2024-039 status changed to ACTIVE',
    description: 'Lead analyst activated investigation after initial planning phase.', severity: 'LOW', investigationCode: 'INV-2024-039',
  },
  {
    id: '6', date: '2024-06-06', time: '10:00', eventType: 'ENTITY_CREATED', title: 'New entity: Meridian Corp registered',
    description: 'Offshore company identified in cross-border financial flow analysis.', severity: 'MEDIUM', investigationCode: 'INV-2024-039',
  },
]

const EVENT_TYPE_STYLES: Record<string, string> = {
  ENTITY_LINKED: 'text-blue-400 bg-blue-950 border-blue-900',
  ENTITY_CREATED: 'text-blue-400 bg-blue-950 border-blue-900',
  EVIDENCE_UPLOADED: 'text-green-400 bg-green-950 border-green-900',
  HYPOTHESIS_UPDATED: 'text-purple-400 bg-purple-950 border-purple-900',
  ALERT_TRIGGERED: 'text-red-400 bg-red-950 border-red-900',
  INVESTIGATION_UPDATED: 'text-yellow-400 bg-yellow-950 border-yellow-900',
}

const SEVERITY_DOT: Record<string, string> = {
  CRITICAL: 'bg-red-500',
  HIGH: 'bg-orange-500',
  MEDIUM: 'bg-yellow-500',
  LOW: 'bg-green-500',
}

const EVENT_TYPES = ['ALL', 'ENTITY_LINKED', 'ENTITY_CREATED', 'EVIDENCE_UPLOADED', 'HYPOTHESIS_UPDATED', 'ALERT_TRIGGERED']

function groupByDate(events: typeof MOCK_EVENTS) {
  const groups: Record<string, typeof MOCK_EVENTS> = {}
  for (const ev of events) {
    const bucket = groups[ev.date] ?? (groups[ev.date] = [])
    bucket.push(ev)
  }
  return groups
}

export function TimelineView() {
  const [typeFilter, setTypeFilter] = useState('ALL')

  const filtered = MOCK_EVENTS.filter((e) => typeFilter === 'ALL' || e.eventType === typeFilter)
  const grouped = groupByDate(filtered)

  return (
    <div className="flex flex-col gap-4">
      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {EVENT_TYPES.map((t) => (
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
            {t === 'ALL' ? 'All Events' : t.replace(/_/g, ' ').charAt(0) + t.replace(/_/g, ' ').slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div className="flex flex-col gap-6">
        {Object.entries(grouped).map(([date, events]) => (
          <div key={date}>
            {/* Date Header */}
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px flex-1 bg-zord-border" />
              <span className="rounded border border-zord-border bg-zord-panel px-3 py-1 text-xs font-medium text-zord-text-muted font-mono">
                {new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
              <div className="h-px flex-1 bg-zord-border" />
            </div>

            {/* Events */}
            <div className="relative ms-4 flex flex-col gap-0">
              {/* Vertical line */}
              <div className="absolute start-0 top-0 bottom-0 w-px bg-zord-border" />

              {events.map((ev) => (
                <div key={ev.id} className="relative ms-6 pb-4 last:pb-0">
                  {/* Dot */}
                  <div className={cn('absolute -start-7 top-2.5 h-2.5 w-2.5 rounded-full ring-2 ring-zord-bg', SEVERITY_DOT[ev.severity])} />

                  <div className="panel p-3 hover:bg-zord-muted/40 transition-colors cursor-default">
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className={cn('rounded border px-1.5 py-0.5 text-[9px] font-medium uppercase', EVENT_TYPE_STYLES[ev.eventType] ?? 'text-zinc-400 bg-zinc-900 border-zinc-800')}>
                          {ev.eventType.replace(/_/g, ' ')}
                        </span>
                        <span className="text-[10px] text-zord-text-dim font-mono">{ev.investigationCode}</span>
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-zord-text-dim shrink-0">
                        <Clock className="h-3 w-3" />
                        {ev.time}
                      </div>
                    </div>
                    <p className="text-sm font-medium text-zord-text mb-0.5">{ev.title}</p>
                    <p className="text-xs text-zord-text-muted">{ev.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="panel py-12 text-center text-sm text-zord-text-muted">No events found</div>
      )}
    </div>
  )
}
