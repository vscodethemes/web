import HttpError from './HttpError'

export default class BadRequestError extends HttpError {
  static statusCode = 400
  constructor(message: string) {
    super(BadRequestError.statusCode, message)
  }
}
