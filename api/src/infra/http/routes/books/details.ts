import { eq, sql } from 'drizzle-orm'
import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { db } from '../../../database/drizzle/client.ts'
import { schema } from '../../../database/drizzle/schema/index.ts'
import { env } from '../../../env.ts'
import { BadRequestError } from '../../_errors/bad-request-error.ts'

export const getBookDetails: FastifyPluginCallbackZod = (app) => {
  app.get(
    '/books/:bookId',
    {
      schema: {
        tags: ['books'],
        summary: 'Get Book Details',
        params: z.object({
          bookId: z.string(),
        }),
        response: {
          200: z.object({
            book: z.object({
              id: z.string(),
              name: z.string(),
              author: z.string(),
              coverUrl: z.string(),
              totalPages: z.number(),
              categories: z.array(z.string()),
            }),
          }),
        },
      },
    },
    async (request, reply) => {
      const { bookId } = request.params

      const result = await db
        .select({
          id: schema.books.id,
          name: schema.books.name,
          author: schema.books.author,
          coverUrl: schema.books.coverUrl,
          totalPages: schema.books.totalPages,
          categories: sql<string[]>`ARRAY_AGG(${schema.categories.name})`,
        })
        .from(schema.books)
        .leftJoin(
          schema.bookCategories,
          eq(schema.bookCategories.bookId, schema.books.id),
        )
        .leftJoin(
          schema.categories,
          eq(schema.categories.id, schema.bookCategories.categoryId),
        )
        .where(eq(schema.books.id, bookId))
        .groupBy(schema.books.id)

      if (result.length === 0) {
        throw new BadRequestError('Book not found')
      }

      const book = result[0]

      const coverUrl = new URL(
        `/public/books/${book.coverUrl}`,
        env.API_BASE_URL,
      )

      return reply.status(200).send({
        book: {
          id: book.id,
          name: book.name,
          author: book.author,
          coverUrl: coverUrl.toString(),
          totalPages: book.totalPages,
          categories: book.categories,
        },
      })
    },
  )
}
