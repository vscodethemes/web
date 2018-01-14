import { injectGlobal } from 'emotion'
import * as React from 'react'
import { SSR } from '../ssr'
import * as theme from '../theme'

export interface TemplateProps {
  css: string
  js: string[]
  body: string
  ssr: SSR
  enableDevServer: boolean
  enableGoogleAnalytics: boolean
  googleAnalyticsTrackingId: string
}

const cdnBaseUrl = 'https://cdnjs.cloudflare.com/ajax/libs/'

injectGlobal({
  html: {
    fontSize: theme.rootFontSize,
  },
  body: {
    fontFamily: theme.fontFamily,
    margin: 0,
  },
})

export default function Template(props: TemplateProps) {
  const scripts: React.ReactNode[] = []

  // Add the dev server reload script in development.
  if (props.enableDevServer) {
    scripts.push(<script src="http://localhost:8080/webpack-dev-server.js" />)
  }

  // Add the webpack bundle.
  props.js.forEach(src => scripts.push(<script src={src} />))

  return (
    <html lang="en" data-timestamp={new Date().toISOString()}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <link rel="shortcut icon" href={require('../assets/icon.png')} />
        <link
          href="https://fonts.googleapis.com/css?family=Montserrat:500,700"
          rel="stylesheet"
        />
        <title>{props.enableDevServer ? '[DEV] ' : ''}VSCodeThemes</title>
        {/* <style>{`html{font-size: 14px;} body{margin: 0;}`}</style> */}
        <style>{props.css}</style>
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
