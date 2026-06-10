import { useTranslations } from 'next-intl'
import { LoginForm } from '@/components/layout/login-form'

export default function LoginPage() {
  return (
    <div className="relative flex h-screen items-center justify-center overflow-hidden bg-zord-bg">
      {/* Grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Classification banner */}
      <div className="absolute inset-x-0 top-0 flex h-8 items-center justify-center bg-zord-classified">
        <span className="text-classification text-xs text-red-300">
          AUTHORIZED ACCESS ONLY — ZORD INTELLIGENCE PLATFORM
        </span>
      </div>

      <LoginForm />

      {/* Bottom classification */}
      <div className="absolute inset-x-0 bottom-0 flex h-8 items-center justify-center bg-zord-classified">
        <span className="text-classification text-xs text-red-300">
          ALL ACTIVITIES ARE MONITORED AND LOGGED
        </span>
      </div>
    </div>
  )
}
