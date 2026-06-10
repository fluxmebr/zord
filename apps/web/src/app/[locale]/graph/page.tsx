import { KnowledgeGraph } from '@/components/graph/knowledge-graph'

export default function GraphPage() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-zord-text">Knowledge Graph</h1>
          <p className="text-xs text-zord-text-muted">Visual entity relationship network</p>
        </div>
      </div>
      <KnowledgeGraph />
    </div>
  )
}
