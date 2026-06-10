'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { FileText, Download, Loader, CheckCircle, Clock, Plus } from 'lucide-react'

const REPORT_TYPES = [
  { value: 'EXECUTIVE', label: 'Executive Summary', desc: 'High-level overview for leadership' },
  { value: 'TECHNICAL', label: 'Technical Report', desc: 'Full technical details and methodology' },
  { value: 'PARTIAL', label: 'Partial Report', desc: 'Progress update on specific aspects' },
  { value: 'FINAL', label: 'Final Report', desc: 'Comprehensive closing report' },
  { value: 'INTELLIGENCE_SUMMARY', label: 'Intelligence Summary', desc: 'AI-generated intelligence brief' },
]

const MOCK_REPORTS = [
  {
    id: '1', type: 'EXECUTIVE', title: 'Executive Summary — Nightfall Q2 2024', status: 'READY',
    investigation: 'INV-2024-047', generatedAt: '2024-06-08T14:00:00Z', pages: 12,
  },
  {
    id: '2', type: 'INTELLIGENCE_SUMMARY', title: 'Intelligence Brief — Entity Network', status: 'READY',
    investigation: 'INV-2024-047', generatedAt: '2024-06-07T10:30:00Z', pages: 8,
  },
  {
    id: '3', type: 'TECHNICAL', title: 'Technical Report — Corporate Structure', status: 'GENERATING',
    investigation: 'INV-2024-051', generatedAt: '2024-06-09T09:00:00Z', pages: null,
  },
  {
    id: '4', type: 'PARTIAL', title: 'Partial Report — Financial Flows Phase 1', status: 'READY',
    investigation: 'INV-2024-039', generatedAt: '2024-06-05T16:00:00Z', pages: 22,
  },
]

const TYPE_COLORS: Record<string, string> = {
  EXECUTIVE: 'text-blue-400 bg-blue-950 border-blue-900',
  TECHNICAL: 'text-purple-400 bg-purple-950 border-purple-900',
  PARTIAL: 'text-yellow-400 bg-yellow-950 border-yellow-900',
  FINAL: 'text-green-400 bg-green-950 border-green-900',
  INTELLIGENCE_SUMMARY: 'text-cyan-400 bg-cyan-950 border-cyan-900',
}

const MOCK_INVESTIGATIONS = [
  { id: 'inv1', code: 'INV-2024-047', name: 'Operation Nightfall' },
  { id: 'inv2', code: 'INV-2024-051', name: 'Titan Holdings Analysis' },
  { id: 'inv3', code: 'INV-2024-039', name: 'Financial Network' },
]

