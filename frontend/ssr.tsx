import { extractCritical } from 'emotion-server'
import * as React from 'react'
import { renderToStaticMarkup, renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import App from './components/App'
import Document, { DocumentProps } from './components/Document'

export interface SSROptions {
  path: string
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
  const js = assets.filter(value => /\.js$/.test(value))
  const favicon = assets.find(value => /\.ico$/.test(value))

  const { html: body, css, ids: cssIds } = extractCritical(
    renderToString(
      <StaticRouter location={{ pathname: options.path }}>
        <App />
      </StaticRouter>,
    ),
  )

  const props: DocumentProps = {
    favicon,
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
