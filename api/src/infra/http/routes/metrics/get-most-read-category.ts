import { count, desc, eq } from 'drizzle-orm'
import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { db } from '../../../database/drizzle/client.ts'
import { schema } from '../../../database/drizzle/schema/index.ts'
import { verifyJWT } from '../../hooks/verify-jwt.ts'

export const getMostReadCategory: FastifyPluginCallbackZod = (app) => {
  app.get(
    '/metrics/most-read-category',
    {
      preHandler: [verifyJWT],
      schema: {
        tags: ['metrics'],
        summary: 'Get Most Read Category',
        security: [{ bearerAuth: [] }],
        response: {
          200: z.object({
            category: z.string().nullable(),
          }),
        },
      },
    },
    async (request, reply) => {
      const result = await db
        .select({
          category: schema.categories.name,
        })
        .from(schema.books)
        .innerJoin(schema.ratings, eq(schema.ratings.bookId, schema.books.id))
        .innerJoin(
          schema.bookCategories,
          eq(schema.bookCategories.bookId, schema.books.id),
        )
        .innerJoin(
          schema.categories,
          eq(schema.categories.id, schema.bookCategories.categoryId),
        )
        .where(eq(schema.ratings.userId, request.user.sub))
        .groupBy(schema.categories.id)
        .orderBy(desc(count(schema.categories.id)))
        .limit(1)

      const mostReadCategory = result[0]

      return reply.status(200).send({
        category: mostReadCategory?.category ?? null,
      })
    },
  )
}
