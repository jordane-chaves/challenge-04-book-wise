import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { makeGetAuthorsReadAmountUseCase } from '../../../factories/make-get-authors-read-amount-use-case.ts'
import { BadRequestError } from '../../_errors/bad-request-error.ts'
import { verifyJWT } from '../../hooks/verify-jwt.ts'

const getAuthorsReadAmountUseCase = makeGetAuthorsReadAmountUseCase()

export const getAuthorsReadAmount: FastifyPluginCallbackZod = (app) => {
  app.get(
    '/metrics/authors-read-amount',
    {
      preHandler: [verifyJWT],
      schema: {
        tags: ['metrics'],
        summary: 'Get Authors Read Amount',
        security: [{ bearerAuth: [] }],
        response: {
          200: z.object({
            amount: z.number(),
          }),
        },
      },
    },
    async (request, reply) => {
      const result = await getAuthorsReadAmountUseCase.execute({
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
