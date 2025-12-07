import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { makeSearchBooksUseCase } from '../../../factories/make-search-books-use-case.ts'
import { BadRequestError } from '../../_errors/bad-request-error.ts'
import { BookWithRatingPresenter } from '../../presenters/book-with-rating-presenter.ts'

const searchBooksUseCase = makeSearchBooksUseCase()

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

      const result = await searchBooksUseCase.execute({
        categoryId,
        query,
      })

      if (result.isLeft()) {
        throw new BadRequestError()
      }

      const { books } = result.value

      return reply.status(200).send({
        books: books.map(BookWithRatingPresenter.toHTTP),
      })
    },
  )
}
