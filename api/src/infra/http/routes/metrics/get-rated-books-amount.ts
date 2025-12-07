import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { makeGetRatedBooksAmountUseCase } from '../../../factories/make-get-rated-books-amount-use-case.ts'
import { BadRequestError } from '../../_errors/bad-request-error.ts'
import { verifyJWT } from '../../hooks/verify-jwt.ts'

const getRatedBooksAmountUseCase = makeGetRatedBooksAmountUseCase()

export const getRatedBooksAmount: FastifyPluginCallbackZod = (app) => {
  app.get(
    '/metrics/rated-books-amount',
    {
      preHandler: [verifyJWT],
      schema: {
        tags: ['metrics'],
        summary: 'Get Rated Books Amount',
        security: [{ bearerAuth: [] }],
        response: {
          200: z.object({
            amount: z.number(),
          }),
        },
      },
    },
    async (request, reply) => {
      const result = await getRatedBooksAmountUseCase.execute({
        readerId: request.user.sub,
      })

      if (result.isLeft()) {
        throw new BadRequestError()
      }

      const { amount } = result.value

      return reply.status(200).send({
        amount,
      })
    },
  )
}
