import type { BookCategory } from '../entities/book-category.ts'

export interface BookCategoriesRepository {
  findByBookIdAndCategoryId(
    bookId: string,
    categoryId: string,
  ): Promise<BookCategory | null>
}
