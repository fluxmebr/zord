import { HypothesisEngine } from '@/components/hypothesis/hypothesis-engine'

export default async function HypothesisPage({ params }: { params: Promise<{ id: string; locale: string }> }) {
  const { id } = await params
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-zord-text">Hypothesis Engine</h1>
          <p className="text-xs text-zord-text-muted">Investigation: {id}</p>
        </div>
      </div>
      <HypothesisEngine />
    </div>
  )
}
