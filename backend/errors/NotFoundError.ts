import HttpError from './HttpError'

export default class NotFoundError extends HttpError {
  static statusCode = 404
  constructor(message: string) {
    super(NotFoundError.statusCode, message)
  }
}
