'use client'

import { cn } from '@/lib/utils'
import { Search, AlertTriangle, Brain, Users, FileText, TrendingUp } from 'lucide-react'

interface StatCard {
  label: string
  value: string | number
  delta?: number
  icon: React.ComponentType<{ className?: string }>
  iconColor: string
  critical?: boolean
}

const STATS: StatCard[] = [
  { label: 'Active Investigations', value: 24, delta: +3, icon: Search, iconColor: 'text-zord-accent' },
  { label: 'Critical', value: 4, delta: +1, icon: AlertTriangle, iconColor: 'text-red-400', critical: true },
  { label: 'Open Alerts', value: 18, delta: -2, icon: AlertTriangle, iconColor: 'text-yellow-400' },
  { label: 'Active Hypotheses', value: 67, icon: Brain, iconColor: 'text-purple-400' },
  { label: 'New Entities (24h)', value: 142, delta: +28, icon: Users, iconColor: 'text-green-400' },
  { label: 'Evidence (24h)', value: 89, delta: +12, icon: FileText, iconColor: 'text-blue-400' },
]

export function OverviewStats() {
  return (
    <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-3 xl:grid-cols-6">
      {STATS.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </div>
  )
}

function StatCard({ label, value, delta, icon: Icon, iconColor, critical }: StatCard) {
  return (
    <div className={cn('panel relative overflow-hidden p-3 sm:p-4', critical && 'border-red-900/50')}>
      {critical && <div className="absolute inset-x-0 top-0 h-0.5 bg-red-500" />}
      <div className="mb-2 flex items-center justify-between sm:mb-3">
        <Icon className={cn('h-4 w-4', iconColor)} />
        {delta !== undefined && (
          <span className={cn('flex items-center gap-0.5 text-[10px] font-medium', delta > 0 ? 'text-green-400' : 'text-red-400')}>
            <TrendingUp className={cn('h-2.5 w-2.5', delta < 0 && 'rotate-180')} />
            {Math.abs(delta)}
          </span>
        )}
      </div>
      <div className={cn('text-xl font-bold tabular-nums sm:text-2xl', critical ? 'text-red-400' : 'text-zord-text')}>
        {value}
      </div>
      <div className="mt-1 text-[9px] uppercase tracking-wider text-zord-text-muted sm:text-[10px]">
        {label}
      </div>
    </div>
  )
}
