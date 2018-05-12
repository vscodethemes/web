import 'isomorphic-fetch'
import getConfig from 'next/config'
import * as qs from 'querystring'

const { publicRuntimeConfig } = getConfig()
const { tokenizeEndpoint } = publicRuntimeConfig

export async function tokenize(theme: string, lang: string, code: string) {
  const url = `${tokenizeEndpoint}?${qs.stringify({ theme, lang, code })}`
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(res.statusText)
  }
  const html = await res.text()
  return html
}
