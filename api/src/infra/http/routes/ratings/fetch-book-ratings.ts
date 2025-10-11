import { eq } from 'drizzle-orm'
import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { db } from '../../../database/drizzle/client.ts'
import { schema } from '../../../database/drizzle/schema/index.ts'

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

      const ratings = await db
        .select({
          id: schema.ratings.id,
          userId: schema.ratings.userId,
          user: schema.users.name,
          avatarUrl: schema.users.avatarUrl,
          description: schema.ratings.description,
          rating: schema.ratings.rating,
          createdAt: schema.ratings.createdAt,
        })
        .from(schema.ratings)
        .innerJoin(schema.users, eq(schema.users.id, schema.ratings.userId))
        .where(eq(schema.ratings.bookId, bookId))

      return reply.status(200).send({
        ratings,
      })
    },
  )
}
