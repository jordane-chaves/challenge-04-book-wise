import { and, eq, ilike, or, sql } from 'drizzle-orm'
import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { db } from '../../../database/drizzle/client.ts'
import { schema } from '../../../database/drizzle/schema/index.ts'
import { env } from '../../../env.ts'

export const searchBooks: FastifyPluginCallbackZod = (app) => {
  app.get(
    '/books',
    {
      schema: {
        tags: ['books'],
        summary: 'Search Books',
        querystring: z.object({
          categoryId: z.string().optional(),
          query: z.string().optional(),
        }),
        response: {
          200: z.object({
            books: z.array(
              z.object({
                id: z.uuid(),
                name: z.string(),
                author: z.string(),
                coverUrl: z.string(),
                rating: z.number(),
              }),
            ),
          }),
        },
      },
    },
    async (request, reply) => {
      const { categoryId, query } = request.query

      const result = await db
        .select({
          id: schema.books.id,
          name: schema.books.name,
          author: schema.books.author,
          coverUrl: schema.books.coverUrl,
          rating:
            sql<number>`round(avg(COALESCE(${schema.ratings.rating}, 0)) * 2) / 2`.mapWith(
              Number,
            ),
        })
        .from(schema.books)
        .where(
          and(
            categoryId
              ? eq(schema.bookCategories.categoryId, categoryId)
              : undefined,
            query
              ? or(
                  ilike(schema.books.author, `%${query}%`),
                  ilike(schema.books.name, `%${query}%`),
                )
              : undefined,
          ),
        )
        .leftJoin(
          schema.bookCategories,
          eq(schema.books.id, schema.bookCategories.bookId),
        )
        .leftJoin(schema.ratings, eq(schema.books.id, schema.ratings.bookId))
        .groupBy(schema.books.id)

      const books = result.map((book) => {
        const coverUrl = new URL(
          `/public/books/${book.coverUrl}`,
          env.API_BASE_URL,
        )

        return {
          ...book,
          coverUrl: coverUrl.toString(),
        }
      })

      return reply.status(200).send({
        books,
      })
    },
  )
}
