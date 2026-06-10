'use client'

import { Shield, LogOut, Building2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface SuperAdminShellProps {
  children: React.ReactNode
}

export function SuperAdminShell({ children }: SuperAdminShellProps) {
  const router = useRouter()

  const handleLogout = () => {
    document.cookie = 'zord_access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    document.cookie = 'zord_refresh_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    router.push('/he/super-admin/login')
  }

  return (
    <div className="min-h-screen bg-zord-bg">
      {/* Topbar */}
      <header className="sticky top-0 z-40 flex h-12 items-center justify-between border-b border-zord-border bg-zord-surface px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-7 w-7 items-center justify-center rounded bg-zord-accent/20">
            <Shield className="h-4 w-4 text-zord-accent" />
          </div>
          <span className="text-sm font-semibold tracking-wide text-zord-text">ZORD</span>
          <span className="rounded border border-red-800/60 bg-red-950/60 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-widest text-red-400">
            MASTER ADMIN
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Building2 className="h-3.5 w-3.5 text-zord-text-muted" />
            <span className="text-xs text-zord-text-muted">Institutions</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 rounded border border-zord-border px-2.5 py-1.5 text-xs text-zord-text-muted transition-colors hover:border-red-800/60 hover:text-red-400"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  )
}