export function ReportGenerator() {
  const [selectedType, setSelectedType] = useState('')
  const [selectedInv, setSelectedInv] = useState('')
  const [title, setTitle] = useState('')
  const [generating, setGenerating] = useState(false)

  const handleGenerate = async () => {
    if (!selectedType || !selectedInv || !title) return
    setGenerating(true)
    await new Promise((r) => setTimeout(r, 2000))
    setGenerating(false)
    setSelectedType('')
    setSelectedInv('')
    setTitle('')
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Generator form */}
      <div className="panel p-4">
        <div className="panel-header mb-4 pb-3 flex items-center gap-2">
          <Plus className="h-4 w-4 text-zord-accent" />
          <span className="text-sm font-medium text-zord-text">Generate New Report</span>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Type selection */}
          <div>
            <label className="mb-2 block text-xs font-medium text-zord-text-muted uppercase tracking-wide">Report Type</label>
            <div className="flex flex-col gap-2">
              {REPORT_TYPES.map((t) => (
                <label key={t.value} className={cn(
                  'flex cursor-pointer items-start gap-3 rounded border p-3 transition-colors',
                  selectedType === t.value
                    ? 'border-zord-accent bg-zord-accent/10'
                    : 'border-zord-border bg-zord-muted/20 hover:bg-zord-muted/40',
                )}>
                  <input
                    type="radio"
                    name="reportType"
                    value={t.value}
                    checked={selectedType === t.value}
                    onChange={() => setSelectedType(t.value)}
                    className="mt-0.5"
                  />
                  <div>
                    <p className="text-xs font-medium text-zord-text">{t.label}</p>
                    <p className="text-[10px] text-zord-text-muted">{t.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col gap-4">
            <div>
              <label className="mb-2 block text-xs font-medium text-zord-text-muted uppercase tracking-wide">Investigation</label>
              <select
                value={selectedInv}
                onChange={(e) => setSelectedInv(e.target.value)}
                className="w-full rounded border border-zord-border bg-zord-panel px-3 py-2 text-sm text-zord-text focus:border-zord-accent focus:outline-none"
              >
                <option value="">Select investigation...</option>
                {MOCK_INVESTIGATIONS.map((inv) => (
                  <option key={inv.id} value={inv.id}>{inv.code} — {inv.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-xs font-medium text-zord-text-muted uppercase tracking-wide">Report Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter report title..."
                className="w-full rounded border border-zord-border bg-zord-panel px-3 py-2 text-sm text-zord-text placeholder:text-zord-text-dim focus:border-zord-accent focus:outline-none"
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={!selectedType || !selectedInv || !title || generating}
              className="mt-auto flex items-center justify-center gap-2 rounded bg-zord-accent px-4 py-2.5 text-sm font-medium text-white disabled:opacity-40 hover:bg-zord-accent-dim transition-colors"
            >
              {generating
                ? <><Loader className="h-4 w-4 animate-spin" /> Generating...</>
                : <><FileText className="h-4 w-4" /> Generate Report</>}
            </button>
          </div>
        </div>
      </div>

      {/* Reports list */}
      <div>
        <h2 className="mb-3 text-sm font-medium text-zord-text-muted uppercase tracking-wide">Generated Reports</h2>

        {/* Mobile: cards */}
        <div className="flex flex-col gap-2 md:hidden">
          {MOCK_REPORTS.map((r) => (
            <div key={r.id} className="panel p-3">
              <div className="mb-1.5 flex flex-wrap items-center gap-1.5">
                <span className={cn('rounded border px-1.5 py-0.5 text-[9px] font-medium uppercase', TYPE_COLORS[r.type])}>
                  {r.type.replace(/_/g, ' ')}
                </span>
                <span className={cn('flex items-center gap-1 text-[10px]', r.status === 'READY' ? 'text-green-400' : 'text-yellow-400')}>
                  {r.status === 'READY' ? <CheckCircle className="h-3 w-3" /> : <Loader className="h-3 w-3 animate-spin" />}
                  {r.status}
                </span>
                <span className="ms-auto font-mono text-[10px] text-zord-text-dim">{r.investigation}</span>
              </div>
              <p className="text-sm font-medium text-zord-text">{r.title}</p>
              <div className="mt-1.5 flex items-center gap-3 text-[10px] text-zord-text-dim">
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{new Date(r.generatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                {r.pages && <span>{r.pages} pages</span>}
                {r.status === 'READY' && (
                  <button className="ms-auto flex items-center gap-1 rounded border border-zord-border px-2 py-1 text-[10px] text-zord-text-muted hover:text-zord-text">
                    <Download className="h-3 w-3" /> Export
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: table */}
        <div className="panel hidden overflow-hidden md:block">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zord-border">
                {['Type', 'Title', 'Investigation', 'Status', 'Pages', 'Generated', ''].map((h) => (
                  <th key={h} className="px-4 py-2.5 text-left text-[10px] font-medium uppercase tracking-wider text-zord-text-muted">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-zord-border">
              {MOCK_REPORTS.map((r) => (
                <tr key={r.id} className="group hover:bg-zord-muted/40 transition-colors">
                  <td className="px-4 py-3">
                    <span className={cn('rounded border px-1.5 py-0.5 text-[9px] font-medium uppercase', TYPE_COLORS[r.type])}>
                      {r.type.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="max-w-xs px-4 py-3">
                    <span className="text-sm font-medium text-zord-text">{r.title}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-mono text-xs text-zord-text-muted">{r.investigation}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn('flex items-center gap-1 text-xs',
                      r.status === 'READY' ? 'text-green-400' : 'text-yellow-400'
                    )}>
                      {r.status === 'READY'
                        ? <CheckCircle className="h-3.5 w-3.5" />
                        : <Loader className="h-3.5 w-3.5 animate-spin" />}
                      {r.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-zord-text">{r.pages ?? '—'}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 text-xs text-zord-text-dim">
                      <Clock className="h-3 w-3" />
                      {new Date(r.generatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {r.status === 'READY' && (
                      <button className="flex items-center gap-1 rounded border border-zord-border px-2 py-1 text-xs text-zord-text-muted hover:text-zord-text opacity-0 group-hover:opacity-100 transition-opacity">
                        <Download className="h-3.5 w-3.5" />
                        Export
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
