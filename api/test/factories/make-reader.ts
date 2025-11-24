import { faker } from '@faker-js/faker'
import type { UniqueEntityID } from '../../src/core/entities/unique-entity-id.ts'
import { Reader, type ReaderProps } from '../../src/domain/entities/reader.ts'

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
