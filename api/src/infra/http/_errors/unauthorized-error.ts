import { HttpBaseError } from './http-base-error.ts'

export class UnauthorizedError extends HttpBaseError {
  /**
   * The HTTP response status code will be 401.
   *
   * @example
   * `throw new UnauthorizedError()`
   *
   * @param message error description; by default is `"Unauthorized"`
   */
  constructor(message = 'Unauthorized', code = 'UNAUTHORIZED') {
    super(message, 401, code)
  }
}
