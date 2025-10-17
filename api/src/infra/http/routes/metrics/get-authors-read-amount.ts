import { countDistinct, eq } from 'drizzle-orm'
import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { db } from '../../../database/drizzle/client.ts'
import { schema } from '../../../database/drizzle/schema/index.ts'
import { verifyJWT } from '../../hooks/verify-jwt.ts'

export const getAuthorsReadAmount: FastifyPluginCallbackZod = (app) => {
  app.get(
    '/metrics/authors-read-amount',
    {
      preHandler: [verifyJWT],
      schema: {
        tags: ['metrics'],
        summary: 'Get Authors Read Amount',
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
          amount: countDistinct(schema.books.author),
        })
        .from(schema.books)
        .innerJoin(schema.ratings, eq(schema.ratings.bookId, schema.books.id))
        .where(eq(schema.ratings.userId, request.user.sub))

      const authorsReadAmount = result[0]

      return reply.status(200).send({
        amount: authorsReadAmount?.amount ?? 0,
      })
    },
  )
}
