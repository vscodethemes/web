import { injectGlobal } from 'emotion'
import * as React from 'react'
import { Helmet } from 'react-helmet'
import { SSR } from '../ssr'
import theme, { em, fontFamily, rootFontSize } from '../theme'

export interface DocumentProps {
  favicon: string
  css: string
  js: string[]
  body: string
  ssr: SSR
  enableDevServer: boolean
  enableGoogleAnalytics: boolean
  googleAnalyticsTrackingId: string
}

injectGlobal({
  html: {
    fontSize: rootFontSize,
  },
  body: {
    fontFamily: theme.fontFamily,
    fontWeight: 'normal',
    letterSpacing: em(0.3),
    margin: 0,
    backgroundColor: theme.colors.background,
  },
  '*, *:before, *:after': {
    boxSizing: 'border-box',
  },
})

export default function Document(props: DocumentProps) {
  const helmet = Helmet.renderStatic()
  const scripts: React.ReactNode[] = []

  // Add the dev server reload script in development.
  if (props.enableDevServer) {
    scripts.push(<script src="http://localhost:8080/webpack-dev-server.js" />)
  }
  // Add the webpack bundle.
  props.js.forEach(src => scripts.push(<script src={`/${src}`} />))

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <link rel="shortcut icon" href={props.favicon} />
        <link
          href={`https://fonts.googleapis.com/css?family=${fontFamily}:400,600`}
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Source+Code+Pro:400"
          rel="stylesheet"
        />
        {helmet.title.toComponent()}
        <style
          dangerouslySetInnerHTML={{
            __html: props.css,
          }}
        />
      </head>
      <body>
        <div id="react-root" dangerouslySetInnerHTML={{ __html: props.body }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ssr = ${JSON.stringify(props.ssr)}`,
          }}
        />
        {scripts}
      </body>
    </html>
  )
}
