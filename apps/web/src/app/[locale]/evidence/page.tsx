import { EvidenceVault } from '@/components/evidence/evidence-vault'

export default function EvidencePage() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-zord-text">Evidence Vault</h1>
          <p className="text-xs text-zord-text-muted">Tamper-evident evidence repository with chain of custody</p>
        </div>
      </div>
      <EvidenceVault />
    </div>
  )
}
