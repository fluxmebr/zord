'use client'

import { cn } from '@/lib/utils'

type ThreatLevelValue = 'LOW' | 'GUARDED' | 'ELEVATED' | 'HIGH' | 'SEVERE'

const LEVELS: Record<ThreatLevelValue, { label: string; color: string; bg: string }> = {
  LOW: { label: 'Low', color: 'text-green-400', bg: 'bg-green-950 border-green-800' },
  GUARDED: { label: 'Guarded', color: 'text-blue-400', bg: 'bg-blue-950 border-blue-800' },
  ELEVATED: { label: 'Elevated', color: 'text-yellow-400', bg: 'bg-yellow-950 border-yellow-800' },
  HIGH: { label: 'High', color: 'text-orange-400', bg: 'bg-orange-950 border-orange-800' },
  SEVERE: { label: 'Severe', color: 'text-red-400', bg: 'bg-red-950 border-red-800' },
}

export function ThreatLevel({ level }: { level: ThreatLevelValue }) {
  const config = LEVELS[level]

  return (
    <div className={cn('flex items-center gap-2 rounded border px-3 py-1.5', config.bg)}>
      <div className={cn('h-1.5 w-1.5 rounded-full animate-pulse-slow', config.color.replace('text-', 'bg-'))} />
      <span className="text-[10px] uppercase tracking-widest text-zinc-400">Threat</span>
      <span className={cn('text-xs font-semibold uppercase tracking-wider', config.color)}>
        {config.label}
      </span>
    </div>
  )
}
