import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { makeGetMostReadCategoryUseCase } from '../../../factories/make-get-most-read-category-use-case.ts'
import { BadRequestError } from '../../_errors/bad-request-error.ts'
import { verifyJWT } from '../../hooks/verify-jwt.ts'

const getMostReadCategoryUseCase = makeGetMostReadCategoryUseCase()

export const getMostReadCategory: FastifyPluginCallbackZod = (app) => {
  app.get(
    '/metrics/most-read-category',
    {
      preHandler: [verifyJWT],
      schema: {
        tags: ['metrics'],
        summary: 'Get Most Read Category',
        security: [{ bearerAuth: [] }],
        response: {
          200: z.object({
            category: z.string().nullable(),
          }),
        },
      },
    },
    async (request, reply) => {
      const result = await getMostReadCategoryUseCase.execute({
        readerId: request.user.sub,
      })

      if (result.isLeft()) {
        throw new BadRequestError()
      }

      const { category } = result.value

      return reply.status(200).send({
        category: category?.name ?? null,
      })
    },
  )
}
