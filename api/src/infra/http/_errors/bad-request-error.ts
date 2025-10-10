import { HttpBaseError } from './http-base-error.ts'

export class BadRequestError extends HttpBaseError {
  /**
   * The HTTP response status code will be 400.
   *
   * @example
   * `throw new BadRequestError()`
   *
   * @param message error description; by default is `"BadRequest"`
   */
  constructor(message = 'Bad request', code = 'BAD_REQUEST') {
    super(message, 400, code)
  }
}
