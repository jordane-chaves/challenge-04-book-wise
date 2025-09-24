import type { FastifyRequest } from 'fastify'
import { UnauthorizedError } from '../_errors/unauthorized-error.ts'

export async function verifyJWT(request: FastifyRequest) {
  try {
    await request.jwtVerify()
  } catch {
    throw new UnauthorizedError()
  }
}
