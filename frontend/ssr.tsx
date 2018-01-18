import { extractCritical } from 'emotion-server'
import * as React from 'react'
import { renderToStaticMarkup, renderToString } from 'react-dom/server'
import App from './components/App'
import Document, { DocumentProps } from './components/Document'

export interface SSROptions {
  enableDevServer: boolean
  enableGoogleAnalytics: boolean
  googleAnalyticsTrackingId: string
  webpackStats: any
}

export interface SSR {
  cssIds: any
}

export default function ssr(options: SSROptions) {
  const assets = Object.keys(options.webpackStats.compilation.assets)
  const js = assets.filter(value => value.match(/\.js$/))

  const { html: body, css, ids: cssIds } = extractCritical(
    renderToString(<App />),
  )

  console.log(css)

  const props: DocumentProps = {
    css,
    js,
    body,
    ssr: { cssIds },
    enableDevServer: options.enableDevServer,
    enableGoogleAnalytics: options.enableGoogleAnalytics,
    googleAnalyticsTrackingId: options.googleAnalyticsTrackingId,
  }

  const html = `
    <!doctype html>
    ${renderToStaticMarkup(<Document {...props} />)}
  `

  return html
}
