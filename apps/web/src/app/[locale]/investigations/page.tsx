import { InvestigationsList } from '@/components/investigation/investigations-list'

export default function InvestigationsPage() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-zord-text">Investigations</h1>
          <p className="text-xs text-zord-text-muted">All investigations across this workspace</p>
        </div>
      </div>
      <InvestigationsList />
    </div>
  )
}
