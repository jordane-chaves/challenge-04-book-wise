import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { makeFetchBookRatingsUseCase } from '../../../factories/make-fetch-book-ratings-use-case.ts'
import { BadRequestError } from '../../_errors/bad-request-error.ts'

const fetchBookRatingsUseCase = makeFetchBookRatingsUseCase()

export const fetchBookRatings: FastifyPluginCallbackZod = (app) => {
  app.get(
    '/books/:bookId/ratings',
    {
      schema: {
        tags: ['ratings'],
        summary: 'Fetch Book Ratings',
        params: z.object({
          bookId: z.string(),
        }),
        response: {
          200: z.object({
            ratings: z.array(
              z.object({
                id: z.string(),
                bookId: z.string(),
                userId: z.string(),
                user: z.string(),
                avatarUrl: z.string().nullable(),
                description: z.string(),
                rating: z.number(),
                createdAt: z.date(),
              }),
            ),
          }),
        },
      },
    },
    async (request, reply) => {
      const { bookId } = request.params

      const result = await fetchBookRatingsUseCase.execute({
        bookId,
      })

      if (result.isLeft()) {
        throw new BadRequestError()
      }

      const { ratings } = result.value

      return reply.status(200).send({
        ratings: ratings.map(rating => ({
          id: rating.ratingId.toString(),
          bookId: rating.bookId.toString(),
          userId: rating.readerId.toString(),
          user: rating.reader,
          avatarUrl: rating.avatarUrl ?? null,
          rating: rating.score,
          description: rating.description,
          createdAt: rating.createdAt,
        })),
      })
    },
  )
}
