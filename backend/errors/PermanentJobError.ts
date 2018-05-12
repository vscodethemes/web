// Permanent errors representent permanent failures to process a message.
//    e.g. Received an invalid message, theme or repository structure.
// https://neiljbrown.com/2016/11/25/designing-message-consumer-error-handler-for-amazon-sqs/
const parmanentJobError = Symbol('PermanentJobError')

export default class PermanentJobError extends Error {
  public static is = (error: any) => {
    return (
      error &&
      typeof error === 'object' &&
      error.parmanentJobError === parmanentJobError
    )
  }

  public parmanentJobError: symbol

  constructor(message: string) {
    super(message)
    this.parmanentJobError = parmanentJobError
    Error.captureStackTrace(this, PermanentJobError)
    Object.setPrototypeOf(this, new.target.prototype)
  }
}
