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

  async countAuthorsByBooksIds(booksIds: string[]): Promise<number> {
    const books = this.items.filter((book) => {
      return booksIds.includes(book.id.toString())
    })

    const authors = books.map((book) => book.author)
    const uniqueAuthors = [...new Set(authors)]

    return uniqueAuthors.length
  }

  async countPagesByBooksIds(booksIds: string[]): Promise<number> {
    const books = this.items.filter((book) => {
      return booksIds.includes(book.id.toString())
    })

    const totalPagesAmount = books.reduce((result, book) => {
      return result + book.totalPages
    }, 0)

    return totalPagesAmount
  }

  async findById(id: string): Promise<Book | null> {
    const book = this.items.find((item) => item.id.toString() === id)

    if (!book) {
      return null
    }

    return book
  }

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
