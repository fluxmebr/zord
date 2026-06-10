'use client'

import { useState } from 'react'
import { Sidebar, SidebarDrawer } from './sidebar'
import { Topbar } from './topbar'
import { MobileBottomNav } from './mobile-bottom-nav'

interface AppShellProps {
  children: React.ReactNode
  workspaceName?: string
  userName?: string
  userRole?: string
  alertCount?: number
}

export function AppShell({
  children,
  workspaceName,
  userName,
  userRole,
  alertCount = 0,
}: AppShellProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden bg-zord-bg">
      {/* Desktop sidebar */}
      <Sidebar collapsed={sidebarCollapsed} />

      {/* Mobile sidebar drawer */}
      <SidebarDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      {/* Main content area */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Topbar
          workspaceName={workspaceName}
          userName={userName}
          userRole={userRole}
          alertCount={alertCount}
          sidebarCollapsed={sidebarCollapsed}
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
          onOpenMobileDrawer={() => setDrawerOpen(true)}
        />

        {/* Scrollable content — extra bottom padding on mobile for bottom nav */}
        <main className="flex-1 overflow-y-auto pb-16 md:pb-0">
          {children}
        </main>
      </div>

      {/* Mobile bottom navigation */}
      <MobileBottomNav
        alertCount={alertCount}
        onMoreClick={() => setDrawerOpen(true)}
      />
    </div>
  )
}
