import createMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'
import { routing } from './i18n/routing'

const intlMiddleware = createMiddleware(routing)

const PUBLIC_PATHS = ['/login', '/forgot-password', '/super-admin/login']

// Regex: root locale paths like /he /en /ru /pt (with or without trailing slash)
const ROOT_RE = /^\/(he|en|ru|pt)\/?$/

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const isPublic = PUBLIC_PATHS.some((p) => pathname.includes(p))
  const isRoot = pathname === '/' || ROOT_RE.test(pathname)

  if (!isPublic && !isRoot) {
    const token = request.cookies.get('zord_access_token')?.value
    if (!token) {
      const match = pathname.match(/^\/(he|en|ru|pt)(\/|$)/)
      const locale = match?.[1] ?? 'he'
      return NextResponse.redirect(new URL(`/${locale}/login`, request.url))
    }
  }

  return intlMiddleware(request)
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
