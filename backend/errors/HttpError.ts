const httpError = Symbol('HttpError')

export default class HttpError extends Error {
  public static is = (error: any) => {
    return error && typeof error === 'object' && error.httpError === httpError
  }

  public statusCode: number
  public httpError: symbol

  constructor(statusCode: number, message: string) {
    super(message)
    this.statusCode = statusCode
    this.httpError = httpError
    Error.captureStackTrace(this, HttpError)
    Object.setPrototypeOf(this, new.target.prototype)
  }
}
