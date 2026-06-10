import { EntitiesList } from '@/components/entity/entities-list'

export default function EntitiesPage() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-zord-text">Entity Engine</h1>
          <p className="text-xs text-zord-text-muted">All tracked entities across this workspace</p>
        </div>
      </div>
      <EntitiesList />
    </div>
  )
}
