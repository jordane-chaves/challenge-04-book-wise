import { count, eq } from 'drizzle-orm'
import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { db } from '../../../database/drizzle/client.ts'
import { schema } from '../../../database/drizzle/schema/index.ts'
import { verifyJWT } from '../../hooks/verify-jwt.ts'

export const getRatedBooksAmount: FastifyPluginCallbackZod = (app) => {
  app.get(
    '/metrics/rated-books-amount',
    {
      preHandler: [verifyJWT],
      schema: {
        tags: ['metrics'],
        summary: 'Get Rated Books Amount',
        security: [{ bearerAuth: [] }],
        response: {
          200: z.object({
            amount: z.number(),
          }),
        },
      },
    },
    async (request, reply) => {
      const result = await db
        .select({
          amount: count(schema.books.id),
        })
        .from(schema.books)
        .innerJoin(schema.ratings, eq(schema.ratings.bookId, schema.books.id))
        .where(eq(schema.ratings.userId, request.user.sub))

      const ratedBooksAmount = result[0]

      return reply.status(200).send({
        amount: ratedBooksAmount?.amount ?? 0,
      })
    },
  )
}
