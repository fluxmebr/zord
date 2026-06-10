'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Plus, CheckCircle, XCircle, AlertTriangle, TrendingUp } from 'lucide-react'

const MOCK_HYPOTHESES = [
  {
    id: '1',
    title: 'Viktor Malkov is the beneficial owner of Titan Holdings',
    description: 'Evidence suggests a complex layered ownership structure ultimately controlled by Malkov.',
    status: 'ACTIVE',
    trustScore: 87,
    supporting: 12,
    contradicting: 2,
    entities: 5,
    gaps: ['Missing beneficial ownership declaration', 'Unconfirmed nominee director identity'],
  },
  {
    id: '2',
    title: 'Shell company network used for cross-border fund routing',
    description: 'At least 4 offshore entities may be functioning as conduits for financial flows.',
    status: 'VALIDATED',
    trustScore: 92,
    supporting: 19,
    contradicting: 1,
    entities: 8,
    gaps: [],
  },
  {
    id: '3',
    title: 'Domain infrastructure operated from Moscow data center',
    description: 'Digital forensics suggest hosting patterns consistent with known Russian infrastructure.',
    status: 'ACTIVE',
    trustScore: 61,
    supporting: 6,
    contradicting: 4,
    entities: 3,
    gaps: ['Hosting company response pending', 'No independent technical confirmation'],
  },
  {
    id: '4',
    title: 'Target entities connected to sanctioned individuals',
    description: 'Preliminary analysis of counterparty data reveals overlapping network with sanctioned entities.',
    status: 'DRAFT',
    trustScore: 43,
    supporting: 3,
    contradicting: 0,
    entities: 2,
    gaps: ['Requires OFAC cross-reference', 'Counterparty documentation incomplete', 'Legal review pending'],
  },
]

const STATUS_CONFIG: Record<string, { label: string; color: string }> = {
  DRAFT: { label: 'Draft', color: 'text-zinc-400 bg-zinc-900 border-zinc-800' },
  ACTIVE: { label: 'Active', color: 'text-blue-400 bg-blue-950 border-blue-900' },
  VALIDATED: { label: 'Validated', color: 'text-green-400 bg-green-950 border-green-900' },
  REFUTED: { label: 'Refuted', color: 'text-red-400 bg-red-950 border-red-900' },
  SUSPENDED: { label: 'Suspended', color: 'text-yellow-400 bg-yellow-950 border-yellow-900' },
}

function TrustMeter({ score }: { score: number }) {
  const color =
    score >= 80 ? 'bg-green-500' :
    score >= 60 ? 'bg-yellow-500' :
    score >= 40 ? 'bg-orange-500' : 'bg-red-500'

  const label =
    score >= 80 ? 'HIGH' :
    score >= 60 ? 'MEDIUM' :
    score >= 40 ? 'LOW' : 'VERY LOW'

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between text-xs">
        <span className="text-zord-text-muted">Confidence</span>
        <span className={cn('font-mono font-medium', color.replace('bg-', 'text-'))}>{score} — {label}</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-zord-border">
        <div className={cn('h-full rounded-full transition-all', color)} style={{ width: `${score}%` }} />
      </div>
    </div>
  )
}

export function HypothesisEngine() {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-4 text-xs text-zord-text-muted">
          <span>{MOCK_HYPOTHESES.filter((h) => h.status === 'ACTIVE').length} active</span>
          <span>{MOCK_HYPOTHESES.filter((h) => h.status === 'VALIDATED').length} validated</span>
          <span>{MOCK_HYPOTHESES.filter((h) => h.status === 'DRAFT').length} draft</span>
        </div>
        <button className="flex items-center gap-1.5 rounded bg-zord-accent px-3 py-1.5 text-xs font-medium text-white hover:bg-zord-accent-dim">
          <Plus className="h-3.5 w-3.5" />
          New Hypothesis
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {MOCK_HYPOTHESES.map((hyp) => {
          const status = STATUS_CONFIG[hyp.status] ?? { label: hyp.status, color: 'border-zord-border text-zord-text-muted' }
          return (
            <div
              key={hyp.id}
              onClick={() => setSelected(selected === hyp.id ? null : hyp.id)}
              className={cn(
                'panel cursor-pointer p-4 transition-colors hover:bg-zord-muted/40',
                selected === hyp.id && 'border-zord-accent',
              )}
            >
              <div className="flex items-start justify-between gap-2 mb-3">
                <h3 className="text-sm font-medium text-zord-text leading-snug">{hyp.title}</h3>
                <span className={cn('shrink-0 rounded border px-1.5 py-0.5 text-[9px] font-medium uppercase', status.color)}>
                  {status.label}
                </span>
              </div>

              <p className="mb-3 text-xs text-zord-text-muted">{hyp.description}</p>

              <TrustMeter score={hyp.trustScore} />

              <div className="mt-3 flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1 text-green-400">
                  <CheckCircle className="h-3.5 w-3.5" />
                  <span>{hyp.supporting} supporting</span>
                </div>
                <div className="flex items-center gap-1 text-red-400">
                  <XCircle className="h-3.5 w-3.5" />
                  <span>{hyp.contradicting} contradicting</span>
                </div>
                <div className="flex items-center gap-1 text-zord-text-muted">
                  <TrendingUp className="h-3.5 w-3.5" />
                  <span>{hyp.entities} entities</span>
                </div>
              </div>

              {hyp.gaps.length > 0 && (
                <div className="mt-3 rounded border border-red-900 bg-red-950/40 p-2">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <AlertTriangle className="h-3.5 w-3.5 text-red-400" />
                    <span className="text-[10px] font-medium uppercase tracking-wide text-red-400">
                      {hyp.gaps.length} gap{hyp.gaps.length > 1 ? 's' : ''} detected
                    </span>
                  </div>
                  <ul className="flex flex-col gap-0.5">
                    {hyp.gaps.map((g, i) => (
                      <li key={i} className="text-[10px] text-red-300 before:me-1.5 before:content-['›']">{g}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
