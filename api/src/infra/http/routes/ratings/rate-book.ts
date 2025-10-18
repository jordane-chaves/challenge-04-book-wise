import { and, eq } from 'drizzle-orm'
import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { db } from '../../../database/drizzle/client.ts'
import { schema } from '../../../database/drizzle/schema/index.ts'
import { BadRequestError } from '../../_errors/bad-request-error.ts'
import { verifyJWT } from '../../hooks/verify-jwt.ts'

export const rateBook: FastifyPluginCallbackZod = (app) => {
  app.post(
    '/books/:bookId/rating',
    {
      preHandler: [verifyJWT],
      schema: {
        tags: ['ratings'],
        summary: 'Rate the Book',
        security: [{ bearerAuth: [] }],
        body: z.object({
          description: z.string(),
          rating: z.number().min(0.5).max(5),
        }),
        params: z.object({
          bookId: z.string(),
        }),
        response: {
          201: z.void(),
          400: z
            .object({ message: z.string() })
            .meta({ example: { message: 'You have already rated this book' } }),
        },
      },
    },
    async (request, reply) => {
      const { bookId } = request.params
      const { description, rating } = request.body
      const userId = request.user.sub

      const ratingExists = await db
        .select()
        .from(schema.ratings)
        .where(
          and(
            eq(schema.ratings.bookId, bookId),
            eq(schema.ratings.userId, userId),
          ),
        )

      if (ratingExists.length > 0) {
        throw new BadRequestError('You have already rated this book')
      }

      await db.insert(schema.ratings).values({
        bookId,
        userId,
        description,
        rating,
      })

      return reply.status(201).send()
    },
  )
}
