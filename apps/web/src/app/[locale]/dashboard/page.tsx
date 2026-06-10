import { OverviewStats } from '@/components/intelligence/overview-stats'
import { ActiveInvestigations } from '@/components/intelligence/active-investigations'
import { RecentActivity } from '@/components/intelligence/recent-activity'
import { AlertsFeed } from '@/components/intelligence/alerts-feed'
import { GlobalTimeline } from '@/components/intelligence/global-timeline'
import { ThreatLevel } from '@/components/intelligence/threat-level'

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-3 p-3 sm:gap-4 sm:p-4">
      {/* Page header */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <h1 className="text-base font-semibold text-zord-text sm:text-lg">
            Intelligence Overview
          </h1>
          <p className="text-xs text-zord-text-muted">
            Operational situational awareness
          </p>
        </div>
        <ThreatLevel level="ELEVATED" />
      </div>

      {/* Stats */}
      <OverviewStats />

      {/* Main grid: stacks on mobile, 3-col on lg */}
      <div className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ActiveInvestigations />
        </div>
        <div>
          <AlertsFeed />
        </div>
      </div>

      {/* Bottom grid: stacks on mobile, 2-col on lg */}
      <div className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-2">
        <RecentActivity />
        <GlobalTimeline />
      </div>
    </div>
  )
}
