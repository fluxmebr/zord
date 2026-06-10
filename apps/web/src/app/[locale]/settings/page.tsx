'use client'

import { cn } from '@/lib/utils'
import { Globe, Bell, Shield, Moon, ChevronRight } from 'lucide-react'
import { useState } from 'react'

const LOCALES = [
  { code: 'he', label: 'עברית', dir: 'RTL' },
  { code: 'en', label: 'English', dir: 'LTR' },
  { code: 'ru', label: 'Русский', dir: 'LTR' },
  { code: 'pt', label: 'Português', dir: 'LTR' },
]

export default function SettingsPage() {
  const [locale, setLocale] = useState('en')
  const [mfaEnabled, setMfaEnabled] = useState(false)
  const [alertNotifs, setAlertNotifs] = useState(true)

  return (
    <div className="flex flex-col gap-4 p-3 sm:p-4">
      <div>
        <h1 className="text-base font-semibold text-zord-text sm:text-lg">Settings</h1>
        <p className="text-xs text-zord-text-muted">Personal preferences and security</p>
      </div>

      {/* Language */}
      <div className="panel">
        <div className="panel-header">
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-zord-accent" />
            <span className="text-sm font-medium text-zord-text">Language</span>
          </div>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {LOCALES.map((l) => (
              <button
                key={l.code}
                onClick={() => setLocale(l.code)}
                className={cn(
                  'flex flex-col items-center gap-1 rounded border p-3 text-sm transition-colors',
                  locale === l.code
                    ? 'border-zord-accent bg-zord-accent/10 text-zord-accent'
                    : 'border-zord-border bg-zord-muted text-zord-text-muted hover:text-zord-text',
                )}
              >
                <span className="font-medium">{l.label}</span>
                <span className="text-[9px] uppercase tracking-wider opacity-60">{l.dir}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Security */}
      <div className="panel">
        <div className="panel-header">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-zord-accent" />
            <span className="text-sm font-medium text-zord-text">Security</span>
          </div>
        </div>
        <div className="divide-y divide-zord-border">
          <div className="flex items-center justify-between px-4 py-3.5">
            <div>
              <div className="text-sm text-zord-text">Two-Factor Authentication</div>
              <div className="text-xs text-zord-text-muted">Protect your account with TOTP</div>
            </div>
            <button
              onClick={() => setMfaEnabled(!mfaEnabled)}
              className={cn(
                'relative h-6 w-10 rounded-full transition-colors',
                mfaEnabled ? 'bg-zord-accent' : 'bg-zord-border',
              )}
            >
              <span className={cn(
                'absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform',
                mfaEnabled ? 'translate-x-4' : 'translate-x-0.5',
              )} />
            </button>
          </div>
          <button className="flex w-full items-center justify-between px-4 py-3.5 hover:bg-zord-muted/40">
            <div>
              <div className="text-sm text-zord-text">Active Sessions</div>
              <div className="text-xs text-zord-text-muted">View and revoke active sessions</div>
            </div>
            <ChevronRight className="h-4 w-4 text-zord-text-muted" />
          </button>
          <button className="flex w-full items-center justify-between px-4 py-3.5 hover:bg-zord-muted/40">
            <div>
              <div className="text-sm text-zord-text">Change Password</div>
              <div className="text-xs text-zord-text-muted">Update your account password</div>
            </div>
            <ChevronRight className="h-4 w-4 text-zord-text-muted" />
          </button>
        </div>
      </div>

      {/* Notifications */}
      <div className="panel">
        <div className="panel-header">
          <div className="flex items-center gap-2">
            <Bell className="h-4 w-4 text-zord-accent" />
            <span className="text-sm font-medium text-zord-text">Notifications</span>
          </div>
        </div>
        <div className="divide-y divide-zord-border">
          {[
            { label: 'Critical Alerts', desc: 'Notify on CRITICAL severity alerts', state: true },
            { label: 'Hypothesis Changes', desc: 'Notify when hypotheses are updated by AI', state: alertNotifs },
            { label: 'Evidence Processing', desc: 'Notify when OCR or transcription completes', state: false },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between px-4 py-3.5">
              <div>
                <div className="text-sm text-zord-text">{item.label}</div>
                <div className="text-xs text-zord-text-muted">{item.desc}</div>
              </div>
              <button
                className={cn(
                  'relative h-6 w-10 rounded-full transition-colors',
                  item.state ? 'bg-zord-accent' : 'bg-zord-border',
                )}
              >
                <span className={cn(
                  'absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform',
                  item.state ? 'translate-x-4' : 'translate-x-0.5',
                )} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
