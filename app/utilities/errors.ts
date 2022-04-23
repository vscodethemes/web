export class BadRequestError extends Error {
  public name = 'BadRequestError';
  public status = 400;
  public expose = true;

  constructor(message: string) {
    super(message);
    Error.captureStackTrace(this, BadRequestError);
  }
}

export class UnauthorizedError extends Error {
  public name = 'UnauthorizedError';
  public status = 400;
  public expose = true;

  constructor(message: string) {
    super(message);
    Error.captureStackTrace(this, UnauthorizedError);
  }
}
