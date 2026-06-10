import { OperationsBoard } from '@/components/operations/operations-board'

export default function OperationsPage() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-zord-text">Operations Center</h1>
          <p className="text-xs text-zord-text-muted">Mission board — track all operational tasks</p>
        </div>
      </div>
      <OperationsBoard />
    </div>
  )
}
