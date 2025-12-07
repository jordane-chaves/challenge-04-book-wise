import { faker } from '@faker-js/faker'
import type { UniqueEntityID } from '../../src/core/entities/unique-entity-id.ts'
import { Book, type BookProps } from '../../src/domain/entities/book.ts'
import { db } from '../../src/infra/database/drizzle/client.ts'
import { DrizzleBookMapper } from '../../src/infra/database/drizzle/mappers/drizzle-book-mapper.ts'
import { schema } from '../../src/infra/database/drizzle/schema/index.ts'

export function makeBook(
  override: Partial<BookProps> = {},
  id?: UniqueEntityID,
): Book {
  return Book.create(
    {
      author: faker.book.author(),
      coverUrl: faker.image.url(),
      title: faker.book.title(),
      summary: faker.lorem.sentences(),
      totalPages: faker.number.int({ min: 1, max: 10000 }),
      createdAt: faker.date.anytime(),
      ...override,
    },
    id,
  )
}

export async function makeDrizzleBook(data: Partial<BookProps> = {}) {
  const book = makeBook(data)

  await db.insert(schema.books).values(DrizzleBookMapper.toDrizzle(book))

  return book
}
