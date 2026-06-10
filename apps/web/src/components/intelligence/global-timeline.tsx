'use client'

import { cn } from '@/lib/utils'
import { ChevronRight } from 'lucide-react'

const MOCK_TIMELINE = [
  { id: '1', date: 'Jun 9, 2024', time: '14:32', event: 'Entity relationship confirmed — INV-047', type: 'entity' },
  { id: '2', date: 'Jun 9, 2024', time: '13:18', event: 'Financial transaction traced — INV-039', type: 'evidence' },
  { id: '3', date: 'Jun 9, 2024', time: '11:05', event: 'New DOMAIN entity discovered — INV-051', type: 'entity' },
  { id: '4', date: 'Jun 8, 2024', time: '18:44', event: 'Hypothesis H-039-B refuted by evidence', type: 'hypothesis' },
  { id: '5', date: 'Jun 8, 2024', time: '15:20', event: 'Corporate registry data collected', type: 'evidence' },
  { id: '6', date: 'Jun 7, 2024', time: '10:00', event: 'INV-2024-055 investigation opened', type: 'investigation' },
]

const TYPE_COLOR: Record<string, string> = {
  entity: 'bg-blue-500',
  evidence: 'bg-green-500',
  hypothesis: 'bg-purple-500',
  investigation: 'bg-zord-accent',
  alert: 'bg-red-500',
}

let lastDate = ''

export function GlobalTimeline() {
  lastDate = ''
  return (
    <div className="panel">
      <div className="panel-header">
        <span className="text-sm font-medium text-zord-text">Global Timeline</span>
        <button className="flex items-center gap-1 text-xs text-zord-accent hover:underline">
          Full timeline <ChevronRight className="h-3 w-3" />
        </button>
      </div>

      <div className="px-4 py-3">
        <div className="relative space-y-0">
          {MOCK_TIMELINE.map((item, idx) => {
            const showDate = item.date !== lastDate
            if (showDate) lastDate = item.date

            return (
              <div key={item.id}>
                {showDate && (
                  <div className="py-2 ps-8 text-[10px] uppercase tracking-widest text-zord-text-dim">
                    {item.date}
                  </div>
                )}
                <div className="relative flex gap-4 pb-4">
                  {/* Line */}
                  {idx < MOCK_TIMELINE.length - 1 && (
                    <div className="absolute start-2 top-5 bottom-0 w-px bg-zord-border" />
                  )}
                  {/* Dot */}
                  <div className={cn('mt-1.5 h-2 w-2 shrink-0 rounded-full ring-2 ring-zord-bg', TYPE_COLOR[item.type] ?? 'bg-zinc-500')} />
                  <div className="flex-1">
                    <p className="text-xs text-zord-text">{item.event}</p>
                    <span className="font-mono text-[10px] text-zord-text-dim">{item.time}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
