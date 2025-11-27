import type { BookCategory } from '../../src/domain/entities/book-category.ts'
import type { BookCategoriesRepository } from '../../src/domain/repositories/book-categories-repository.ts'

export class InMemoryBookCategoriesRepository
  implements BookCategoriesRepository
{
  public items: BookCategory[] = []

  async findByBookIdAndCategoryId(
    bookId: string,
    categoryId: string,
  ): Promise<BookCategory | null> {
    const bookCategory = this.items.find((item) => {
      return (
        item.bookId.toString() === bookId &&
        item.categoryId.toString() === categoryId
      )
    })

    if (!bookCategory) {
      return null
    }

    return bookCategory
  }

  async findManyByBooksIds(booksIds: string[]): Promise<BookCategory[]> {
    const bookCategories = this.items.filter((bookCategory) => {
      return booksIds.includes(bookCategory.bookId.toString())
    })

    return bookCategories
  }
}
