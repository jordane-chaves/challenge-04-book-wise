import type { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import { hasZodFastifySchemaValidationErrors } from 'fastify-type-provider-zod'
import { app } from './app.ts'
import { env } from './env.ts'
import { HttpBaseError } from './http/_errors/http-base-error.ts'

export function errorHandler(
  error: FastifyError,
  _: FastifyRequest,
  reply: FastifyReply,
) {
  if (hasZodFastifySchemaValidationErrors(error)) {
    return reply.code(400).send({
      message: 'Validation error',
      errors: error.validation,
    })
  }

  if (error instanceof HttpBaseError) {
    return reply.status(error.statusCode).send({ message: error.message })
  }

  if (env.NODE_ENV !== 'production') {
    app.log.error(error)
  } else {
    // TODO: Here we should log to an external tool
  }

  return reply.status(500).send({ message: 'Internal server error' })
}
