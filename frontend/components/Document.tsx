import { injectGlobal } from 'emotion'
import * as React from 'react'
import { Helmet } from 'react-helmet'
import { SSR } from '../ssr'
import theme, { em, rootFontSize } from '../theme'

export interface DocumentProps {
  favicon: string
  css: string
  js: string[]
  body: string
  ssr: SSR
  enableDevServer: boolean
  googleAnalyticsId: string
}

injectGlobal({
  '*, *:before, *:after': {
    boxSizing: 'border-box',
  },
  html: {
    height: '100%',
    fontSize: rootFontSize,
  },
  body: {
    height: '100%',
    fontFamily: theme.fontFamily,
    fontWeight: 'normal',
    letterSpacing: em(0.3),
    margin: 0,
    backgroundColor: theme.colors.background,
  },
  '#react-root': {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
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
        {props.googleAnalyticsId && (
          <script
            async={true}
            src={`https://www.googletagmanager.com/gtag/js?id=${
              props.googleAnalyticsId
            }`}
          />
        )}
        {props.googleAnalyticsId && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
  
          gtag('config', '${props.googleAnalyticsId}');
        `,
            }}
          />
        )}
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="description"
          content="Search VSCode themes with inline previews"
        />
        <link rel="shortcut icon" href={props.favicon} />
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
