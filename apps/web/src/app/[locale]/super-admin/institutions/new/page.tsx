import { CreateInstitutionForm } from '@/components/super-admin/create-institution-form'
import { Building2, ChevronRight } from 'lucide-react'
import Link from 'next/link'

export default function NewInstitutionPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-xs text-zord-text-muted">
        <Link href="/he/super-admin" className="hover:text-zord-text">Institutions</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-zord-text">New Institution</span>
      </div>

      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-zord-border bg-zord-panel">
          <Building2 className="h-5 w-5 text-zord-accent" />
        </div>
        <div>
          <h1 className="text-lg font-semibold text-zord-text">New Institution</h1>
          <p className="text-xs text-zord-text-muted">Create a new tenant organization and admin account</p>
        </div>
      </div>

      <CreateInstitutionForm />
    </div>
  )
}
