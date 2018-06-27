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

  render() {
    console.log('hi')
    const { Component, pageProps } = this.props
    return (
      <Container>
        <AppWrapper>
          <Component {...pageProps} />
        </AppWrapper>
      </Container>
    )
  }
}
