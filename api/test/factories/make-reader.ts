import { faker } from '@faker-js/faker'
import type { UniqueEntityID } from '../../src/core/entities/unique-entity-id.ts'
import { Reader, type ReaderProps } from '../../src/domain/entities/reader.ts'
import { app } from '../../src/infra/app.ts'
import { db } from '../../src/infra/database/drizzle/client.ts'
import { DrizzleReaderMapper } from '../../src/infra/database/drizzle/mappers/drizzle-reader-mapper.ts'
import { schema } from '../../src/infra/database/drizzle/schema/index.ts'

export function makeReader(
  override: Partial<ReaderProps> = {},
  id?: UniqueEntityID,
) {
  return Reader.create(
    {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      avatarUrl: faker.image.avatarGitHub(),
      ...override,
    },
    id,
  )
}

export async function makeDrizzleUser(data: Partial<ReaderProps> = {}) {
  const reader = makeReader(data)

  await db.insert(schema.users).values(DrizzleReaderMapper.toDrizzle(reader))

  return reader
}

export async function makeAuthenticatedDrizzleUser(
  data: Partial<ReaderProps> = {},
) {
  const user = await makeDrizzleUser(data)

  const token = app.jwt.sign({ sub: user.id.toString() })

  return { user, token }
}
