import z from 'zod'

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  HOST: z.ipv4().or(z.ipv6()).default('0.0.0.0'),
  PORT: z.number().default(3333),
  LOG_LEVEL: z
    .enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace'])
    .default('info'),
  DATABASE_URL: z.url(),
  JWT_SECRET: z.string().min(1),
  GOOGLE_OAUTH_CLIENT_ID: z.string().min(1),
  GOOGLE_OAUTH_CLIENT_SECRET: z.string().min(1),
  GOOGLE_OAUTH_CLIENT_REDIRECT_URI: z.url(),
  GITHUB_OAUTH_CLIENT_ID: z.string().min(1),
  GITHUB_OAUTH_CLIENT_SECRET: z.string().min(1),
  GITHUB_OAUTH_CLIENT_REDIRECT_URI: z.url(),
})

export type Env = z.infer<typeof envSchema>
export const env = envSchema.parse(process.env)
