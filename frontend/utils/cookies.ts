import { LanguageOptions } from '@vscodethemes/types'
import { Context } from 'next'
import Cookie from 'universal-cookie'

export function getCookie(ctx?: Context) {
  return ctx && ctx.req ? new Cookie(ctx.req.headers.cookie) : new Cookie()
}

export function getLanguage(ctx: Context): LanguageOptions {
  const cookie = getCookie(ctx)
  switch (cookie.get('language')) {
    case LanguageOptions.html:
      return LanguageOptions.html
    case LanguageOptions.css:
      return LanguageOptions.css
    default:
      return LanguageOptions.javascript
  }
}

export function setLanguage(language: LanguageOptions) {
  const cookie = getCookie()
  cookie.set('language', language)
}
