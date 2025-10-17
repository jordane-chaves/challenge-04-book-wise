import { desc, eq } from 'drizzle-orm'
import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { db } from '../../../database/drizzle/client.ts'
import { schema } from '../../../database/drizzle/schema/index.ts'
import { env } from '../../../env.ts'
import { verifyJWT } from '../../hooks/verify-jwt.ts'

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
      const result = await db
        .select({
          id: schema.ratings.id,
          coverUrl: schema.books.coverUrl,
          bookName: schema.books.name,
          bookAuthor: schema.books.author,
          description: schema.ratings.description,
          rating: schema.ratings.rating,
          createdAt: schema.ratings.createdAt,
        })
        .from(schema.ratings)
        .innerJoin(schema.books, eq(schema.books.id, schema.ratings.bookId))
        .where(eq(schema.ratings.userId, request.user.sub))
        .orderBy(desc(schema.ratings.createdAt))
        .limit(1)

      if (result.length === 0) {
        return reply.status(200).send({
          rating: null,
        })
      }

      const rating = result[0]

      const coverUrl = new URL(
        `/public/books/${rating.coverUrl}`,
        env.API_BASE_URL,
      )

      return reply.status(200).send({
        rating: {
          id: rating.id,
          bookAuthor: rating.bookAuthor,
          bookName: rating.bookName,
          coverUrl: coverUrl.toString(),
          description: rating.description,
          rating: rating.rating,
          createdAt: rating.createdAt,
        },
      })
    },
  )
}
