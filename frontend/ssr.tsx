import { extractCritical } from 'emotion-server'
import * as React from 'react'
import { renderToStaticMarkup, renderToString } from 'react-dom/server'
import AppContainer from './components/AppContainer'
import Template from './components/Template'

// import { AppProps } from './components/App'

export interface SSROptions {
  // appProps: AppProps
  enableGoogleAnalytics: boolean
  trackingId: string
  enableDevServer: boolean
  webpackStats: any
}

export interface SSR {
  cssIds: any
  // props: AppProps
}

export default function ssr(options: SSROptions) {
  const assets = Object.keys(options.webpackStats.compilation.assets)
  const js = assets.filter(value => value.match(/\.js$/))

  const { html: body, css, ids: cssIds } = extractCritical(
    renderToString(<AppContainer />),
  )

  const props = {
    css,
    js,
    body,
    ssr: { cssIds /*, props: options.appProps*/ },
    enableDevServer: options.enableDevServer,
    enableGoogleAnalytics: options.enableGoogleAnalytics,
    trackingId: options.trackingId,
  }

  const html = `
    <!doctype html>
    ${renderToStaticMarkup(<Template {...props} />)}
  `

  return html
}
