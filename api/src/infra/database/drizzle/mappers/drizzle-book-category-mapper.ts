import type { InferSelectModel } from 'drizzle-orm'
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id.ts'
import { BookCategory } from '../../../../domain/entities/book-category.ts'
import type { schema } from '../schema/index.ts'

type DrizzleBookCategory = InferSelectModel<typeof schema.bookCategories>

export class DrizzleBookCategoryMapper {
  static toDomain(raw: DrizzleBookCategory): BookCategory {
    return BookCategory.create(
      {
        bookId: new UniqueEntityID(raw.bookId),
        categoryId: new UniqueEntityID(raw.categoryId),
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toDrizzle(bookCategory: BookCategory): DrizzleBookCategory {
    return {
      id: bookCategory.id.toString(),
      bookId: bookCategory.bookId.toString(),
      categoryId: bookCategory.categoryId.toString(),
    }
  }
}
