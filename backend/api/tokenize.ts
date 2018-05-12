import { Services } from '@vscodethemes/types'
import { Html5Entities } from 'html-entities'
import * as qs from 'querystring'
import * as stripComments from 'strip-json-comments'
import { BadRequestError, HttpError } from '../errors'

// Cache for a day.
export const cacheAge = 60 * 60 * 24

const entities = new Html5Entities()
const supportLanguages = ['javascript', 'css', 'html']

function addCorsHeaders(response: any) {
  response.headers = response.headers || {}
  response.headers['Access-Control-Allow-Origin'] = '*'
  response.headers['Access-Control-Allow-Methods'] = 'GET'
  response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
}

export default async function run(
  services: Services,
  event: any,
): Promise<any> {
  const { fetch, logger, reportError, tokenizer } = services
  const request = event.Records[0].cf.request
  const response = event.Records[0].cf.response
  const params = qs.parse(request.querystring)

  addCorsHeaders(response)

  try {
    if (!params.theme) {
      throw new BadRequestError('Missing `theme` in querystring.')
    }
    if (!params.code) {
      throw new BadRequestError('Missing `code` in querystring.')
    }
    if (!params.lang) {
      throw new BadRequestError('Missing `lang` in querystring.')
    }

    const themeUrl = String(params.theme)
    const code = String(params.code)
    const language = String(params.lang)

    if (supportLanguages.indexOf(language) === -1) {
      throw new BadRequestError(`Language '${language}' is not supported.`)
    }

    const res = await fetch(themeUrl, { method: 'GET' })
    if (!res.ok) {
      throw new BadRequestError(`Failed to fetch theme: ${res.statusText}.`)
    }

    let themeSettings
    try {
      themeSettings = JSON.parse(stripComments(await res.text())).tokenColors
    } catch (err) {
      throw new BadRequestError(`Failed to parse theme: ${err.message}.`)
    }

    if (!themeSettings || !Array.isArray(themeSettings)) {
      throw new BadRequestError('Failed to parse theme: Invalid themeSettings.')
    }

    const tokenize = tokenizer.create(themeSettings, language)
    const lines = code.split('\n')
    let html = ''

    for (const line of lines) {
      const tokens = tokenize.line(line)
      html += '<div>'
      for (const { token, style } of tokens) {
        const tokenText = entities.encode(token).replace(/\s/g, '&nbsp;')
        let styleText = ''
        if (style.color) styleText += `color:${style.color};`
        if (style.fontStyle) styleText += `font-style:${style.fontStyle};`
        if (style.fontWeight) styleText += `font-weight:${style.fontWeight};`
        if (style.textDecoration) {
          styleText += `text-decoration:${style.textDecoration};`
        }

        if (token) {
          html += `<span style="${styleText}">${tokenText}</span>`
        } else {
          html += '<br />'
        }
      }
      html += '</div>'
    }

    response.status = 200
    response.body = html
    response.headers['Content-Type'] = 'text/html'
    response.headers['Cache-Control'] = `max-age=${cacheAge}`
  } catch (err) {
    if (HttpError.is(err)) {
      const httpError = err as HttpError
      response.status = httpError.statusCode
      response.body = httpError.message
    } else {
      logger.error(err)
      await reportError(err)
      response.status = 500
      response.body =
        'Oops! Something has gone wrong. Please open an issue at https://github.com/jschr/vscodethemes.'
    }
  }
  return response
}
