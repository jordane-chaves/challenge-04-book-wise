import { faker } from '@faker-js/faker'
import { app } from '../../src/infra/app.ts'
import { db } from '../../src/infra/database/drizzle/client.ts'
import { schema } from '../../src/infra/database/drizzle/schema/index.ts'

interface UserProps {
  name: string
  email: string
  avatarUrl?: string
}

export async function makeDrizzleUser(override: Partial<UserProps> = {}) {
  const result = await db
    .insert(schema.users)
    .values({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      ...override,
    })
    .returning()

  return result[0]
}

export async function makeAuthenticatedDrizzleUser(
  data: Partial<UserProps> = {},
) {
  const user = await makeDrizzleUser(data)

  const token = app.jwt.sign({ sub: user.id })

  return { user, token }
}
