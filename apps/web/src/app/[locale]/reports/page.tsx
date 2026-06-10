import { ReportGenerator } from '@/components/reports/report-generator'

export default function ReportsPage() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-zord-text">Report Generator</h1>
          <p className="text-xs text-zord-text-muted">Generate and export intelligence reports</p>
        </div>
      </div>
      <ReportGenerator />
    </div>
  )
}
