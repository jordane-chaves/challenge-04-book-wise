import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { ConflictError } from '../../../../core/errors/errors/conflict-error.ts'
import { ResourceNotFoundError } from '../../../../core/errors/errors/resource-not-found-error.ts'
import { makeRateBookUseCase } from '../../../factories/make-rate-book-use-case.ts'
import { BadRequestError } from '../../_errors/bad-request-error.ts'
import { verifyJWT } from '../../hooks/verify-jwt.ts'

const rateBookUseCase = makeRateBookUseCase()

export const rateBook: FastifyPluginCallbackZod = (app) => {
  app.post(
    '/books/:bookId/ratings',
    {
      preHandler: [verifyJWT],
      schema: {
        tags: ['ratings'],
        summary: 'Rate the Book',
        security: [{ bearerAuth: [] }],
        body: z.object({
          description: z.string(),
          rating: z.number().min(0.5).max(5),
        }),
        params: z.object({
          bookId: z.string(),
        }),
        response: {
          201: z.void(),
          400: z
            .object({ message: z.string() })
            .meta({ example: { message: 'You have already rated this book' } }),
        },
      },
    },
    async (request, reply) => {
      const { bookId } = request.params
      const { description, rating } = request.body

      const result = await rateBookUseCase.execute({
        bookId,
        readerId: request.user.sub,
        description,
        score: rating,
      })

      if (result.isLeft()) {
        const error = result.value

        switch (error.constructor) {
          case ConflictError:
            throw new BadRequestError('You have already rated this book')
          case ResourceNotFoundError:
            throw new BadRequestError('Book not found')
          default:
            throw new BadRequestError()
        }
      }

      return reply.status(201).send()
    },
  )
}
