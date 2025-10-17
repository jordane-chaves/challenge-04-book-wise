import { eq, sql } from 'drizzle-orm'
import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { db } from '../../../database/drizzle/client.ts'
import { schema } from '../../../database/drizzle/schema/index.ts'
import { verifyJWT } from '../../hooks/verify-jwt.ts'

export const getPagesReadAmount: FastifyPluginCallbackZod = (app) => {
  app.get(
    '/metrics/pages-read-amount',
    {
      preHandler: [verifyJWT],
      schema: {
        tags: ['metrics'],
        summary: 'Get Pages Read Amount',
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
          amount: sql<number>`sum(${schema.books.totalPages})`.mapWith(Number),
        })
        .from(schema.books)
        .innerJoin(schema.ratings, eq(schema.ratings.bookId, schema.books.id))
        .where(eq(schema.ratings.userId, request.user.sub))

      const pagesReadAmount = result[0]

      return reply.status(200).send({
        amount: pagesReadAmount?.amount ?? 0,
      })
    },
  )
}
