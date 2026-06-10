'use client'

import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { useRouter } from '@/i18n/navigation'
import { cn } from '@/lib/utils'
import {
  Search,
  Bell,
  ChevronDown,
  Globe,
  LogOut,
  User,
  Settings,
  Shield,
  Command,
  Menu,
  PanelLeftClose,
  PanelLeft,
} from 'lucide-react'

const LOCALES = [
  { code: 'he', label: 'עברית', dir: 'rtl' },
  { code: 'en', label: 'English', dir: 'ltr' },
  { code: 'ru', label: 'Русский', dir: 'ltr' },
  { code: 'pt', label: 'Português', dir: 'ltr' },
] as const

interface TopbarProps {
  workspaceName?: string
  userName?: string
  userRole?: string
  alertCount?: number
  sidebarCollapsed?: boolean
  onToggleSidebar?: () => void
  onOpenMobileDrawer?: () => void
}

export function Topbar({
  workspaceName = 'Default Workspace',
  userName = 'Analyst',
  userRole = 'ANALYST',
  alertCount = 0,
  sidebarCollapsed = false,
  onToggleSidebar,
  onOpenMobileDrawer,
}: TopbarProps) {
  const t = useTranslations()
  const locale = useLocale()
  const router = useRouter()
  const [localeOpen, setLocaleOpen] = useState(false)
  const [userOpen, setUserOpen] = useState(false)

  const closeAll = () => { setLocaleOpen(false); setUserOpen(false) }

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-zord-border bg-zord-surface px-3 md:px-4">
      {/* Left */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Mobile: hamburger. Desktop: sidebar toggle */}
        <button
          className="flex h-8 w-8 items-center justify-center rounded text-zord-text-muted hover:bg-zord-muted hover:text-zord-text md:hidden"
          onClick={onOpenMobileDrawer}
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Desktop sidebar toggle */}
        <button
          className="hidden h-7 w-7 items-center justify-center rounded text-zord-text-muted hover:bg-zord-muted hover:text-zord-text md:flex"
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
        >
          {sidebarCollapsed
            ? <PanelLeft className="h-4 w-4" />
            : <PanelLeftClose className="h-4 w-4" />
          }
        </button>

        {/* Workspace name — desktop only */}
        <div className="hidden items-center gap-1.5 md:flex">
          <Shield className="h-3.5 w-3.5 text-zord-accent" />
          <span className="text-sm font-medium text-zord-text">{workspaceName}</span>
        </div>

        {/* Mobile: ZORD logo text */}
        <span className="font-semibold tracking-widest text-zord-text md:hidden">ZORD</span>

        <div className="hidden h-4 w-px bg-zord-border md:block" />

        {/* Search — full on desktop, icon-only on mobile */}
        <button
          className="hidden items-center gap-2 rounded border border-zord-border bg-zord-muted px-3 py-1.5 text-sm text-zord-text-muted transition-colors hover:border-zord-accent/40 hover:text-zord-text md:flex"
          onClick={() => {}}
        >
          <Search className="h-3.5 w-3.5" />
          <span className="text-xs">{t('common.search')}...</span>
          <kbd className="flex items-center gap-0.5 rounded border border-zord-border px-1 py-0.5 font-mono text-[10px]">
            <Command className="h-2.5 w-2.5" />K
          </kbd>
        </button>
      </div>

      {/* Right */}
      <div className="flex items-center gap-0.5 md:gap-1">
        {/* Mobile search icon */}
        <button className="flex h-8 w-8 items-center justify-center rounded text-zord-text-muted hover:bg-zord-muted hover:text-zord-text md:hidden">
          <Search className="h-4.5 w-4.5" />
        </button>

        {/* Locale switcher — icon only on mobile */}
        <div className="relative">
          <button
            className="flex h-8 w-8 items-center justify-center gap-1.5 rounded text-zord-text-muted transition-colors hover:bg-zord-muted hover:text-zord-text md:w-auto md:px-2.5"
            onClick={() => { setLocaleOpen(!localeOpen); setUserOpen(false) }}
          >
            <Globe className="h-4 w-4" />
            <span className="hidden text-xs uppercase md:block">{locale}</span>
          </button>

          {localeOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={closeAll} />
              <div className="absolute end-0 top-full z-50 mt-1 w-44 rounded border border-zord-border bg-zord-panel shadow-2xl">
                {LOCALES.map((l) => (
                  <button
                    key={l.code}
                    className={cn(
                      'flex w-full items-center gap-2.5 px-3 py-2.5 text-sm transition-colors hover:bg-zord-muted',
                      l.code === locale ? 'text-zord-accent' : 'text-zord-text-muted',
                    )}
                    onClick={() => { closeAll(); router.replace('/', { locale: l.code }) }}
                  >
                    <span className="w-6 text-xs uppercase tracking-wider">{l.code}</span>
                    <span>{l.label}</span>
                    {l.dir === 'rtl' && (
                      <span className="ms-auto text-[9px] text-zord-text-dim">RTL</span>
                    )}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Notifications */}
        <button className="relative flex h-8 w-8 items-center justify-center rounded text-zord-text-muted transition-colors hover:bg-zord-muted hover:text-zord-text">
          <Bell className="h-4 w-4" />
          {alertCount > 0 && (
            <span className="absolute end-1 top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-zord-danger text-[9px] font-bold text-white">
              {alertCount > 9 ? '9+' : alertCount}
            </span>
          )}
        </button>

        {/* User menu */}
        <div className="relative">
          <button
            className="flex items-center gap-1.5 rounded px-2 py-1.5 text-sm text-zord-text-muted transition-colors hover:bg-zord-muted hover:text-zord-text"
            onClick={() => { setUserOpen(!userOpen); setLocaleOpen(false) }}
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-zord-accent/20 text-zord-accent">
              <User className="h-3.5 w-3.5" />
            </div>
            <span className="hidden text-xs md:block">{userName}</span>
            <ChevronDown className="hidden h-3 w-3 md:block" />
          </button>

          {userOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={closeAll} />
              <div className="absolute end-0 top-full z-50 mt-1 w-52 rounded border border-zord-border bg-zord-panel shadow-2xl">
                <div className="border-b border-zord-border px-3 py-2.5">
                  <div className="text-sm font-medium text-zord-text">{userName}</div>
                  <div className="text-[10px] uppercase tracking-wider text-zord-text-muted">{userRole}</div>
                </div>
                <div className="py-1">
                  <button className="flex w-full items-center gap-2.5 px-3 py-2.5 text-sm text-zord-text-muted transition-colors hover:bg-zord-muted hover:text-zord-text">
                    <Settings className="h-4 w-4" />
                    {t('nav.settings')}
                  </button>
                  <button className="flex w-full items-center gap-2.5 px-3 py-2.5 text-sm text-zord-danger transition-colors hover:bg-zord-muted">
                    <LogOut className="h-4 w-4" />
                    {t('auth.logout')}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
