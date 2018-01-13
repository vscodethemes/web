import { extractCritical } from 'emotion-server'
import * as React from 'react'
import { renderToStaticMarkup, renderToString } from 'react-dom/server'
import AppContainer from './components/AppContainer'
import Template, { TemplateProps } from './components/Template'

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
    renderToString(<AppContainer />),
  )

  const props: TemplateProps = {
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
    ${renderToStaticMarkup(<Template {...props} />)}
  `

  return html
}
