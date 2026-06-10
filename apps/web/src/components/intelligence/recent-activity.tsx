'use client'

import { cn } from '@/lib/utils'
import { FileText, Users, Search, Brain, Target, ChevronRight } from 'lucide-react'

const ACTIVITY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  evidence: FileText,
  entity: Users,
  investigation: Search,
  hypothesis: Brain,
  operation: Target,
}

const MOCK_ACTIVITY = [
  { id: '1', type: 'evidence', text: 'D. Cohen uploaded 3 documents to INV-2024-047', time: '8m ago' },
  { id: '2', type: 'entity', text: 'New entity PERSON linked — Titan Holdings network', time: '15m ago' },
  { id: '3', type: 'hypothesis', text: 'Hypothesis H-039-A updated with 2 new supporting evidences', time: '42m ago' },
  { id: '4', type: 'investigation', text: 'M. Ivanova created investigation INV-2024-055', time: '1h ago' },
  { id: '5', type: 'entity', text: '12 entities merged — duplicate detection', time: '2h ago' },
  { id: '6', type: 'evidence', text: 'OCR processing completed — 8 PDFs indexed', time: '3h ago' },
  { id: '7', type: 'operation', text: 'Task "Domain Analysis" marked complete', time: '4h ago' },
]

export function RecentActivity() {
  return (
    <div className="panel">
      <div className="panel-header">
        <span className="text-sm font-medium text-zord-text">Recent Activity</span>
        <button className="flex items-center gap-1 text-xs text-zord-accent hover:underline">
          Audit log <ChevronRight className="h-3 w-3" />
        </button>
      </div>

      <div className="divide-y divide-zord-border">
        {MOCK_ACTIVITY.map((item) => {
          const Icon = ACTIVITY_ICONS[item.type] ?? FileText
          return (
            <div key={item.id} className="flex items-start gap-3 px-4 py-2.5">
              <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded bg-zord-muted">
                <Icon className="h-3 w-3 text-zord-text-muted" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs leading-relaxed text-zord-text-muted">{item.text}</p>
                <span className="text-[10px] text-zord-text-dim">{item.time}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
