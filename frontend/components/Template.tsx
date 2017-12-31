// tslint:disable jsx-key
import * as React from 'react'
import { SSR } from '../ssr'

export interface TemplateProps {
  css: string
  js: string[]
  body: string
  ssr: SSR
  // enableGoogleAnalytics: boolean
  // trackingId: string
  enableDevServer: boolean
}

export default function Template(props: TemplateProps) {
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
        {props.js.map(src => <script src={src} />)}
        {props.enableDevServer && (
          <script src="http://localhost:8080/webpack-dev-server.js" />
        )}
      </body>
    </html>
  )
}
