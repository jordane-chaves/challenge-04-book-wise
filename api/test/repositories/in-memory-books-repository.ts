import type { Book } from '../../src/domain/entities/book.ts'
import type {
  BooksRepository,
  SearchManyParams,
} from '../../src/domain/repositories/books-repository.ts'
import type { InMemoryBookCategoriesRepository } from './in-memory-book-categories-repository.ts'

export class InMemoryBooksRepository implements BooksRepository {
  public items: Book[] = []

  constructor(
    private readonly bookCategoriesRepository: InMemoryBookCategoriesRepository,
  ) {}

  async searchMany({ categoryId, query }: SearchManyParams): Promise<Book[]> {
    const filteredBooks = this.items.filter((book) => {
      if (categoryId) {
        const isBookWithCategory = this.bookCategoriesRepository.items.some(
          (bookCategory) => {
            return (
              bookCategory.bookId === book.id &&
              bookCategory.categoryId.toString() === categoryId
            )
          },
        )

        return isBookWithCategory
      }

      if (
        query &&
        !book.title.includes(query) &&
        !book.author.includes(query)
      ) {
        return false
      }

      return true
    })

    return filteredBooks
  }
}
