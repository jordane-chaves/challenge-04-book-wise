import { faker } from '@faker-js/faker'
import { db } from '../../src/infra/database/drizzle/client.ts'
import { schema } from '../../src/infra/database/drizzle/schema/index.ts'

interface BookCategoryProps {
  bookId: string
  categoryId: string
}

export async function makeDrizzleBookCategory(
  override: Partial<BookCategoryProps> = {},
) {
  const result = await db
    .insert(schema.bookCategories)
    .values({
      bookId: faker.string.uuid(),
      categoryId: faker.string.uuid(),
      ...override,
    })
    .returning()

  return result[0]
}
