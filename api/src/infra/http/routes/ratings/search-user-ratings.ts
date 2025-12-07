import dayjs from 'dayjs'
import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { env } from '../../../env.ts'
import { makeSearchReaderRatingsUseCase } from '../../../factories/make-search-reader-ratings-use-case.ts'
import { BadRequestError } from '../../_errors/bad-request-error.ts'
import { verifyJWT } from '../../hooks/verify-jwt.ts'

const searchReaderRatingsUseCase = makeSearchReaderRatingsUseCase()

const ratingResponseSchema = z.object({
  id: z.string(),
  author: z.string(),
  name: z.string(),
  coverUrl: z.string(),
  description: z.string(),
  rating: z.number(),
})

type RatingResponseSchema = z.infer<typeof ratingResponseSchema>

export const searchUserRatings: FastifyPluginCallbackZod = (app) => {
  app.get(
    '/ratings',
    {
      preHandler: [verifyJWT],
      schema: {
        tags: ['ratings'],
        summary: 'Search User Ratings',
        description: 'Search for books rated by the authenticated user',
        security: [{ bearerAuth: [] }],
        querystring: z.object({
          query: z.string().optional(),
        }),
        response: {
          200: z.object({
            ratings: z.record(z.string(), z.array(ratingResponseSchema)).meta({
              description:
                'Grouped ratings by date. The key is date in format `YYYY-MM-DD`',
              example: {
                '2025-10-16': [
                  {
                    id: '48b86ac2-014e-401d-bcbb-331ce5f4a457',
                    author: 'Isaac Asimov',
                    name: 'O fim da eternidade',
                    coverUrl: 'o-fim-da-eternidade.png',
                    description:
                      'Celebrer alii consectetur desparatus summa. Dolor crudelis appositus subnecto uter crustulum perferendis approbo depulso. Traho voveo talis.',
                    rating: 4.5,
                  },
                ],
                '2025-08-16': [
                  {
                    id: 'd0590f9a-dd89-42fd-9bbb-bf26c2e4dcf9',
                    author: 'Eric Evans',
                    name: 'Domain-Driven Design',
                    coverUrl: 'domain-driven-design.png',
                    description:
                      'Utilis asperiores vobis quisquam adversus. Curtus a conservo somnus cupressus volup consectetur vos. Deinde quaerat terga tamdiu arceo maiores cavus velut.',
                    rating: 2.5,
                  },
                ],
              },
            }),
          }),
        },
      },
    },
    async (request, reply) => {
      const { query } = request.query

      const result = await searchReaderRatingsUseCase.execute({
        readerId: request.user.sub,
        query,
      })

      if (result.isLeft()) {
        throw new BadRequestError()
      }

      const { ratings } = result.value

      const mappedRatings = ratings.reduce(
        (result, rating) => {
          const formattedDate = dayjs(rating.createdAt).format('YYYY-MM-DD')
          const isDateIncluded = formattedDate in result

          const coverUrl = new URL(
            `/public/books/${rating.coverUrl}`,
            env.API_BASE_URL,
          ).toString()

          const item: RatingResponseSchema = {
            id: rating.ratingId.toString(),
            name: rating.title,
            author: rating.author,
            coverUrl,
            description: rating.description,
            rating: rating.score,
          }

          if (isDateIncluded) {
            result[formattedDate].push(item)
          } else {
            result[formattedDate] = [item]
          }

          return result
        },
        {} as Record<string, RatingResponseSchema[]>,
      )

      return reply.status(200).send({
        ratings: mappedRatings,
      })
    },
  )
}
