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
  gtmId: string
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
    minHeight: '100%',
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
        {props.gtmId && (
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${props.gtmId}');`,
            }}
          />
        )}
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <meta
          name="description"
          content="Preview themes from the VSCode marketplace."
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@_jschr" />
        <meta name="twitter:url" content="https://vscodethemes.com" />
        <meta name="twitter:title" content="VSCodeThemes" />
        <meta
          name="twitter:description"
          content="Preview themes from the VSCode marketplace."
        />
        <meta
          name="twitter:image"
          content={`https://vscodethemes.com/${require('../assets/screenshot.png')}`}
        />
        <link rel="shortcut icon" href={`/${props.favicon}`} />
        {helmet.title.toComponent()}
        <style
          dangerouslySetInnerHTML={{
            __html: props.css,
          }}
        />
      </head>
      <body>
        {props.gtmId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${props.gtmId}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}
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
