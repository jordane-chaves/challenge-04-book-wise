import { and, eq } from 'drizzle-orm'
import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { db } from '../../../database/drizzle/client.ts'
import { schema } from '../../../database/drizzle/schema/index.ts'
import { env } from '../../../env.ts'
import { UnauthorizedError } from '../../_errors/unauthorized-error.ts'

export const authenticateWithGithub: FastifyPluginCallbackZod = (app) => {
  app.post(
    '/sessions/github',
    {
      schema: {
        tags: ['auth'],
        summary: 'Authenticate with Github',
        body: z.object({
          code: z
            .string()
            .min(1)
            .describe('The Github temporary authorization code.'),
        }),
        response: {
          201: z.object({ token: z.string() }).describe('Success'),
          401: z.object({ message: z.string() }).describe('Unauthorized'),
        },
      },
    },
    async (request, reply) => {
      const { code } = request.body

      const githubOAuthURL = new URL(
        'https://github.com/login/oauth/access_token',
      )

      githubOAuthURL.searchParams.set('client_id', env.GITHUB_OAUTH_CLIENT_ID)
      githubOAuthURL.searchParams.set(
        'client_secret',
        env.GITHUB_OAUTH_CLIENT_SECRET,
      )

      githubOAuthURL.searchParams.set(
        'redirect_uri',
        env.GITHUB_OAUTH_CLIENT_REDIRECT_URI,
      )

      githubOAuthURL.searchParams.set('code', code)

      const githubAccessTokenResponse = await fetch(githubOAuthURL, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
      })

      if (!githubAccessTokenResponse.ok) {
        throw new UnauthorizedError()
      }

      const githubAccessTokenData = await githubAccessTokenResponse.json()

      const parsedGithubAccessTokenData = z
        .object({
          access_token: z.string(),
          token_type: z.literal('bearer'),
          scope: z.string(),
        })
        .safeParse(githubAccessTokenData)

      if (parsedGithubAccessTokenData.success === false) {
        throw new UnauthorizedError()
      }

      const { access_token: githubAccessToken } =
        parsedGithubAccessTokenData.data

      const githubUserResponse = await fetch('https://api.github.com/user', {
        headers: {
          Authorization: `Bearer ${githubAccessToken}`,
        },
      })

      if (!githubUserResponse.ok) {
        throw new UnauthorizedError()
      }

      const githubUserData = await githubUserResponse.json()

      const parsedGithubUserData = z
        .object({
          id: z.coerce.string(),
          avatar_url: z.url(),
          name: z.string().nullable(),
          email: z.string().nullable(),
        })
        .safeParse(githubUserData)

      if (parsedGithubUserData.success === false) {
        throw new UnauthorizedError()
      }

      const {
        id: githubId,
        name,
        email,
        avatar_url: avatarUrl,
      } = parsedGithubUserData.data

      if (!email) {
        throw new Error(
          'Your Github account must have an email to authenticate.',
        )
      }

      const userResult = await db
        .select()
        .from(schema.users)
        .where(eq(schema.users.email, email))

      let user = userResult[0]

      if (!user) {
        const insertedResult = await db
          .insert(schema.users)
          .values({
            name: name ?? email,
            email,
            avatarUrl,
          })
          .returning()

        user = insertedResult[0]
      }

      const accountResult = await db
        .select()
        .from(schema.accounts)
        .where(
          and(
            eq(schema.accounts.provider, 'GITHUB'),
            eq(schema.accounts.providerId, githubId),
            eq(schema.accounts.userId, user.id),
          ),
        )

      const account = accountResult[0]

      if (!account) {
        await db.insert(schema.accounts).values({
          providerId: githubId,
          userId: user.id,
          provider: 'GITHUB',
        })
      }

      const token = await reply.jwtSign(
        {
          sub: user.id,
        },
        {
          sign: {
            expiresIn: '7d',
          },
        },
      )

      return reply.status(201).send({
        token,
      })
    },
  )
}
