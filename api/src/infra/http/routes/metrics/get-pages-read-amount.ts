import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { makeGetPagesReadAmountUseCase } from '../../../factories/make-get-pages-read-amount-use-case.ts'
import { BadRequestError } from '../../_errors/bad-request-error.ts'
import { verifyJWT } from '../../hooks/verify-jwt.ts'

const getPagesReadAmountUseCase = makeGetPagesReadAmountUseCase()

export const getPagesReadAmount: FastifyPluginCallbackZod = (app) => {
  app.get(
    '/metrics/pages-read-amount',
    {
      preHandler: [verifyJWT],
      schema: {
        tags: ['metrics'],
        summary: 'Get Pages Read Amount',
        security: [{ bearerAuth: [] }],
        response: {
          200: z.object({
            amount: z.number(),
          }),
        },
      },
    },
    async (request, reply) => {
      const result = await getPagesReadAmountUseCase.execute({
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
