import type { UseCaseError } from '../use-case-error.ts'

export class ConflictError extends Error implements UseCaseError {
  constructor() {
    super('Conflict error.')
  }
}
