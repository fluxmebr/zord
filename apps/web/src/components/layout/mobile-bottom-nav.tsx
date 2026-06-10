'use client'

import { usePathname } from 'next/navigation'
import { useTranslations, useLocale } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  Search,
  Network,
  Bell,
  MoreHorizontal,
} from 'lucide-react'

const BOTTOM_NAV_ITEMS = [
  { key: 'overview', href: '/dashboard', icon: LayoutDashboard },
  { key: 'investigations', href: '/investigations', icon: Search },
  { key: 'graph', href: '/graph', icon: Network },
  { key: 'alerts', href: '/alerts', icon: Bell },
] as const

interface MobileBottomNavProps {
  alertCount?: number
  onMoreClick: () => void
}

export function MobileBottomNav({ alertCount = 0, onMoreClick }: MobileBottomNavProps) {
  const t = useTranslations('nav')
  const pathname = usePathname()
  const locale = useLocale()

  const isActive = (href: string) => {
    const localizedHref = `/${locale}${href}`
    if (href === '/dashboard') return pathname === localizedHref
    return pathname.startsWith(localizedHref)
  }

  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-zord-border bg-zord-surface md:hidden">
      {/* Safe area spacer for iOS */}
      <div className="flex items-stretch">
        {BOTTOM_NAV_ITEMS.map(({ key, href, icon: Icon }) => {
          const active = isActive(href)
          const isAlerts = key === 'alerts'

          return (
            <Link
              key={key}
              href={href as '/dashboard'}
              className={cn(
                'relative flex flex-1 flex-col items-center gap-1 py-2.5 text-[10px] transition-colors',
                active ? 'text-zord-accent' : 'text-zord-text-muted',
              )}
            >
              <div className="relative">
                <Icon className="h-5 w-5" />
                {isAlerts && alertCount > 0 && (
                  <span className="absolute -end-1.5 -top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-zord-danger text-[8px] font-bold text-white">
                    {alertCount > 9 ? '9+' : alertCount}
                  </span>
                )}
              </div>
              <span className="truncate capitalize">{t(key)}</span>
              {active && (
                <span className="absolute inset-x-1/4 top-0 h-0.5 rounded-b bg-zord-accent" />
              )}
            </Link>
          )
        })}

        {/* More button — opens sidebar drawer */}
        <button
          onClick={onMoreClick}
          className="flex flex-1 flex-col items-center gap-1 py-2.5 text-[10px] text-zord-text-muted transition-colors active:text-zord-text"
        >
          <MoreHorizontal className="h-5 w-5" />
          <span>More</span>
        </button>
      </div>

      {/* iOS home indicator spacer */}
      <div className="h-safe-area-inset-bottom bg-zord-surface" />
    </nav>
  )
}
