import { and, eq } from 'drizzle-orm'
import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { db } from '../../../database/drizzle/client.ts'
import { schema } from '../../../database/drizzle/schema/index.ts'
import { env } from '../../../env.ts'
import { UnauthorizedError } from '../../_errors/unauthorized-error.ts'

export const authenticateWithGoogle: FastifyPluginCallbackZod = (app) => {
  app.post(
    '/sessions/google',
    {
      schema: {
        tags: ['auth'],
        summary: 'Authenticate with Google',
        body: z.object({
          code: z
            .string()
            .min(1)
            .describe('The Google temporary authorization code.'),
        }),
        response: {
          201: z.object({ token: z.string() }).describe('Success'),
          401: z.object({ message: z.string() }).describe('Unauthorized'),
        },
      },
    },
    async (request, reply) => {
      const { code } = request.body

      const googleOAuthURL = new URL('https://oauth2.googleapis.com/token')

      googleOAuthURL.searchParams.set('code', code)
      googleOAuthURL.searchParams.set('grant_type', 'authorization_code')
      googleOAuthURL.searchParams.set('client_id', env.GOOGLE_OAUTH_CLIENT_ID)
      googleOAuthURL.searchParams.set(
        'client_secret',
        env.GOOGLE_OAUTH_CLIENT_SECRET,
      )
      googleOAuthURL.searchParams.set(
        'redirect_uri',
        env.GOOGLE_OAUTH_CLIENT_REDIRECT_URI,
      )

      const googleAccessTokenResponse = await fetch(googleOAuthURL, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
      })

      if (!googleAccessTokenResponse.ok) {
        throw new UnauthorizedError()
      }

      const googleAccessTokenData = await googleAccessTokenResponse.json()

      const parsedGoogleAccessTokenData = z
        .object({
          access_token: z.string(),
          token_type: z.literal('Bearer'),
          scope: z.string(),
        })
        .safeParse(googleAccessTokenData)

      if (parsedGoogleAccessTokenData.success === false) {
        throw new UnauthorizedError()
      }

      const { access_token: googleAccessToken } =
        parsedGoogleAccessTokenData.data

      const googleUserResponse = await fetch(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        {
          headers: {
            Authorization: `Bearer ${googleAccessToken}`,
          },
        },
      )

      if (!googleUserResponse.ok) {
        throw new UnauthorizedError()
      }

      const googleUserData = await googleUserResponse.json()

      const parsedGoogleUserData = z
        .object({
          sub: z.string(),
          name: z.string(),
          email: z.email(),
          picture: z.url().nullish(),
        })
        .safeParse(googleUserData)

      if (parsedGoogleUserData.success === false) {
        throw new UnauthorizedError()
      }

      const { sub: googleId, name, email, picture } = parsedGoogleUserData.data

      const userResult = await db
        .select()
        .from(schema.users)
        .where(eq(schema.users.email, email))

      let user = userResult[0]

      if (!user) {
        const insertedResult = await db
          .insert(schema.users)
          .values({
            name,
            email,
            avatarUrl: picture,
          })
          .returning()

        user = insertedResult[0]
      }

      const accountsResult = await db
        .select()
        .from(schema.accounts)
        .where(
          and(
            eq(schema.accounts.provider, 'GOOGLE'),
            eq(schema.accounts.providerId, googleId),
            eq(schema.accounts.userId, user.id),
          ),
        )

      const account = accountsResult[0]

      if (!account) {
        await db.insert(schema.accounts).values({
          providerId: googleId,
          userId: user.id,
          provider: 'GOOGLE',
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
