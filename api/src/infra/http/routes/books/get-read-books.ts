import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { makeGetReadBooksUseCase } from '../../../factories/make-get-read-books-use-case.ts'
import { BadRequestError } from '../../_errors/bad-request-error.ts'
import { verifyJWT } from '../../hooks/verify-jwt.ts'

const getReadBooksUseCase = makeGetReadBooksUseCase()

export const getReadBooks: FastifyPluginCallbackZod = (app) => {
  app.get(
    '/books/read',
    {
      preHandler: [verifyJWT],
      schema: {
        tags: ['books'],
        summary: 'Get Read Books',
        response: {
          200: z.object({
            booksIds: z.uuid().array(),
          }),
        },
      },
    },
    async (request, reply) => {
      const result = await getReadBooksUseCase.execute({
        readerId: request.user.sub,
      })

      if (result.isLeft()) {
        throw new BadRequestError()
      }

      const { booksIds } = result.value

      return reply.status(200).send({
        booksIds,
      })
    },
  )
}
