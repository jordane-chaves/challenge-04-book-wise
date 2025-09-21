import type { HttpError } from '../../../core/types/http-error.ts'

export abstract class HttpBaseError extends Error implements HttpError {
  code?: string | undefined
  statusCode: number

  protected constructor(message: string, statusCode: number, code?: string) {
    super(message)
    this.statusCode = statusCode
    this.code = code
  }
}
