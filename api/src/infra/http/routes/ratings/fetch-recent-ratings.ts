import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { env } from '../../../env.ts'
import { makeFetchRecentRatingsUseCase } from '../../../factories/make-fetch-recent-ratings-use-case.ts'
import { BadRequestError } from '../../_errors/bad-request-error.ts'

const fetchRecentRatingsUseCase = makeFetchRecentRatingsUseCase()

export const fetchRecentRatings: FastifyPluginCallbackZod = (app) => {
  app.get(
    '/ratings/recent',
    {
      schema: {
        tags: ['ratings'],
        summary: 'Fetch Recent Ratings',
        response: {
          200: z.object({
            ratings: z.array(
              z.object({
                id: z.string(),
                userName: z.string(),
                avatarUrl: z.string().nullable(),
                coverUrl: z.string(),
                bookName: z.string(),
                bookAuthor: z.string(),
                description: z.string(),
                rating: z.number(),
                createdAt: z.date(),
              }),
            ),
          }),
        },
      },
    },
    async (_, reply) => {
      const result = await fetchRecentRatingsUseCase.execute()

      if (result.isLeft()) {
        throw new BadRequestError()
      }

      const { ratings } = result.value

      return reply.status(200).send({
        ratings: ratings.map((rating) => {
          const coverUrl = new URL(
            `/public/books/${rating.coverUrl}`,
            env.API_BASE_URL,
          ).toString()

          return {
            id: rating.ratingId.toString(),
            description: rating.description,
            rating: rating.score,
            userName: rating.reader,
            avatarUrl: rating.avatarUrl ?? null,
            bookName: rating.title,
            bookAuthor: rating.author,
            coverUrl: coverUrl,
            createdAt: rating.createdAt,
          }
        }),
      })
    },
  )
}
