import { UniqueEntityID } from '../../src/core/entities/unique-entity-id.ts'
import {
  BookCategory,
  type BookCategoryProps,
} from '../../src/domain/entities/book-category.ts'
import { db } from '../../src/infra/database/drizzle/client.ts'
import { DrizzleBookCategoryMapper } from '../../src/infra/database/drizzle/mappers/drizzle-book-category-mapper.ts'
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

export async function makeDrizzleBookCategory(
  data: Partial<BookCategoryProps> = {},
) {
  const bookCategory = makeBookCategory(data)

  await db
    .insert(schema.bookCategories)
    .values(DrizzleBookCategoryMapper.toDrizzle(bookCategory))

  return bookCategory
}
