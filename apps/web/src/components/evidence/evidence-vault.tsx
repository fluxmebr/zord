'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Search, Upload, FileText, Image, Video, File, Eye, Shield, Clock, Hash, CheckCircle, Loader } from 'lucide-react'

const MOCK_EVIDENCE = [
  {
    id: '1', filename: 'titan_financials_q4_2023.pdf', type: 'PDF', status: 'READY',
    hash: 'a3f2e1b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2',
    sizeBytes: 2_400_000, uploadedBy: 'D. Cohen', investigationCode: 'INV-2024-047',
    description: 'Q4 2023 financial statements for Titan Holdings Ltd.', tags: ['financial', 'official'],
    ocrStatus: 'COMPLETE', createdAt: '2024-06-09T09:15:00Z',
  },
  {
    id: '2', filename: 'surveillance_frame_0047.jpg', type: 'IMAGE', status: 'READY',
    hash: 'b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5',
    sizeBytes: 890_000, uploadedBy: 'M. Ivanova', investigationCode: 'INV-2024-047',
    description: 'CCTV frame — subject identified near Bosphorus Quay.', tags: ['surveillance', 'visual'],
    ocrStatus: 'N/A', createdAt: '2024-06-08T14:22:00Z',
  },
  {
    id: '3', filename: 'corporate_register_extract.pdf', type: 'PDF', status: 'READY',
    hash: 'c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6',
    sizeBytes: 1_100_000, uploadedBy: 'R. Silva', investigationCode: 'INV-2024-051',
    description: 'Official corporate registry extract - Cayman Islands.', tags: ['corporate', 'official'],
    ocrStatus: 'COMPLETE', createdAt: '2024-06-07T11:00:00Z',
  },
  {
    id: '4', filename: 'phone_records_extract.xlsx', type: 'SPREADSHEET', status: 'PROCESSING',
    hash: 'd6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7',
    sizeBytes: 340_000, uploadedBy: 'A. Ben-David', investigationCode: 'INV-2024-039',
    description: 'Extracted phone records for target numbers.', tags: ['comms', 'financial'],
    ocrStatus: 'PROCESSING', createdAt: '2024-06-06T16:45:00Z',
  },
]

const TYPE_ICONS: Record<string, React.ReactNode> = {
  PDF: <FileText className="h-5 w-5 text-red-400" />,
  IMAGE: <Image className="h-5 w-5 text-blue-400" />,
  VIDEO: <Video className="h-5 w-5 text-purple-400" />,
  SPREADSHEET: <FileText className="h-5 w-5 text-green-400" />,
  DOCUMENT: <FileText className="h-5 w-5 text-yellow-400" />,
}

const STATUS_STYLES: Record<string, string> = {
  READY: 'text-green-400',
  PROCESSING: 'text-yellow-400',
  FAILED: 'text-red-400',
  UPLOADING: 'text-blue-400',
  ARCHIVED: 'text-zinc-400',
}

function formatSize(bytes: number) {
  if (bytes > 1_000_000) return `${(bytes / 1_000_000).toFixed(1)} MB`
  return `${(bytes / 1_000).toFixed(0)} KB`
}

function shortHash(hash: string) {
  return hash.slice(0, 8) + '…' + hash.slice(-8)
}

