'use client'

import { useCallback, useState } from 'react'
import { cn } from '@/lib/utils'
import { ZoomIn, ZoomOut, Maximize2, RefreshCw } from 'lucide-react'

// Lightweight canvas-free graph visualization (no ReactFlow dependency needed since it's not installed)
// Falls back to SVG-based rendering for the mock

const MOCK_NODES = [
  { id: '1', type: 'PERSON', label: 'Viktor Malkov', x: 300, y: 200, trustScore: 82 },
  { id: '2', type: 'COMPANY', label: 'Titan Holdings', x: 500, y: 120, trustScore: 71 },
  { id: '3', type: 'DOMAIN', label: 'titan-offshore.io', x: 600, y: 280, trustScore: 55 },
  { id: '4', type: 'COMPANY', label: 'Meridian Ltd.', x: 150, y: 320, trustScore: 68 },
  { id: '5', type: 'EMAIL', label: 'v.malkov@proton.me', x: 200, y: 100, trustScore: 90 },
  { id: '6', type: 'ADDRESS', label: '14 Bosphorus Quay', x: 450, y: 370, trustScore: 63 },
]

const MOCK_EDGES = [
  { id: 'e1', source: '1', target: '2', type: 'ADMINISTRATOR' },
  { id: 'e2', source: '2', target: '3', type: 'LINKED' },
  { id: 'e3', source: '1', target: '4', type: 'OWNER' },
  { id: 'e4', source: '1', target: '5', type: 'CONTACT' },
  { id: 'e5', source: '2', target: '6', type: 'ADDRESS' },
]

const NODE_COLORS: Record<string, string> = {
  PERSON: '#3b82f6',
  COMPANY: '#a855f7',
  DOMAIN: '#06b6d4',
  EMAIL: '#22c55e',
  ADDRESS: '#eab308',
  PHONE: '#f97316',
}

function getNodeCenter(node: typeof MOCK_NODES[0]) {
  return { cx: node.x, cy: node.y }
}

export function KnowledgeGraph() {
  const [scale, setScale] = useState(1)
  const [selected, setSelected] = useState<string | null>(null)

  const handleZoomIn = () => setScale((s) => Math.min(s + 0.2, 2))
  const handleZoomOut = () => setScale((s) => Math.max(s - 0.2, 0.4))
  const handleFit = () => setScale(1)

  return (
    <div className="panel flex flex-col gap-0 overflow-hidden" style={{ height: '600px' }}>
      {/* Header */}
      <div className="panel-header flex items-center justify-between px-4 py-2.5">
        <div>
          <span className="text-sm font-medium text-zord-text">Knowledge Graph</span>
          <span className="ms-2 text-xs text-zord-text-muted">{MOCK_NODES.length} nodes · {MOCK_EDGES.length} edges</span>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={handleZoomOut} className="rounded p-1.5 hover:bg-zord-muted" title="Zoom out">
            <ZoomOut className="h-4 w-4 text-zord-text-muted" />
          </button>
          <span className="w-12 text-center text-xs text-zord-text-muted font-mono">{Math.round(scale * 100)}%</span>
          <button onClick={handleZoomIn} className="rounded p-1.5 hover:bg-zord-muted" title="Zoom in">
            <ZoomIn className="h-4 w-4 text-zord-text-muted" />
          </button>
          <button onClick={handleFit} className="rounded p-1.5 hover:bg-zord-muted" title="Fit">
            <Maximize2 className="h-4 w-4 text-zord-text-muted" />
          </button>
          <button className="rounded p-1.5 hover:bg-zord-muted" title="Refresh">
            <RefreshCw className="h-4 w-4 text-zord-text-muted" />
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-3 border-b border-zord-border px-4 py-1.5">
        {Object.entries(NODE_COLORS).map(([type, color]) => (
          <div key={type} className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} />
            <span className="text-[10px] text-zord-text-muted">{type.charAt(0) + type.slice(1).toLowerCase()}</span>
          </div>
        ))}
      </div>

      {/* SVG Canvas */}
      <div className="relative flex-1 overflow-hidden bg-zord-bg">
        <svg
          className="absolute inset-0 w-full h-full"
          style={{ background: 'radial-gradient(circle at 50% 50%, #0f1117 0%, #070a0f 100%)' }}
        >
          {/* Grid */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1a2234" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          <g transform={`scale(${scale}) translate(50, 20)`}>
            {/* Edges */}
            {MOCK_EDGES.map((edge) => {
              const src = MOCK_NODES.find((n) => n.id === edge.source)
              const tgt = MOCK_NODES.find((n) => n.id === edge.target)
              if (!src || !tgt) return null
              const mx = (src.x + tgt.x) / 2
              const my = (src.y + tgt.y) / 2
              return (
                <g key={edge.id}>
                  <line
                    x1={src.x} y1={src.y} x2={tgt.x} y2={tgt.y}
                    stroke="#2a3a5c" strokeWidth="1.5"
                    strokeDasharray="4 2"
                  />
                  <text x={mx} y={my - 4} textAnchor="middle" fill="#4a6080" fontSize="9" fontFamily="monospace">
                    {edge.type}
                  </text>
                </g>
              )
            })}

            {/* Nodes */}
            {MOCK_NODES.map((node) => {
              const color = NODE_COLORS[node.type] ?? '#888'
              const isSelected = selected === node.id
              return (
                <g
                  key={node.id}
                  transform={`translate(${node.x}, ${node.y})`}
                  onClick={() => setSelected(isSelected ? null : node.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <circle
                    r={isSelected ? 24 : 20}
                    fill={color + '22'}
                    stroke={color}
                    strokeWidth={isSelected ? 2.5 : 1.5}
                  />
                  {isSelected && (
                    <circle r={28} fill="none" stroke={color} strokeWidth="0.5" opacity="0.5" />
                  )}
                  <text
                    textAnchor="middle" dominantBaseline="central"
                    fill={color} fontSize="10" fontWeight="bold" fontFamily="monospace"
                  >
                    {node.type.charAt(0)}
                  </text>
                  <text
                    y={28} textAnchor="middle" fill="#c0cce0" fontSize="10" fontFamily="sans-serif"
                  >
                    {node.label.length > 16 ? node.label.slice(0, 14) + '…' : node.label}
                  </text>
                  <text y={40} textAnchor="middle" fill="#4a6080" fontSize="8" fontFamily="monospace">
                    T:{node.trustScore}
                  </text>
                </g>
              )
            })}
          </g>
        </svg>

        {/* Selected node details panel */}
        {selected && (() => {
          const node = MOCK_NODES.find((n) => n.id === selected)
          if (!node) return null
          const color = NODE_COLORS[node.type] ?? '#888'
          return (
            <div className="absolute bottom-4 start-4 rounded border border-zord-border bg-zord-panel/95 p-3 backdrop-blur-sm w-56">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} />
                <span className="text-xs font-medium text-zord-text">{node.label}</span>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-xs">
                  <span className="text-zord-text-muted">Type</span>
                  <span className="text-zord-text">{node.type}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-zord-text-muted">Trust Score</span>
                  <span className="font-mono text-zord-text">{node.trustScore}</span>
                </div>
              </div>
            </div>
          )
        })()}
      </div>
    </div>
  )
}
