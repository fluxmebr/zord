import { IntelligencePanel } from '@/components/intelligence/intelligence-panel'

export default function IntelligencePage() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-zord-text">Intelligence AI</h1>
          <p className="text-xs text-zord-text-muted">AI-powered analysis engine — every response includes confidence score and sources</p>
        </div>
      </div>
      <IntelligencePanel />
    </div>
  )
}
