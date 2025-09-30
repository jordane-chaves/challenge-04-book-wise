import { eq } from 'drizzle-orm'
import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { db } from '../../../database/drizzle/client.ts'
import { schema } from '../../../database/drizzle/schema/index.ts'
import { verifyJWT } from '../../hooks/verify-jwt.ts'

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
      const userRatings = await db
        .select()
        .from(schema.ratings)
        .where(eq(schema.ratings.userId, request.user.sub))

      const booksIds = userRatings.map((rating) => rating.bookId)

      return reply.status(200).send({
        booksIds,
      })
    },
  )
}
