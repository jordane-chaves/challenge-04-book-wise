import { app } from './app.ts'
import { env } from './env.ts'

try {
  const url = await app.listen({ port: env.PORT, host: env.HOST })

  if (env.NODE_ENV === 'development') {
    app.log.info(`API reference available at ${url}/docs`)
  }
} catch (error) {
  app.log.error(error)
  process.exit(1)
}
