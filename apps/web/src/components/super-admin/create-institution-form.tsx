'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Building2, User, Settings, Shield, Copy, Check, RefreshCw, ChevronRight, Loader2 } from 'lucide-react'

type Plan = 'TRIAL' | 'STARTER' | 'PROFESSIONAL' | 'ENTERPRISE'

const PLAN_DEFAULTS: Record<Plan, { maxUsers: number; maxInvestigations: number; maxStorageGb: number; retentionDays: number }> = {
  TRIAL:        { maxUsers: 5,         maxInvestigations: 10,        maxStorageGb: 5,    retentionDays: 90  },
  STARTER:      { maxUsers: 25,        maxInvestigations: 50,        maxStorageGb: 50,   retentionDays: 365 },
  PROFESSIONAL: { maxUsers: 100,       maxInvestigations: 500,       maxStorageGb: 500,  retentionDays: 730 },
  ENTERPRISE:   { maxUsers: 999999,    maxInvestigations: 999999,    maxStorageGb: 9999, retentionDays: 3650 },
}

const PLAN_STYLE: Record<Plan, string> = {
  TRIAL:        'border-zinc-700 bg-zinc-900/60 text-zinc-300',
  STARTER:      'border-blue-800 bg-blue-950/60 text-blue-300',
  PROFESSIONAL: 'border-purple-800 bg-purple-950/60 text-purple-300',
  ENTERPRISE:   'border-yellow-800 bg-yellow-950/60 text-yellow-300',
}

function generatePassword(length = 16): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$%'
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
}

function slugify(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '').replace(/-+/g, '-').replace(/^-|-$/g, '')
}

