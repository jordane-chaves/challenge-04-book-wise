import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { makeFetchCategoriesUseCase } from '../../../factories/make-fetch-categories-use-case.ts'
import { BadRequestError } from '../../_errors/bad-request-error.ts'
import { CategoryPresenter } from '../../presenters/category-presenter.ts'

const fetchCategoriesUseCase = makeFetchCategoriesUseCase()

export const fetchCategories: FastifyPluginCallbackZod = (app) => {
  app.get(
    '/categories',
    {
      schema: {
        tags: ['categories'],
        summary: 'Fetch categories',
        response: {
          200: z.object({
            categories: z.array(
              z.object({
                id: z.uuid(),
                name: z.string(),
              }),
            ),
          }),
        },
      },
    },
    async (_request, reply) => {
      const result = await fetchCategoriesUseCase.execute()

      if (result.isLeft()) {
        throw new BadRequestError()
      }

      const { categories } = result.value

      return reply.status(200).send({
        categories: categories.map(CategoryPresenter.toHTTP),
      })
    },
  )
}
