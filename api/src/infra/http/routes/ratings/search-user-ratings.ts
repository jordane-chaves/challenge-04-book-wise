import { and, desc, eq, ilike, sql } from 'drizzle-orm'
import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { db } from '../../../database/drizzle/client.ts'
import { schema } from '../../../database/drizzle/schema/index.ts'
import { env } from '../../../env.ts'
import { verifyJWT } from '../../hooks/verify-jwt.ts'

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

      const result = await db
        .select({
          id: schema.books.id,
          author: schema.books.author,
          name: schema.books.name,
          coverUrl: schema.books.coverUrl,
          description: schema.ratings.description,
          rating: schema.ratings.rating,
          date: sql<string>`TO_CHAR(${schema.ratings.createdAt}, 'YYYY-MM-DD')`,
        })
        .from(schema.ratings)
        .innerJoin(schema.books, eq(schema.ratings.bookId, schema.books.id))
        .where(
          and(
            eq(schema.ratings.userId, request.user.sub),
            query ? ilike(schema.books.name, `%${query}%`) : undefined,
          ),
        )
        .orderBy(
          desc(sql<string>`TO_CHAR(${schema.ratings.createdAt}, 'YYYY-MM-DD')`),
        )

      const ratings = result
        .map((item) => {
          const coverUrl = new URL(
            `/public/books/${item.coverUrl}`,
            env.API_BASE_URL,
          )

          return { ...item, coverUrl: coverUrl.toString() }
        })
        .reduce(
          (result, item) => {
            const isDateIncluded = item.date in result

            if (isDateIncluded) {
              result[item.date].push(item)
            } else {
              result[item.date] = [item]
            }

            return result
          },
          {} as Record<string, RatingResponseSchema[]>,
        )

      return reply.status(200).send({
        ratings,
      })
    },
  )
}
