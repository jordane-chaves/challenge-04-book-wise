import { eq } from 'drizzle-orm'
import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { db } from '../../../database/drizzle/client.ts'
import { schema } from '../../../database/drizzle/schema/index.ts'
import { UnauthorizedError } from '../../_errors/unauthorized-error.ts'
import { verifyJWT } from '../../hooks/verify-jwt.ts'

export const getProfile: FastifyPluginCallbackZod = (app) => {
  app.get(
    '/me',
    {
      preHandler: [verifyJWT],
      schema: {
        tags: ['auth'],
        summary: 'Get Profile',
        description: 'Get authenticated user profile',
        security: [{ bearerAuth: [] }],
        response: {
          200: z.object({
            user: z.object({
              id: z.uuid(),
              name: z.string(),
              email: z.email(),
              avatarUrl: z.string().nullable(),
              createdAt: z.date(),
            }),
          }),
        },
      },
    },
    async (request, reply) => {
      const userId = request.user.sub

      const result = await db
        .select()
        .from(schema.users)
        .where(eq(schema.users.id, userId))

      const user = result[0]

      if (!user) {
        throw new UnauthorizedError('Profile not found.')
      }

      return reply.status(200).send({
        user,
      })
    },
  )
}
