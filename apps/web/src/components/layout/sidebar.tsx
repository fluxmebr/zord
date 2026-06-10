'use client'

import { usePathname } from 'next/navigation'
import { useTranslations, useLocale } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  Search,
  Users,
  FileText,
  Clock,
  Network,
  Target,
  Brain,
  BarChart3,
  Bell,
  Shield,
  Settings,
  ChevronRight,
  Layers,
  X,
} from 'lucide-react'

export const NAV_ITEMS = [
  { key: 'overview', href: '/dashboard', icon: LayoutDashboard },
  { key: 'investigations', href: '/investigations', icon: Search },
  { key: 'entities', href: '/entities', icon: Users },
  { key: 'evidence', href: '/evidence', icon: FileText },
  { key: 'timeline', href: '/timeline', icon: Clock },
  { key: 'graph', href: '/graph', icon: Network },
  { key: 'operations', href: '/operations', icon: Target },
  { key: 'intelligence', href: '/intelligence', icon: Brain },
  { key: 'reports', href: '/reports', icon: BarChart3 },
  { key: 'alerts', href: '/alerts', icon: Bell },
  { key: 'audit', href: '/audit', icon: Shield },
  { key: 'administration', href: '/administration', icon: Layers },
  { key: 'settings', href: '/settings', icon: Settings },
] as const

const NAV_DIVIDERS_BEFORE = new Set(['operations', 'alerts', 'administration'])

interface SidebarProps {
  collapsed?: boolean
  // Mobile drawer mode
  open?: boolean
  onClose?: () => void
}

export function Sidebar({ collapsed = false, open = false, onClose }: SidebarProps) {
  const t = useTranslations('nav')
  const pathname = usePathname()
  const locale = useLocale()

  const isActive = (href: string) => {
    const localizedHref = `/${locale}${href}`
    if (href === '/dashboard') return pathname === localizedHref
    return pathname.startsWith(localizedHref)
  }

  const handleNavClick = () => {
    onClose?.()
  }

  return (
    <aside
      className={cn(
        'flex h-screen flex-col border-e border-zord-border bg-zord-surface transition-all duration-200',
        // Desktop: always visible, collapsible
        'hidden md:flex',
        collapsed ? 'md:w-14' : 'md:w-56',
      )}
    >
      <SidebarContent
        collapsed={collapsed}
        isActive={isActive}
        t={t}
        onNavClick={handleNavClick}
      />
    </aside>
  )
}

// Drawer version for mobile
export function SidebarDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const t = useTranslations('nav')
  const pathname = usePathname()
  const locale = useLocale()

  const isActive = (href: string) => {
    const localizedHref = `/${locale}${href}`
    if (href === '/dashboard') return pathname === localizedHref
    return pathname.startsWith(localizedHref)
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity md:hidden',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={onClose}
      />

      {/* Drawer */}
      <aside
        className={cn(
          'fixed inset-y-0 start-0 z-50 flex w-72 flex-col border-e border-zord-border bg-zord-surface transition-transform duration-300 md:hidden',
          open ? 'translate-x-0' : '-translate-x-full',
          // RTL support
          'rtl:start-auto rtl:end-0 rtl:border-e-0 rtl:border-s',
          open ? 'rtl:translate-x-0' : 'rtl:translate-x-full',
        )}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute end-3 top-3 rounded p-1.5 text-zord-text-muted hover:bg-zord-muted hover:text-zord-text"
        >
          <X className="h-4 w-4" />
        </button>

        <SidebarContent
          collapsed={false}
          isActive={isActive}
          t={t}
          onNavClick={onClose}
        />
      </aside>
    </>
  )
}

function SidebarContent({
  collapsed,
  isActive,
  t,
  onNavClick,
}: {
  collapsed: boolean
  isActive: (href: string) => boolean
  t: ReturnType<typeof useTranslations<'nav'>>
  onNavClick: () => void
}) {
  return (
    <>
      {/* Logo */}
      <div className="flex h-14 shrink-0 items-center border-b border-zord-border px-4">
        {collapsed ? (
          <div className="flex h-7 w-7 items-center justify-center rounded bg-zord-accent">
            <span className="text-xs font-bold text-white">Z</span>
          </div>
        ) : (
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded bg-zord-accent">
              <span className="text-xs font-bold text-white">Z</span>
            </div>
            <div>
              <div className="text-sm font-semibold tracking-widest text-zord-text">ZORD</div>
              <div className="text-[9px] uppercase tracking-widest text-zord-text-muted">
                Intelligence OS
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3">
        <ul className="space-y-0.5 px-2">
          {NAV_ITEMS.map(({ key, href, icon: Icon }) => {
            const active = isActive(href)
            return (
              <li key={key}>
                {NAV_DIVIDERS_BEFORE.has(key) && (
                  <div className="my-2 border-t border-zord-border" />
                )}
                <Link
                  href={href as '/dashboard'}
                  onClick={onNavClick}
                  className={cn(
                    'group flex items-center gap-2.5 rounded px-2.5 py-2.5 text-sm transition-colors',
                    active
                      ? 'bg-zord-accent/15 text-zord-text'
                      : 'text-zord-text-muted hover:bg-zord-muted hover:text-zord-text',
                    collapsed && 'justify-center px-2',
                  )}
                  title={collapsed ? t(key) : undefined}
                >
                  <Icon
                    className={cn(
                      'h-4 w-4 shrink-0',
                      active ? 'text-zord-accent' : 'text-current',
                    )}
                  />
                  {!collapsed && (
                    <>
                      <span className="flex-1 truncate">{t(key)}</span>
                      {active && (
                        <ChevronRight className="h-3 w-3 text-zord-accent opacity-60" />
                      )}
                    </>
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* System status */}
      <div className="shrink-0 border-t border-zord-border px-4 py-3">
        {collapsed ? (
          <div className="flex justify-center">
            <span className="status-dot-active" />
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span className="status-dot-active" />
            <span className="text-[10px] uppercase tracking-widest text-zord-text-muted">
              System Online
            </span>
          </div>
        )}
      </div>
    </>
  )
}
