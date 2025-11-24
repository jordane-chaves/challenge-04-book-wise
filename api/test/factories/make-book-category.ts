import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '../../src/core/entities/unique-entity-id.ts'
import {
  BookCategory,
  type BookCategoryProps,
} from '../../src/domain/entities/book-category.ts'
import { db } from '../../src/infra/database/drizzle/client.ts'
import { schema } from '../../src/infra/database/drizzle/schema/index.ts'

export function makeBookCategory(
  override: Partial<BookCategoryProps> = {},
  id?: UniqueEntityID,
): BookCategory {
  return BookCategory.create(
    {
      bookId: new UniqueEntityID(),
      categoryId: new UniqueEntityID(),
      ...override,
    },
    id,
  )
}

interface DrizzleBookCategoryProps {
  bookId: string
  categoryId: string
}

export async function makeDrizzleBookCategory(
  override: Partial<DrizzleBookCategoryProps> = {},
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
