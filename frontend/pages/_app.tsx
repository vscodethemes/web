import { Context } from 'next'
import App, { Container } from 'next/app'
import { SingletonRouter } from 'next/router'
import * as React from 'react'
import { App as AppWrapper, Modal } from '../components'

interface InitialProps {
  Component: any
  router: SingletonRouter
  ctx: Context
}

interface MyAppProps {
  router: SingletonRouter
  Component: any
  pageProps: any
}

interface MyAppState {
  Page: any
  pageProps: any
  PreviousPage?: any
  previousPageProps?: any
}

export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }: InitialProps) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  static getDerivedStateFromProps(
    props: MyAppProps,
    state: MyAppState,
  ): MyAppState {
    // Only update previous page state if the new props component is different
    // than the current page in state. This prevents issues when updating language
    // with refetchInitialProps.
    if (props.Component !== state.Page) {
      return {
        Page: props.Component,
        pageProps: props.pageProps,
        PreviousPage: state.Page,
        previousPageProps: state.pageProps,
      }
    }

    // We always need to update the page state.
    return {
      Page: props.Component,
      pageProps: props.pageProps,
    }
  }

  state: MyAppState = {
    Page: null,
    pageProps: null,
    PreviousPage: null,
    previousPageProps: null,
  }

  refetchInitialProps = () => {
    const { router } = this.props
    // Re-fetch initial props by re-routing to the current path.
    router.reload(router.route)
  }

  goBack = () => {
    const { router } = this.props
    router.back()
  }

  render() {
    const { Page, pageProps, PreviousPage, previousPageProps } = this.state
    const isModal = PreviousPage && Page.showAsModal

    return (
      <Container>
        <AppWrapper>
          {isModal ? (
            <PreviousPage key="page" {...previousPageProps} />
          ) : (
            <Page
              key="page"
              {...pageProps}
              refetchInitialProps={this.refetchInitialProps}
            />
          )}
          {isModal && (
            <Modal onEscape={this.goBack}>
              <Page
                {...pageProps}
                refetchInitialProps={this.refetchInitialProps}
                onClose={this.goBack}
              />
            </Modal>
          )}
        </AppWrapper>
      </Container>
    )
  }
}
