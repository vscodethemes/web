import { css } from 'emotion'
import { Context } from 'next'
import * as React from 'react'
import sentry from '../clients/sentry'
import { Paragraph } from '../components'

interface ErrorProps {
  statusCode?: number
}

const styles = {
  container: css({
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }),
}

class ErrorPage extends React.Component<ErrorProps> {
  static async getInitialProps({ res, err }: Context): Promise<ErrorProps> {
    if (err && sentry) {
      sentry.captureException(err)
    } else {
      console.error(err)
    }

    let statusCode
    if (res && res.statusCode) {
      statusCode = res.statusCode
    } else if (err && err.statusCode) {
      statusCode = err.statusCode
    }

    return { statusCode }
  }

  render() {
    const { statusCode } = this.props

    if (statusCode === 404) {
      return (
        <div className={styles.container}>
          <Paragraph text="Page not found." />
        </div>
      )
    }

    return (
      <div className={styles.container}>
        <Paragraph text="Oops! Something went wrong." />
      </div>
    )
  }
}

export default ErrorPage
