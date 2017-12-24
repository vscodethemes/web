// Transient errors representent temporary failures to process a message.
//    e.g. A failure to fetch from VSCode Marketplace or Github APIs.
// https://neiljbrown.com/2016/11/25/designing-message-consumer-error-handler-for-amazon-sqs/
const transientJobError = Symbol('TransientJobError')

export default class TransientJobError extends Error {
  public static is = (error: any) => {
    return (
      error &&
      typeof error === 'object' &&
      error.transientJobError === transientJobError
    )
  }

  public transientJobError: symbol

  constructor(message: string) {
    super(message)
    this.transientJobError = transientJobError
    Error.captureStackTrace(this, TransientJobError)
    Object.setPrototypeOf(this, new.target.prototype)
  }
}
