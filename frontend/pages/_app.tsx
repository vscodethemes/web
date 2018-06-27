import { Context } from 'next'
import App, { Container } from 'next/app'
import { SingletonRouter } from 'next/router'
import * as React from 'react'
import { App as AppWrapper } from '../components'

interface InitialProps {
  Component: any
  router: SingletonRouter
  ctx: Context
}

export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }: InitialProps) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  refetchInitialProps = () => {
    const { router } = this.props
    // Re-fetch initial props by re-routing to the current path.
    router.reload(router.route)
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <Container>
        <AppWrapper>
          <Component
            {...pageProps}
            refetchInitialProps={this.refetchInitialProps}
          />
        </AppWrapper>
      </Container>
    )
  }
}