export function EvidenceVault() {
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<string | null>(null)

  const filtered = MOCK_EVIDENCE.filter((e) =>
    !search || e.filename.toLowerCase().includes(search.toLowerCase()) || e.description.toLowerCase().includes(search.toLowerCase())
  )

  const selectedEvidence = MOCK_EVIDENCE.find((e) => e.id === selected)

  return (
    <div className="flex flex-col gap-4 lg:flex-row">
      {/* Main grid */}
      <div className="flex flex-1 flex-col gap-4 min-w-0">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute start-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zord-text-muted" />
            <input
              type="text"
              placeholder="Search evidence..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded border border-zord-border bg-zord-panel ps-9 py-2 text-sm text-zord-text placeholder:text-zord-text-dim focus:border-zord-accent focus:outline-none"
            />
          </div>
          <button className="flex items-center gap-1.5 rounded bg-zord-accent px-3 py-1.5 text-xs font-medium text-white hover:bg-zord-accent-dim">
            <Upload className="h-3.5 w-3.5" />
            Upload
          </button>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((ev) => (
            <div
              key={ev.id}
              onClick={() => setSelected(selected === ev.id ? null : ev.id)}
              className={cn(
                'panel cursor-pointer p-4 transition-colors hover:bg-zord-muted/40',
                selected === ev.id && 'border-zord-accent',
              )}
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-zord-muted">
                  {TYPE_ICONS[ev.type] ?? <File className="h-5 w-5 text-zinc-400" />}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-zord-text">{ev.filename}</p>
                  <p className="text-[10px] text-zord-text-muted">{formatSize(ev.sizeBytes)}</p>
                </div>
              </div>

              <p className="mb-3 text-xs text-zord-text-muted line-clamp-2">{ev.description}</p>

              <div className="flex items-center gap-1.5 mb-2">
                {ev.tags.map((t) => (
                  <span key={t} className="rounded bg-zord-muted px-1.5 py-0.5 text-[10px] text-zord-text-dim">{t}</span>
                ))}
              </div>

              {/* Hash */}
              <div className="flex items-center gap-1.5 rounded bg-zord-muted px-2 py-1 mb-2">
                <Hash className="h-3 w-3 text-zord-text-dim shrink-0" />
                <span className="font-mono text-[10px] text-zord-text-muted truncate">{shortHash(ev.hash)}</span>
              </div>

              <div className="flex items-center justify-between text-[10px]">
                <span className={cn('flex items-center gap-1', STATUS_STYLES[ev.status])}>
                  {ev.status === 'PROCESSING'
                    ? <Loader className="h-3 w-3 animate-spin" />
                    : <CheckCircle className="h-3 w-3" />}
                  {ev.status}
                </span>
                <span className="text-zord-text-dim font-mono">{ev.investigationCode}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail panel */}
      {selectedEvidence && (
        <div className="panel w-full shrink-0 p-4 lg:w-72">
          <div className="panel-header mb-4 flex items-center gap-2 pb-3">
            <Shield className="h-4 w-4 text-zord-accent" />
            <span className="text-sm font-medium text-zord-text">Chain of Custody</span>
          </div>

          <div className="flex flex-col gap-3 text-xs">
            <div>
              <span className="text-zord-text-muted">Filename</span>
              <p className="text-zord-text font-medium mt-0.5 break-all">{selectedEvidence.filename}</p>
            </div>
            <div>
              <span className="text-zord-text-muted">SHA-256</span>
              <p className="font-mono text-[10px] text-zord-text mt-0.5 break-all">{selectedEvidence.hash}</p>
            </div>
            <div>
              <span className="text-zord-text-muted">OCR Status</span>
              <p className="text-zord-text mt-0.5">{selectedEvidence.ocrStatus}</p>
            </div>
            <div>
              <span className="text-zord-text-muted">Uploaded By</span>
              <p className="text-zord-text mt-0.5">{selectedEvidence.uploadedBy}</p>
            </div>

            {/* Custody timeline */}
            <div className="border-t border-zord-border pt-3">
              <span className="text-zord-text-muted">Custody Log</span>
              <div className="relative ms-2 mt-2 flex flex-col gap-0">
                <div className="absolute start-0 top-0 bottom-0 w-px bg-zord-border" />
                {[
                  { action: 'UPLOADED', user: selectedEvidence.uploadedBy, time: '09:15' },
                  { action: 'OCR_PROCESSED', user: 'System', time: '09:16' },
                  { action: 'REVIEWED', user: 'M. Ivanova', time: '11:00' },
                ].map((entry, i) => (
                  <div key={i} className="relative ms-4 pb-3 last:pb-0">
                    <div className="absolute -start-5 top-1.5 h-2 w-2 rounded-full bg-zord-accent ring-2 ring-zord-bg" />
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[10px] font-medium text-zord-text uppercase tracking-wide">{entry.action}</span>
                      <span className="text-[10px] text-zord-text-muted">{entry.user} · {entry.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
