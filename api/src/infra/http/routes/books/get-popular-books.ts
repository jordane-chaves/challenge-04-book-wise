import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { makeGetPopularBooksUseCase } from '../../../factories/make-get-popular-books-use-case.ts'
import { BadRequestError } from '../../_errors/bad-request-error.ts'
import { BookWithRatingPresenter } from '../../presenters/book-with-rating-presenter.ts'

const getPopularBooksUseCase = makeGetPopularBooksUseCase()

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
      const result = await getPopularBooksUseCase.execute()

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
