import { count, desc, eq, sql } from 'drizzle-orm'
import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { db } from '../../../database/drizzle/client.ts'
import { schema } from '../../../database/drizzle/schema/index.ts'
import { env } from '../../../env.ts'

export const getPopularBooks: FastifyPluginCallbackZod = (app) => {
  app.get(
    '/popular-books',
    {
      schema: {
        tags: ['books'],
        summary: 'Get Popular Books',
        description: 'Returns the four most popular books',
        response: {
          200: z.object({
            books: z.array(
              z.object({
                id: z.string(),
                author: z.string(),
                coverUrl: z.string(),
                name: z.string(),
                rating: z.number(),
              }),
            ),
          }),
        },
      },
    },
    async (_, reply) => {
      const result = await db
        .select({
          id: schema.books.id,
          author: schema.books.author,
          coverUrl: schema.books.coverUrl,
          name: schema.books.name,
          rating: sql<number>`COALESCE(CAST(AVG(${schema.ratings.rating}) AS float), 0)`,
        })
        .from(schema.books)
        .leftJoin(schema.ratings, eq(schema.ratings.bookId, schema.books.id))
        .groupBy(schema.books.id)
        .orderBy(
          desc(
            sql<number>`COALESCE(CAST(AVG(${schema.ratings.rating}) AS float), 0)`,
          ),
          desc(count(schema.ratings.bookId)),
        )
        .limit(4)

      const books = result.map((book) => {
        const coverUrl = new URL(
          `/public/books/${book.coverUrl}`,
          env.API_BASE_URL,
        )

        return {
          ...book,
          coverUrl: coverUrl.toString(),
          rating: Math.round(book.rating * 2) / 2, // round to half
        }
      })

      return reply.status(200).send({
        books,
      })
    },
  )
}
