'use client'

import { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { Send, Bot, User, AlertCircle, CheckCircle, Loader, Sparkles, Zap } from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  confidence?: number
  sources?: string[]
  entities?: string[]
  loading?: boolean
}

const MOCK_RESPONSES: Record<string, Omit<Message, 'id' | 'role'>> = {
  default: {
    content: `Based on available intelligence data for this investigation, I can identify several key patterns:\n\n**Entity Network:** Viktor Malkov appears as a central node with direct connections to 3 corporate entities. The ownership chain passes through at least 2 offshore jurisdictions (Cayman Islands, BVI).\n\n**Financial Flows:** Cross-border transactions totaling approximately $4.2M were identified between Q1-Q3 2023, routed through intermediary accounts in Cyprus.\n\n**Temporal Pattern:** Activity spikes correlate with quarterly reporting periods, suggesting coordinated timing of fund movements.\n\n**Recommended Actions:** Cross-reference entity network with OFAC database; obtain banking records for identified intermediaries.`,
    confidence: 78,
    sources: ['Corporate Registry (Cayman Islands)', 'Financial Intelligence Unit', 'OSINT Database'],
    entities: ['Viktor Malkov', 'Titan Holdings Ltd.', 'Meridian Corp'],
  },
}

function ConfidenceBadge({ score }: { score: number }) {
  const color = score >= 80 ? 'text-green-400 bg-green-950 border-green-900'
    : score >= 60 ? 'text-yellow-400 bg-yellow-950 border-yellow-900'
    : 'text-red-400 bg-red-950 border-red-900'
  const label = score >= 80 ? 'HIGH' : score >= 60 ? 'MEDIUM' : 'LOW'
  return (
    <span className={cn('rounded border px-2 py-0.5 text-[9px] font-medium uppercase', color)}>
      {label} CONFIDENCE · {score}%
    </span>
  )
}

function MessageBubble({ msg }: { msg: Message }) {
  const isUser = msg.role === 'user'
  return (
    <div className={cn('flex gap-3', isUser && 'flex-row-reverse')}>
      <div className={cn(
        'flex h-7 w-7 shrink-0 items-center justify-center rounded-full',
        isUser ? 'bg-zord-accent/20' : 'bg-purple-900/60',
      )}>
        {isUser
          ? <User className="h-3.5 w-3.5 text-zord-accent" />
          : <Bot className="h-3.5 w-3.5 text-purple-400" />}
      </div>
      <div className={cn('max-w-[85%] flex flex-col gap-2', isUser && 'items-end')}>
        <div className={cn(
          'rounded p-3 text-sm',
          isUser
            ? 'bg-zord-accent/10 border border-zord-accent/30 text-zord-text'
            : 'bg-zord-panel border border-zord-border text-zord-text',
        )}>
          {msg.loading
            ? <div className="flex items-center gap-2 text-zord-text-muted">
                <Loader className="h-4 w-4 animate-spin" />
                <span className="text-xs">Analyzing intelligence data...</span>
              </div>
            : <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">{msg.content}</pre>
          }
        </div>

        {!isUser && !msg.loading && msg.confidence !== undefined && (
          <div className="flex flex-col gap-1.5">
            <ConfidenceBadge score={msg.confidence} />

            {msg.sources && msg.sources.length > 0 && (
              <div className="flex flex-wrap items-center gap-1">
                <span className="text-[10px] text-zord-text-dim">Sources:</span>
                {msg.sources.map((s) => (
                  <span key={s} className="rounded bg-zord-muted px-1.5 py-0.5 text-[10px] text-zord-text-muted">{s}</span>
                ))}
              </div>
            )}

            {msg.entities && msg.entities.length > 0 && (
              <div className="flex flex-wrap items-center gap-1">
                <span className="text-[10px] text-zord-text-dim">Entities:</span>
                {msg.entities.map((e) => (
                  <span key={e} className="rounded bg-blue-950 border border-blue-900 px-1.5 py-0.5 text-[10px] text-blue-300">{e}</span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export function IntelligencePanel() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'assistant',
      content: 'ZORD Intelligence AI is ready. Ask me anything about the investigation — entity connections, financial patterns, hypothesis analysis, or gap detection.',
      confidence: 100,
      sources: ['ZORD Knowledge Base'],
      entities: [],
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || loading) return
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input }
    const loadingMsg: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: '', loading: true }
    setMessages((prev) => [...prev, userMsg, loadingMsg])
    setInput('')
    setLoading(true)

    // Simulate AI response
    await new Promise((r) => setTimeout(r, 1500))

    const response = MOCK_RESPONSES.default
    setMessages((prev) => [
      ...prev.filter((m) => !m.loading),
      { id: Date.now().toString(), role: 'assistant', ...response },
    ])
    setLoading(false)
  }

  const QUICK_ACTIONS = [
    { icon: Sparkles, label: 'Analyze investigation', query: 'Give me a comprehensive analysis of this investigation' },
    { icon: AlertCircle, label: 'Detect gaps', query: 'What intelligence gaps exist in this investigation?' },
    { icon: Zap, label: 'Find contradictions', query: 'Are there any contradictions between the hypotheses?' },
  ]

  return (
    <div className="panel flex flex-col" style={{ height: '680px' }}>
      {/* Header */}
      <div className="panel-header flex items-center gap-2.5 px-4 py-3">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-purple-900/60">
          <Bot className="h-4 w-4 text-purple-400" />
        </div>
        <div>
          <span className="text-sm font-medium text-zord-text">Intelligence AI</span>
          <span className="ms-2 text-[10px] text-green-400 font-mono">● ONLINE</span>
        </div>
      </div>

      {/* Quick actions */}
      <div className="flex gap-2 border-b border-zord-border px-4 py-2">
        {QUICK_ACTIONS.map(({ icon: Icon, label, query }) => (
          <button
            key={label}
            onClick={() => { setInput(query) }}
            className="flex items-center gap-1.5 rounded border border-zord-border bg-zord-muted/40 px-2.5 py-1 text-xs text-zord-text-muted hover:text-zord-text transition-colors"
          >
            <Icon className="h-3 w-3" />
            {label}
          </button>
        ))}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} msg={msg} />
        ))}
        <div ref={endRef} />
      </div>

      {/* Input */}
      <div className="border-t border-zord-border p-3">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
            placeholder="Ask about the investigation..."
            disabled={loading}
            className="flex-1 rounded border border-zord-border bg-zord-muted px-3 py-2 text-sm text-zord-text placeholder:text-zord-text-dim focus:border-zord-accent focus:outline-none disabled:opacity-50"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded bg-zord-accent text-white disabled:opacity-40 hover:bg-zord-accent-dim transition-colors"
          >
            {loading ? <Loader className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </div>
  )
}
