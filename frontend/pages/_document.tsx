import { extractCritical } from 'emotion-server'
import { Context } from 'next'
import Document, { Head, Main, NextScript } from 'next/document'
import * as React from 'react'

const GTM_ID = process.env.GTM_ID

export default class PageDocument extends Document {
  static getInitialProps(ctx: Context) {
    const page = ctx.renderPage()
    const styles = extractCritical(page.html)
    return { ...page, ...styles }
  }

  constructor(props: any) {
    super(props)
    if (props.ids) {
      props.__NEXT_DATA__.ids = props.ids
    }
  }

  render() {
    return (
      <html>
        <Head>
          {GTM_ID && (
            <script
              dangerouslySetInnerHTML={{
                __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');`,
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
          <meta name="twitter:image" content="/static/screenshot.png" />
          <link rel="shortcut icon" href="/static/icon.png" />
          <style dangerouslySetInnerHTML={{ __html: this.props.css }} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
