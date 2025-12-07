import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { env } from '../../../env.ts'
import { makeGetLastReaderRatingUseCase } from '../../../factories/make-get-last-reader-rating-use-case.ts'
import { BadRequestError } from '../../_errors/bad-request-error.ts'
import { verifyJWT } from '../../hooks/verify-jwt.ts'

const getLastRatingUseCase = makeGetLastReaderRatingUseCase()

export const getLastRating: FastifyPluginCallbackZod = (app) => {
  app.get(
    '/ratings/last',
    {
      preHandler: [verifyJWT],
      schema: {
        tags: ['ratings'],
        summary: 'Get Last User Rating',
        security: [{ bearerAuth: [] }],
        response: {
          200: z.object({
            rating: z
              .object({
                id: z.string(),
                coverUrl: z.string(),
                bookName: z.string(),
                bookAuthor: z.string(),
                description: z.string(),
                rating: z.number(),
                createdAt: z.date(),
              })
              .nullable(),
          }),
        },
      },
    },
    async (request, reply) => {
      const result = await getLastRatingUseCase.execute({
        readerId: request.user.sub,
      })

      if (result.isLeft()) {
        throw new BadRequestError()
      }

      const { rating } = result.value

      return reply.status(200).send({
        rating: rating
          ? {
              id: rating.ratingId.toString(),
              bookAuthor: rating.author,
              bookName: rating.title,
              coverUrl: new URL(
                `/public/books/${rating.coverUrl}`,
                env.API_BASE_URL,
              ).toString(),
              description: rating.description,
              rating: rating.score,
              createdAt: rating.createdAt,
            }
          : null,
      })
    },
  )
}
