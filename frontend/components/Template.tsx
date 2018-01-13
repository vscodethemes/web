import * as React from 'react'
import { SSR } from '../ssr'

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
        <title>{props.enableDevServer ? '[DEV] ' : ''}VSCodeThemes</title>
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
