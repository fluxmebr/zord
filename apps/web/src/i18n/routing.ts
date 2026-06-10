import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['he', 'en', 'ru', 'pt'],
  defaultLocale: 'he',
  localePrefix: 'always',
})
