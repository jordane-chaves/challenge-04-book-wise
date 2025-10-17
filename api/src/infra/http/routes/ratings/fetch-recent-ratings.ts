import { desc, eq } from 'drizzle-orm'
import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { db } from '../../../database/drizzle/client.ts'
import { schema } from '../../../database/drizzle/schema/index.ts'
import { env } from '../../../env.ts'

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
      const result = await db
        .select({
          id: schema.ratings.id,
          userName: schema.users.name,
          avatarUrl: schema.users.avatarUrl,
          coverUrl: schema.books.coverUrl,
          bookName: schema.books.name,
          bookAuthor: schema.books.author,
          description: schema.ratings.description,
          rating: schema.ratings.rating,
          createdAt: schema.ratings.createdAt,
        })
        .from(schema.ratings)
        .innerJoin(schema.books, eq(schema.books.id, schema.ratings.bookId))
        .innerJoin(schema.users, eq(schema.users.id, schema.ratings.userId))
        .orderBy(desc(schema.ratings.createdAt))

      const ratings = result.map((item) => {
        const coverUrl = new URL(
          `/public/books/${item.coverUrl}`,
          env.API_BASE_URL,
        )

        return {
          ...item,
          coverUrl: coverUrl.toString(),
        }
      })

      return reply.status(200).send({
        ratings,
      })
    },
  )
}
