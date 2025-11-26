import type { Book } from '../../src/domain/entities/book.ts'
import type { Rating } from '../../src/domain/entities/rating.ts'
import type { RatingsRepository } from '../../src/domain/repositories/ratings-repository.ts'
import type { InMemoryBooksRepository } from './in-memory-books-repository.ts'

export class InMemoryRatingsRepository implements RatingsRepository {
  public items: Rating[] = []

  constructor(private readonly booksRepository: InMemoryBooksRepository) {}

  async findByBookIdAndReaderId(
    bookId: string,
    readerId: string,
  ): Promise<Rating | null> {
    const rating = this.items.find((item) => {
      return (
        item.bookId.toString() === bookId &&
        item.readerId.toString() === readerId
      )
    })

    if (!rating) {
      return null
    }

    return rating
  }

  async findLastByReaderId(readerId: string): Promise<Rating | null> {
    const filteredRatings = this.items.filter((item) => {
      return item.readerId.toString() === readerId
    })

    const sortedRatings = filteredRatings.sort((itemA, itemB) => {
      return itemB.createdAt.getTime() - itemA.createdAt.getTime()
    })

    const [rating] = sortedRatings

    if (!rating) {
      return null
    }

    return rating
  }

  async findManyByBookId(bookId: string): Promise<Rating[]> {
    const ratings = this.items.filter((item) => {
      return item.bookId.toString() === bookId
    })

    return ratings
  }

  async findManyPopularBooks(): Promise<Book[]> {
    const books = this.items
      .sort((itemA, itemB) => itemB.score - itemA.score)
      .slice(0, 4)
      .map((rating) => {
        const book = this.booksRepository.items.find((book) => {
          return book.id.equals(rating.bookId)
        })

        if (!book) {
          throw new Error(
            `Book with ID "${rating.bookId.toString()}" not found.`,
          )
        }

        return book
      })

    return books
  }

  async findManyRecent(): Promise<Rating[]> {
    const sortedRatings = this.items.sort((itemA, itemB) => {
      return itemB.createdAt.getTime() - itemA.createdAt.getTime()
    })

    return sortedRatings
  }

  async searchManyByReaderId(
    readerId: string,
    query?: string | null,
  ): Promise<Rating[]> {
    const ratings = this.items.filter((item) => {
      if (item.readerId.toString() !== readerId) {
        return false
      }

      if (query) {
        const book = this.booksRepository.items.find((book) => {
          return book.id.equals(item.bookId)
        })

        if (!book) {
          throw new Error(`Book with ID "${item.bookId.toString()}" not found.`)
        }

        return book.title.includes(query)
      }

      return true
    })

    return ratings
  }

  async create(rating: Rating): Promise<void> {
    this.items.push(rating)
  }
}
