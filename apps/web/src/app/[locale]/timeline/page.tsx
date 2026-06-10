import { TimelineView } from '@/components/timeline/timeline-view'

export default function TimelinePage() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-zord-text">Timeline Engine</h1>
          <p className="text-xs text-zord-text-muted">Chronological event log across all investigations</p>
        </div>
      </div>
      <TimelineView />
    </div>
  )
}
