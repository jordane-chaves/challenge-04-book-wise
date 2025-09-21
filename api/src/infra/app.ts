import fastifyCors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
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
import { logger } from './logger.ts'

export const app = fastify({ logger }).withTypeProvider<ZodTypeProvider>()

app.setErrorHandler(errorHandler)
app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(fastifyCors, { origin: '*' })
app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'BookWise API',
      version: '1.0.0',
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

app.get('/health', () => {
  return 'ok'
})

app.register(authenticateWithGithub)
app.register(authenticateWithGoogle)
