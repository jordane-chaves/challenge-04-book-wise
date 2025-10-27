import { faker } from '@faker-js/faker'
import { db } from '../../src/infra/database/drizzle/client.ts'
import { schema } from '../../src/infra/database/drizzle/schema/index.ts'

interface BookProps {
  name: string
  author: string
  coverUrl: string
  summary: string
  totalPages: number
}

export async function makeDrizzleBook(override: Partial<BookProps> = {}) {
  const result = await db
    .insert(schema.books)
    .values({
      name: faker.book.title(),
      author: faker.book.author(),
      coverUrl: faker.image.url(),
      summary: faker.lorem.paragraph(),
      totalPages: faker.number.int({ min: 50, max: 5000 }),
      ...override,
    })
    .returning()

  return result[0]
}
