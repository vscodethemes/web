import { Context } from 'next'
import NextError from 'next/error'
import sentry from '../clients/sentry'

class MyError extends NextError {
  static async getInitialProps(ctx: Context) {
    if (ctx.err) {
      sentry.captureException(ctx.err)
    }
    // @types/next is broken and uses default export so we can't
    // use module augmentation to fix it: https://github.com/zeit/next.js/issues/3396
    const errorProps = await (NextError as any).getInitialProps(ctx)
    return errorProps
  }
}

export default MyError
