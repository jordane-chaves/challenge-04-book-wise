import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { ResourceNotFoundError } from '../../../../core/errors/errors/resource-not-found-error.ts'
import { makeGetBookUseCase } from '../../../factories/make-get-book-use-case.ts'
import { BadRequestError } from '../../_errors/bad-request-error.ts'
import { BookDetailsPresenter } from '../../presenters/book-details-presenter.ts'

const getBookUseCase = makeGetBookUseCase()

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
              rating: z.number(),
              ratingCount: z.number(),
              totalPages: z.number(),
              categories: z.array(z.string()),
            }),
          }),
          400: z
            .object({ message: z.string() })
            .meta({ example: { message: 'Book not found' } }),
        },
      },
    },
    async (request, reply) => {
      const { bookId } = request.params

      const result = await getBookUseCase.execute({
        bookId,
      })

      if (result.isLeft()) {
        const error = result.value

        switch (error.constructor) {
          case ResourceNotFoundError:
            throw new BadRequestError('Book not found')
          default:
            throw new BadRequestError()
        }
      }

      const { book } = result.value

      return reply.status(200).send({
        book: BookDetailsPresenter.toHTTP(book),
      })
    },
  )
}
