'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Shield, Eye, EyeOff, Loader2, AlertCircle, Lock } from 'lucide-react'

type Step = 'credentials' | 'mfa'

export default function SuperAdminLoginPage() {
  const router = useRouter()
  const [step, setStep] = useState<Step>('credentials')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mfaCode, setMfaCode] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleCredentials = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, superAdmin: true }),
      })

      if (!res.ok) {
        setError('Invalid credentials or insufficient privileges')
        return
      }

      const data = await res.json()
      if (data.mfaRequired) {
        setStep('mfa')
      } else {
        router.replace('/he/super-admin')
      }
    } catch {
      setError('Invalid credentials or insufficient privileges')
    } finally {
      setLoading(false)
    }
  }

  const handleMfa = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/auth/mfa/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code: mfaCode }),
      })

      if (!res.ok) {
        setError('Invalid MFA code')
        return
      }

      router.replace('/he/super-admin')
    } catch {
      setError('Invalid MFA code')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative flex h-screen items-center justify-center overflow-hidden bg-zord-bg">
      {/* Grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Top classification banner */}
      <div className="absolute inset-x-0 top-0 flex h-8 items-center justify-center bg-red-950">
        <span className="font-mono text-xs uppercase tracking-widest text-red-400">
          MASTER ADMIN ACCESS — RESTRICTED PORTAL
        </span>
      </div>

      {/* Form card */}
      <div className="w-full max-w-sm px-4 sm:px-0">
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-red-900/60 bg-red-950/40">
              <Lock className="h-7 w-7 text-red-400" />
            </div>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-zord-text">Super Admin Portal</h1>
          <p className="mt-1 text-sm text-zord-text-muted">Institutions management access</p>
        </div>

        <div className="rounded-lg border border-zord-border bg-zord-panel p-5 shadow-2xl sm:p-6">
          {error && (
            <div className="mb-4 flex items-center gap-2 rounded border border-red-800/50 bg-red-950/50 px-3 py-2 text-sm text-red-400">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {error}
            </div>
          )}

          {step === 'credentials' ? (
            <form onSubmit={handleCredentials} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-zord-text-muted">
                  Email
                </label>
                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input"
                  placeholder="master@zord.pro"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-zord-text-muted">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input pe-10"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 end-3 flex items-center text-zord-text-muted"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full bg-red-700 hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                Access Admin Portal
              </button>
            </form>
          ) : (
            <form onSubmit={handleMfa} className="space-y-4">
              <p className="text-sm text-zord-text-muted">Enter your TOTP authentication code.</p>
              <div>
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-zord-text-muted">
                  MFA Code
                </label>
                <input
                  type="text"
                  required
                  inputMode="numeric"
                  maxLength={6}
                  value={mfaCode}
                  onChange={(e) => setMfaCode(e.target.value.replace(/\D/g, ''))}
                  className="w-full rounded border border-zord-border bg-zord-muted px-3 py-2 text-center font-mono text-2xl tracking-[0.5em] text-zord-text focus:border-red-700 focus:outline-none focus:ring-1 focus:ring-red-700/30"
                  placeholder="000000"
                />
              </div>

              <button
                type="submit"
                disabled={loading || mfaCode.length < 6}
                className="btn-primary w-full bg-red-700 hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                Verify
              </button>

              <button
                type="button"
                className="w-full text-center text-xs text-zord-text-muted hover:text-zord-text"
                onClick={() => { setStep('credentials'); setMfaCode('') }}
              >
                ← Back
              </button>
            </form>
          )}
        </div>

        <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-widest text-zord-text-dim">
          zord.pro — super admin v0.1.0
        </p>
      </div>

      {/* Bottom classification banner */}
      <div className="absolute inset-x-0 bottom-0 flex h-8 items-center justify-center bg-red-950">
        <span className="font-mono text-xs uppercase tracking-widest text-red-400">
          ALL ACTIONS ARE LOGGED AND AUDITED
        </span>
      </div>
    </div>
  )
}
