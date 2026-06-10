import createMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'
import { routing } from './i18n/routing'

const intlMiddleware = createMiddleware(routing)

const PUBLIC_PATHS = ['/login', '/forgot-password', '/super-admin/login', '/landing']

const ROOT_PATHS = ['/', '/he', '/en', '/ru', '/pt']

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const isPublicPath = PUBLIC_PATHS.some((path) => pathname.includes(path))
  const isRootPath = ROOT_PATHS.some((path) => pathname === path)

  if (!isPublicPath && !isRootPath) {
    const token = request.cookies.get('zord_access_token')?.value
    const localePattern = /^\/(he|en|ru|pt)(\/|$)/
    const match = pathname.match(localePattern)
    const locale = match?.[1] ?? 'he'

    if (!token) {
      return NextResponse.redirect(new URL(`/${locale}/login`, request.url))
    }
  }

  return intlMiddleware(request)
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
