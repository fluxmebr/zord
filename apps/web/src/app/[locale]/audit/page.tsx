'use client'

import { cn } from '@/lib/utils'
import { Shield, Search, Download } from 'lucide-react'
import { useState } from 'react'

const MOCK_LOGS = [
  { id: '1', action: 'investigation.created', resource: 'Investigation', resourceId: 'INV-2024-055', user: 'A. Ben-David', ip: '192.168.1.42', time: '2024-06-09 14:32:01', meta: {} },
  { id: '2', action: 'evidence.uploaded', resource: 'Evidence', resourceId: 'EVD-0231', user: 'D. Cohen', ip: '10.0.0.12', time: '2024-06-09 13:18:44', meta: {} },
  { id: '3', action: 'user.login', resource: 'Session', resourceId: null, user: 'M. Ivanova', ip: '176.32.14.88', time: '2024-06-09 11:05:22', meta: {} },
  { id: '4', action: 'hypothesis.updated', resource: 'Hypothesis', resourceId: 'HYP-051-B', user: 'D. Cohen', ip: '10.0.0.12', time: '2024-06-08 18:44:00', meta: {} },
  { id: '5', action: 'entity.created', resource: 'Entity', resourceId: 'ENT-0089', user: 'R. Silva', ip: '192.168.1.55', time: '2024-06-08 15:20:11', meta: {} },
  { id: '6', action: 'report.exported', resource: 'Report', resourceId: 'RPT-024', user: 'A. Ben-David', ip: '192.168.1.42', time: '2024-06-07 10:00:33', meta: {} },
  { id: '7', action: 'user.login_failed', resource: 'Session', resourceId: null, user: 'unknown', ip: '45.23.188.12', time: '2024-06-07 09:44:15', meta: {} },
  { id: '8', action: 'investigation.archived', resource: 'Investigation', resourceId: 'INV-2024-031', user: 'D. Cohen', ip: '10.0.0.12', time: '2024-06-06 16:08:52', meta: {} },
]

const ACTION_COLOR: Record<string, string> = {
  'investigation.created': 'text-blue-400',
  'investigation.archived': 'text-zinc-400',
  'evidence.uploaded': 'text-green-400',
  'user.login': 'text-green-400',
  'user.login_failed': 'text-red-400',
  'hypothesis.updated': 'text-purple-400',
  'entity.created': 'text-blue-400',
  'report.exported': 'text-yellow-400',
}

export default function AuditPage() {
  const [search, setSearch] = useState('')
  const filtered = MOCK_LOGS.filter(
    (l) => !search || l.action.includes(search) || l.user.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className="flex flex-col gap-3 p-3 sm:gap-4 sm:p-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <h1 className="text-base font-semibold text-zord-text sm:text-lg">Audit Log</h1>
          <p className="text-xs text-zord-text-muted">Immutable record of all system actions</p>
        </div>
        <button className="flex items-center gap-1.5 rounded border border-zord-border bg-zord-panel px-3 py-1.5 text-xs text-zord-text-muted hover:text-zord-text">
          <Download className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Export</span>
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute start-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zord-text-muted" />
        <input
          type="text"
          placeholder="Search by action or user..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input ps-9"
        />
      </div>

      {/* Mobile: cards */}
      <div className="flex flex-col gap-2 md:hidden">
        {filtered.map((log) => (
          <div key={log.id} className="panel p-3">
            <div className="flex items-start justify-between gap-2">
              <span className={cn('font-mono text-xs font-medium', ACTION_COLOR[log.action] ?? 'text-zord-text-muted')}>
                {log.action}
              </span>
              <span className="text-[10px] text-zord-text-dim">{log.time.split(' ')[1]}</span>
            </div>
            <div className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5 text-[10px] text-zord-text-muted">
              <span>{log.user}</span>
              {log.resourceId && <span className="font-mono">{log.resourceId}</span>}
              <span>{log.ip}</span>
            </div>
            <div className="mt-0.5 text-[9px] text-zord-text-dim">{log.time.split(' ')[0]}</div>
          </div>
        ))}
      </div>

      {/* Desktop: table */}
      <div className="panel hidden overflow-x-auto md:block">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zord-border">
              {['Time', 'Action', 'Resource', 'User', 'IP Address'].map((h) => (
                <th key={h} className="px-4 py-2.5 text-left text-[10px] font-medium uppercase tracking-wider text-zord-text-muted">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-zord-border">
            {filtered.map((log) => (
              <tr key={log.id} className="hover:bg-zord-muted/40">
                <td className="px-4 py-2.5 font-mono text-xs text-zord-text-muted whitespace-nowrap">{log.time}</td>
                <td className="px-4 py-2.5">
                  <span className={cn('font-mono text-xs', ACTION_COLOR[log.action] ?? 'text-zord-text-muted')}>{log.action}</span>
                </td>
                <td className="px-4 py-2.5 font-mono text-xs text-zord-text-muted">{log.resourceId ?? '—'}</td>
                <td className="px-4 py-2.5 text-sm text-zord-text">{log.user}</td>
                <td className="px-4 py-2.5 font-mono text-xs text-zord-text-muted">{log.ip}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-[10px] text-zord-text-dim text-center">
        <Shield className="inline h-3 w-3 me-1" />
        Audit logs are immutable and cannot be modified or deleted.
      </p>
    </div>
  )
}
