'use client'

import { cn } from '@/lib/utils'
import { Users, Building2, Key, Activity, Settings, ChevronRight } from 'lucide-react'

const SECTIONS = [
  {
    icon: Users,
    label: 'Users & Roles',
    description: 'Manage team members, roles, and permissions',
    count: '8 users',
    href: '#',
  },
  {
    icon: Building2,
    label: 'Organization',
    description: 'Workspace settings, domain, and branding',
    count: 'Default Workspace',
    href: '#',
  },
  {
    icon: Key,
    label: 'API Keys',
    description: 'Manage API keys for external integrations',
    count: '2 active keys',
    href: '#',
  },
  {
    icon: Activity,
    label: 'Usage & Limits',
    description: 'Storage, investigations, and API usage',
    count: 'Enterprise plan',
    href: '#',
  },
  {
    icon: Settings,
    label: 'Security Settings',
    description: 'MFA enforcement, session policies, IP allowlist',
    count: 'MFA optional',
    href: '#',
  },
]

const MOCK_USERS = [
  { id: '1', name: 'D. Cohen', email: 'analyst@zord.pro', role: 'ANALYST', status: 'ACTIVE', lastLogin: '2m ago' },
  { id: '2', name: 'M. Ivanova', email: 'm.ivanova@zord.pro', role: 'ANALYST', status: 'ACTIVE', lastLogin: '1h ago' },
  { id: '3', name: 'R. Silva', email: 'r.silva@zord.pro', role: 'ANALYST', status: 'ACTIVE', lastLogin: '3h ago' },
  { id: '4', name: 'A. Ben-David', email: 'a.bendavid@zord.pro', role: 'OPERATOR', status: 'ACTIVE', lastLogin: '1d ago' },
  { id: '5', name: 'ZORD Administrator', email: 'admin@zord.pro', role: 'TENANT_ADMIN', status: 'ACTIVE', lastLogin: '5d ago' },
]

const ROLE_BADGE: Record<string, string> = {
  TENANT_ADMIN: 'text-purple-400 bg-purple-950 border-purple-900',
  ANALYST: 'text-blue-400 bg-blue-950 border-blue-900',
  OPERATOR: 'text-green-400 bg-green-950 border-green-900',
  VIEWER: 'text-zinc-400 bg-zinc-900 border-zinc-800',
}

export default function AdministrationPage() {
  return (
    <div className="flex flex-col gap-4 p-3 sm:p-4">
      <div>
        <h1 className="text-base font-semibold text-zord-text sm:text-lg">Administration</h1>
        <p className="text-xs text-zord-text-muted">Workspace configuration and management</p>
      </div>

      {/* Quick nav */}
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {SECTIONS.map(({ icon: Icon, label, description, count }) => (
          <button key={label} className="panel flex items-center gap-3 p-4 text-start transition-colors hover:bg-zord-muted/50 active:bg-zord-muted">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded bg-zord-muted">
              <Icon className="h-4 w-4 text-zord-accent" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-medium text-zord-text">{label}</div>
              <div className="truncate text-[10px] text-zord-text-muted">{description}</div>
              <div className="mt-0.5 text-[10px] text-zord-accent">{count}</div>
            </div>
            <ChevronRight className="h-4 w-4 shrink-0 text-zord-text-dim" />
          </button>
        ))}
      </div>

      {/* Users table */}
      <div className="panel">
        <div className="panel-header">
          <span className="text-sm font-medium text-zord-text">Team Members</span>
          <button className="flex items-center gap-1.5 rounded bg-zord-accent px-3 py-1.5 text-xs font-medium text-white hover:bg-zord-accent-dim">
            + Invite
          </button>
        </div>

        {/* Mobile: cards */}
        <div className="divide-y divide-zord-border md:hidden">
          {MOCK_USERS.map((user) => (
            <div key={user.id} className="flex items-center gap-3 px-4 py-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zord-accent/20 text-sm font-medium text-zord-accent">
                {user.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium text-zord-text">{user.name}</div>
                <div className="text-xs text-zord-text-muted">{user.email}</div>
              </div>
              <span className={cn('rounded border px-1.5 py-0.5 text-[9px] font-medium', ROLE_BADGE[user.role] ?? ROLE_BADGE['VIEWER'])}>
                {user.role}
              </span>
            </div>
          ))}
        </div>

        {/* Desktop: table */}
        <table className="hidden w-full md:table">
          <thead>
            <tr className="border-b border-zord-border">
              {['User', 'Email', 'Role', 'Status', 'Last Login', ''].map((h) => (
                <th key={h} className="px-4 py-2.5 text-left text-[10px] font-medium uppercase tracking-wider text-zord-text-muted">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-zord-border">
            {MOCK_USERS.map((user) => (
              <tr key={user.id} className="hover:bg-zord-muted/40">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-zord-accent/20 text-xs font-medium text-zord-accent">
                      {user.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                    </div>
                    <span className="text-sm text-zord-text">{user.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-xs text-zord-text-muted">{user.email}</td>
                <td className="px-4 py-3">
                  <span className={cn('rounded border px-1.5 py-0.5 text-[10px] font-medium', ROLE_BADGE[user.role] ?? ROLE_BADGE['VIEWER'])}>
                    {user.role}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                    <span className="text-xs text-green-400">{user.status}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-xs text-zord-text-dim">{user.lastLogin}</td>
                <td className="px-4 py-3">
                  <button className="text-xs text-zord-accent hover:underline">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
