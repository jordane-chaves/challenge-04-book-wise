import path from 'node:path'
import fastifyCors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import fastifyStatic from '@fastify/static'
import fastifySwagger from '@fastify/swagger'
import scalarUI from '@scalar/fastify-api-reference'
import fastify from 'fastify'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { env } from './env.ts'
import { errorHandler } from './error-handler.ts'
import { authenticateWithGithub } from './http/routes/auth/authenticate-with-github.ts'
import { authenticateWithGoogle } from './http/routes/auth/authenticate-with-google.ts'
import { getProfile } from './http/routes/auth/profile.ts'
import { getBookDetails } from './http/routes/books/details.ts'
import { getReadBooks } from './http/routes/books/get-read-books.ts'
import { searchBooks } from './http/routes/books/search.ts'
import { fetchCategories } from './http/routes/categories/fetch.ts'
import { fetchBookRatings } from './http/routes/ratings/fetch-book-ratings.ts'
import { logger } from './logger.ts'

export const app = fastify({ logger }).withTypeProvider<ZodTypeProvider>()

app.setErrorHandler(errorHandler)
app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(fastifyCors, { origin: '*' })
app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(fastifyStatic, {
  root: path.resolve('public'),
  prefix: '/public/',
})

if (env.NODE_ENV === 'development') {
  app.register(fastifySwagger, {
    openapi: {
      info: {
        title: 'BookWise API',
        version: '1.0.0',
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
    },
    transform: jsonSchemaTransform,
  })

  app.register(scalarUI, {
    routePrefix: '/docs',
    configuration: {
      layout: 'modern',
    },
  })
}

app.get('/health', () => {
  return 'ok'
})

app.register(authenticateWithGithub)
app.register(authenticateWithGoogle)
app.register(getProfile)
app.register(fetchCategories)
app.register(fetchBookRatings)
app.register(getBookDetails)
app.register(getReadBooks)
app.register(searchBooks)
