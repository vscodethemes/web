import 'isomorphic-fetch'
import getConfig from 'next/config'
import * as qs from 'querystring'

const { publicRuntimeConfig } = getConfig()
const { tokenizeEndpoint } = publicRuntimeConfig

export async function tokenize(
  theme: string,
  lang: string,
  code: string,
  signal?: AbortSignal,
) {
  const url = `${tokenizeEndpoint}?${qs.stringify({ theme, lang, code })}`
  const res = await fetch(url, { method: 'GET', signal })
  if (!res.ok) {
    throw new Error(res.statusText)
  }
  const html = await res.text()
  return html
}
