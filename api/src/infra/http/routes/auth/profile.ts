import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { ResourceNotFoundError } from '../../../../core/errors/errors/resource-not-found-error.ts'
import { makeGetReaderProfileUseCase } from '../../../factories/make-get-reader-profile-use-case.ts'
import { BadRequestError } from '../../_errors/bad-request-error.ts'
import { UnauthorizedError } from '../../_errors/unauthorized-error.ts'
import { verifyJWT } from '../../hooks/verify-jwt.ts'
import { ReaderPresenter } from '../../presenters/reader-presenter.ts'

const getReaderProfileUseCase = makeGetReaderProfileUseCase()

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
      const result = await getReaderProfileUseCase.execute({
        readerId: request.user.sub,
      })

      if (result.isLeft()) {
        const error = result.value

        switch (error.constructor) {
          case ResourceNotFoundError:
            throw new UnauthorizedError(error.message)
          default:
            throw new BadRequestError()
        }
      }

      const { reader } = result.value

      return reply.status(200).send({
        user: ReaderPresenter.toHTTP(reader),
      })
    },
  )
}
