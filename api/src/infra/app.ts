import fastifyCors from '@fastify/cors'
import fastifySwagger from '@fastify/swagger'
import scalarUI from '@scalar/fastify-api-reference'
import fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { logger } from './logger.ts'

export const app = fastify({ logger }).withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(fastifyCors, { origin: '*' })

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'BookWise API',
      version: '1.0.0',
    },
  },
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
