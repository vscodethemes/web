import { css } from 'emotion'
import { Context } from 'next'
import * as React from 'react'
import sentry from '../clients/sentry'
import { Paragraph } from '../components'

interface ErrorProps {
  statusCode?: number
  message?: string
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
      console.error(err) // tslint:disable-line
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
    const { statusCode, message } = this.props
    let text = message

    if (statusCode === 404) {
      text = 'Page not found.'
    } else if (statusCode) {
      // Hide internal server error messages.
      text = 'Oops! Something went wrong.'
    }

    return (
      <div className={styles.container}>
        <Paragraph text={text} />
      </div>
    )
  }
}

export default ErrorPage
