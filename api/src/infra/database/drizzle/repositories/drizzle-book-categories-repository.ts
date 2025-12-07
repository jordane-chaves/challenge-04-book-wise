import { and, eq, inArray } from 'drizzle-orm'
import type { BookCategory } from '../../../../domain/entities/book-category.ts'
import type { BookCategoriesRepository } from '../../../../domain/repositories/book-categories-repository.ts'
import { db } from '../client.ts'
import { DrizzleBookCategoryMapper } from '../mappers/drizzle-book-category-mapper.ts'
import { schema } from '../schema/index.ts'

export class DrizzleBookCategoriesRepository
  implements BookCategoriesRepository
{
  async findByBookIdAndCategoryId(
    bookId: string,
    categoryId: string,
  ): Promise<BookCategory | null> {
    const result = await db
      .select()
      .from(schema.bookCategories)
      .where(
        and(
          eq(schema.bookCategories.bookId, bookId),
          eq(schema.bookCategories.categoryId, categoryId),
        ),
      )

    if (!result.length) {
      return null
    }

    const bookCategory = result[0]

    return DrizzleBookCategoryMapper.toDomain(bookCategory)
  }

  async findManyByBooksIds(booksIds: string[]): Promise<BookCategory[]> {
    const bookCategories = await db
      .select()
      .from(schema.bookCategories)
      .where(inArray(schema.bookCategories.bookId, booksIds))

    return bookCategories.map(DrizzleBookCategoryMapper.toDomain)
  }
}
