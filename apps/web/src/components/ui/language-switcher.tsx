'use client'

import { useParams, usePathname } from 'next/navigation'
import { Link } from '@/i18n/navigation'

const LOCALES = [
  { code: 'pt', flag: '🇧🇷', label: 'Português' },
  { code: 'en', flag: '🇺🇸', label: 'English' },
  { code: 'he', flag: '🇮🇱', label: 'עברית' },
  { code: 'ru', flag: '🇷🇺', label: 'Русский' },
]

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const params = useParams()
  const pathname = usePathname()
  const currentLocale = (params?.locale as string) ?? 'he'

  const getHref = (code: string) => {
    const segments = pathname.split('/')
    if (segments[1] && ['he', 'en', 'ru', 'pt'].includes(segments[1])) {
      segments[1] = code
    }
    return segments.join('/') || '/'
  }

  return (
    <div className="flex items-center gap-1">
      {LOCALES.map(({ code, flag, label }) => (
        <Link
          key={code}
          href={getHref(code)}
          locale={code as 'he' | 'en' | 'ru' | 'pt'}
          title={label}
          className={`flex h-7 w-7 items-center justify-center rounded text-base transition-all ${
            currentLocale === code
              ? 'bg-zord-accent/20 ring-1 ring-zord-accent/60'
              : 'opacity-50 hover:opacity-100 hover:bg-zord-border/40'
          }`}
        >
          {flag}
        </Link>
      ))}
    </div>
  )
}