export function CreateInstitutionForm() {
  const router = useRouter()

  // Identification
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [domain, setDomain] = useState('')
  const [slugManual, setSlugManual] = useState(false)

  // Plan
  const [plan, setPlan] = useState<Plan>('TRIAL')

  // Limits
  const [maxUsers, setMaxUsers] = useState(5)
  const [maxInvestigations, setMaxInvestigations] = useState(10)
  const [maxStorageGb, setMaxStorageGb] = useState(5)
  const [retentionDays, setRetentionDays] = useState(90)

  // Security settings
  const [defaultLanguage, setDefaultLanguage] = useState('en')
  const [mfaRequired, setMfaRequired] = useState(false)
  const [ssoEnabled, setSsoEnabled] = useState(false)
  const [watermarkEnabled, setWatermarkEnabled] = useState(true)

  // Admin user
  const [adminName, setAdminName] = useState('')
  const [adminEmail, setAdminEmail] = useState('')
  const [adminPassword, setAdminPassword] = useState(generatePassword)
  const [passwordCopied, setPasswordCopied] = useState(false)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleNameChange = (v: string) => {
    setName(v)
    if (!slugManual) setSlug(slugify(v))
  }

  const handlePlanChange = (p: Plan) => {
    setPlan(p)
    const defaults = PLAN_DEFAULTS[p]
    setMaxUsers(defaults.maxUsers)
    setMaxInvestigations(defaults.maxInvestigations)
    setMaxStorageGb(defaults.maxStorageGb)
    setRetentionDays(defaults.retentionDays)
  }

  const copyPassword = async () => {
    await navigator.clipboard.writeText(adminPassword)
    setPasswordCopied(true)
    setTimeout(() => setPasswordCopied(false), 2000)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/admin/tenants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name, slug, domain: domain || undefined, plan,
          settings: {
            defaultLanguage, mfaRequired, ssoEnabled, watermarkEnabled,
            maxUsers, maxInvestigations, maxStorageGb, retentionDays,
            allowedDomains: [],
          },
          adminUser: { name: adminName, email: adminEmail, password: adminPassword },
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data?.message ?? 'Failed to create institution')
        return
      }

      router.push('/he/super-admin')
    } catch {
      setError('Failed to create institution')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 pb-10">
      {error && (
        <div className="flex items-center gap-2 rounded border border-red-800/50 bg-red-950/50 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Section: Identification */}
      <div className="panel overflow-hidden">
        <div className="panel-header">
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-zord-accent" />
            <span className="text-sm font-medium text-zord-text">Identification</span>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2">
          <div>
            <label className="label-dim mb-1.5 block">Institution Name *</label>
            <input required value={name} onChange={(e) => handleNameChange(e.target.value)} className="input" placeholder="Interpol Regional Branch" />
          </div>
          <div>
            <label className="label-dim mb-1.5 block">Unique Slug *</label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <span className="absolute start-3 top-1/2 -translate-y-1/2 text-xs text-zord-text-muted">/</span>
                <input
                  required value={slug}
                  onChange={(e) => { setSlugManual(true); setSlug(e.target.value) }}
                  className="input ps-6"
                  placeholder="interpol-regional"
                />
              </div>
            </div>
            <p className="mt-1 text-[10px] text-zord-text-dim">Auto-generated from name. Must be unique.</p>
          </div>
          <div className="sm:col-span-2">
            <label className="label-dim mb-1.5 block">Custom Domain <span className="normal-case text-zord-text-dim">(optional)</span></label>
            <input value={domain} onChange={(e) => setDomain(e.target.value)} className="input" placeholder="intelligence.example.gov" />
          </div>
        </div>
      </div>

      {/* Section: Plan */}
      <div className="panel overflow-hidden">
        <div className="panel-header">
          <div className="flex items-center gap-2">
            <ChevronRight className="h-4 w-4 text-zord-accent" />
            <span className="text-sm font-medium text-zord-text">Plan</span>
          </div>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {(['TRIAL', 'STARTER', 'PROFESSIONAL', 'ENTERPRISE'] as Plan[]).map((p) => {
              const d = PLAN_DEFAULTS[p]
              const isEnt = p === 'ENTERPRISE'
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() => handlePlanChange(p)}
                  className={cn(
                    'rounded border p-3 text-start transition-colors',
                    plan === p ? PLAN_STYLE[p] : 'border-zord-border bg-zord-muted text-zord-text-muted hover:text-zord-text',
                  )}
                >
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wide">{p}</p>
                  <p className="text-[10px] opacity-70">{isEnt ? '∞' : d.maxUsers} users</p>
                  <p className="text-[10px] opacity-70">{isEnt ? '∞' : d.maxInvestigations} investigations</p>
                  <p className="text-[10px] opacity-70">{isEnt ? '∞' : `${d.maxStorageGb} GB`}</p>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Section: Limits */}
      <div className="panel overflow-hidden">
        <div className="panel-header">
          <div className="flex items-center gap-2">
            <Settings className="h-4 w-4 text-zord-accent" />
            <span className="text-sm font-medium text-zord-text">Limits & Settings</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-4">
          <div>
            <label className="label-dim mb-1.5 block">Max Users</label>
            <input type="number" min={1} value={maxUsers === 999999 ? '' : maxUsers} onChange={(e) => setMaxUsers(Number(e.target.value) || 999999)} className="input" placeholder="∞" />
          </div>
          <div>
            <label className="label-dim mb-1.5 block">Max Investigations</label>
            <input type="number" min={1} value={maxInvestigations === 999999 ? '' : maxInvestigations} onChange={(e) => setMaxInvestigations(Number(e.target.value) || 999999)} className="input" placeholder="∞" />
          </div>
          <div>
            <label className="label-dim mb-1.5 block">Storage (GB)</label>
            <input type="number" min={1} value={maxStorageGb === 9999 ? '' : maxStorageGb} onChange={(e) => setMaxStorageGb(Number(e.target.value) || 9999)} className="input" placeholder="∞" />
          </div>
          <div>
            <label className="label-dim mb-1.5 block">Retention (days)</label>
            <input type="number" min={1} value={retentionDays} onChange={(e) => setRetentionDays(Number(e.target.value))} className="input" />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 border-t border-zord-border p-4 sm:grid-cols-2">
          <div>
            <label className="label-dim mb-1.5 block">Default Language</label>
            <select value={defaultLanguage} onChange={(e) => setDefaultLanguage(e.target.value)} className="input">
              <option value="en">English (LTR)</option>
              <option value="he">עברית (RTL)</option>
              <option value="ru">Русский (LTR)</option>
              <option value="pt">Português (LTR)</option>
            </select>
          </div>
          <div className="flex flex-col gap-3 pt-1 sm:pt-6">
            {[
              { label: 'MFA Required', value: mfaRequired, set: setMfaRequired },
              { label: 'SSO Enabled', value: ssoEnabled, set: setSsoEnabled },
              { label: 'Watermark Documents', value: watermarkEnabled, set: setWatermarkEnabled },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <span className="text-sm text-zord-text">{item.label}</span>
                <button
                  type="button"
                  onClick={() => item.set(!item.value)}
                  className={cn('relative h-6 w-10 rounded-full transition-colors', item.value ? 'bg-zord-accent' : 'bg-zord-border')}
                >
                  <span className={cn('absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform', item.value ? 'translate-x-4' : 'translate-x-0.5')} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section: Admin user */}
      <div className="panel overflow-hidden">
        <div className="panel-header">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-zord-accent" />
            <span className="text-sm font-medium text-zord-text">Institution Admin User</span>
          </div>
          <span className="text-[10px] text-zord-text-muted">Will be created as TENANT_ADMIN</span>
        </div>
        <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2">
          <div>
            <label className="label-dim mb-1.5 block">Full Name *</label>
            <input required value={adminName} onChange={(e) => setAdminName(e.target.value)} className="input" placeholder="John Smith" />
          </div>
          <div>
            <label className="label-dim mb-1.5 block">Email *</label>
            <input required type="email" value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} className="input" placeholder="admin@institution.gov" />
          </div>
          <div className="sm:col-span-2">
            <label className="label-dim mb-1.5 block">Temporary Password</label>
            <div className="flex gap-2">
              <input readOnly value={adminPassword} className="input flex-1 font-mono text-sm" />
              <button type="button" onClick={() => setAdminPassword(generatePassword())} className="flex items-center gap-1.5 rounded border border-zord-border px-3 py-2 text-xs text-zord-text-muted hover:text-zord-text">
                <RefreshCw className="h-3.5 w-3.5" />
              </button>
              <button type="button" onClick={copyPassword} className="flex items-center gap-1.5 rounded border border-zord-border px-3 py-2 text-xs text-zord-text-muted hover:text-zord-text">
                {passwordCopied ? <Check className="h-3.5 w-3.5 text-green-400" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
            </div>
            <p className="mt-1 text-[10px] text-zord-text-dim">Copy this password — it will not be shown again.</p>
          </div>
        </div>
      </div>

      {/* Submit */}
      <div className="flex items-center justify-end gap-3">
        <button type="button" onClick={() => router.back()} className="btn-secondary">
          Cancel
        </button>
        <button type="submit" disabled={loading} className="btn-primary disabled:cursor-not-allowed disabled:opacity-50">
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          Create Institution
        </button>
      </div>
    </form>
  )
}
