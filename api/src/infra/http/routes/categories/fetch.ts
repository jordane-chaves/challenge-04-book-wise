import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { db } from '../../../database/drizzle/client.ts'
import { schema } from '../../../database/drizzle/schema/index.ts'

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
      const categories = await db
        .select()
        .from(schema.categories)
        .orderBy(schema.categories.name)

      return reply.status(200).send({
        categories,
      })
    },
  )
}
