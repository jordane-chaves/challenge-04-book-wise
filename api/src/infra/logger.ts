import type { FastifyServerOptions } from 'fastify'
import { type Env, env } from './env.ts'

const environmentLogger: Record<
  Env['NODE_ENV'],
  FastifyServerOptions['logger']
> = {
  development: {
    level: env.LOG_LEVEL,
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
  },
  production: true,
  test: false,
}

export const logger = environmentLogger[env.NODE_ENV]
