import type { Rating } from '../../src/domain/entities/rating.ts'
import { BookWithRating } from '../../src/domain/entities/value-objects/book-with-rating.ts'
import { RatingDetails } from '../../src/domain/entities/value-objects/rating-details.ts'
import type { RatingsRepository } from '../../src/domain/repositories/ratings-repository.ts'
import type { InMemoryBooksRepository } from './in-memory-books-repository.ts'
import type { InMemoryReadersRepository } from './in-memory-readers-repository.ts'

export class InMemoryRatingsRepository implements RatingsRepository {
  public items: Rating[] = []

  constructor(
    private readonly booksRepository: InMemoryBooksRepository,
    private readonly readersRepository: InMemoryReadersRepository,
  ) {}

  async countRatedBooksByReaderId(readerId: string): Promise<number> {
    const filteredRatings = this.items.filter((item) => {
      return item.readerId.toString() === readerId
    })

    return filteredRatings.length
  }

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

  async findLastDetailsByReaderId(
    readerId: string,
  ): Promise<RatingDetails | null> {
    const ratings = this.items.map((item) => {
      const reader = this.readersRepository.items.find((reader) => {
        return reader.id.equals(item.readerId)
      })

      if (!reader) {
        throw new Error(
          `Reader with ID "${item.readerId.toString()}" not found.`,
        )
      }

      const book = this.booksRepository.items.find((book) => {
        return book.id.equals(item.bookId)
      })

      if (!book) {
        throw new Error(`Book with ID "${item.bookId.toString()}" not found.`)
      }

      return RatingDetails.create({
        ratingId: item.id,
        bookId: item.bookId,
        readerId: item.readerId,
        reader: reader.name,
        avatarUrl: reader.avatarUrl,
        description: item.description,
        score: item.score,
        title: book.title,
        author: book.author,
        coverUrl: book.coverUrl,
        createdAt: item.createdAt,
      })
    })

    const filteredRatings = ratings.filter((item) => {
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

  async findManyByReaderId(readerId: string): Promise<Rating[]> {
    const ratings = this.items.filter((item) => {
      return item.readerId.toString() === readerId
    })

    return ratings
  }

  async findManyPopularBooks(): Promise<BookWithRating[]> {
    const books = this.items
      .sort((itemA, itemB) => itemB.score - itemA.score)
      .slice(0, 4)
      .map<BookWithRating>((rating) => {
        const book = this.booksRepository.items.find((book) => {
          return book.id.equals(rating.bookId)
        })

        if (!book) {
          throw new Error(
            `Book with ID "${rating.bookId.toString()}" not found.`,
          )
        }

        const bookRatings = this.items.filter((rating) => {
          return rating.bookId.equals(book.id)
        })

        const bookRatingsSum = bookRatings.reduce((acc, rating) => {
          return acc + rating.score
        }, 0)

        const bookScore = bookRatingsSum / bookRatings.length

        return BookWithRating.create({
          bookId: book.id,
          author: book.author,
          coverUrl: book.coverUrl,
          title: book.title,
          score: bookScore,
        })
      })

    return books
  }

  async findManyRecentWithDetails(): Promise<RatingDetails[]> {
    const ratings = this.items.map((item) => {
      const reader = this.readersRepository.items.find((reader) => {
        return reader.id.equals(item.readerId)
      })

      if (!reader) {
        throw new Error(
          `Reader with ID "${item.readerId.toString()}" not found.`,
        )
      }

      const book = this.booksRepository.items.find((book) => {
        return book.id.equals(item.bookId)
      })

      if (!book) {
        throw new Error(`Book with ID "${item.bookId.toString()}" not found.`)
      }

      return RatingDetails.create({
        ratingId: item.id,
        bookId: item.bookId,
        readerId: item.readerId,
        reader: reader.name,
        avatarUrl: reader.avatarUrl,
        description: item.description,
        score: item.score,
        title: book.title,
        author: book.author,
        coverUrl: book.coverUrl,
        createdAt: item.createdAt,
      })
    })

    const sortedRatings = ratings.sort((itemA, itemB) => {
      return itemB.createdAt.getTime() - itemA.createdAt.getTime()
    })

    return sortedRatings
  }

  async findManyRecentWithDetailsByBookId(
    bookId: string,
  ): Promise<RatingDetails[]> {
    const ratings = this.items.map((item) => {
      const reader = this.readersRepository.items.find((reader) => {
        return reader.id.equals(item.readerId)
      })

      if (!reader) {
        throw new Error(
          `Reader with ID "${item.readerId.toString()}" not found.`,
        )
      }

      const book = this.booksRepository.items.find((book) => {
        return book.id.equals(item.bookId)
      })

      if (!book) {
        throw new Error(`Book with ID "${item.bookId.toString()}" not found.`)
      }

      return RatingDetails.create({
        ratingId: item.id,
        bookId: item.bookId,
        readerId: item.readerId,
        reader: reader.name,
        avatarUrl: reader.avatarUrl,
        description: item.description,
        score: item.score,
        title: book.title,
        author: book.author,
        coverUrl: book.coverUrl,
        createdAt: item.createdAt,
      })
    })

    const filteredRatings = ratings.filter((item) => {
      return item.bookId.toString() === bookId
    })

    const sortedRatings = filteredRatings.sort((itemA, itemB) => {
      return itemB.createdAt.getTime() - itemA.createdAt.getTime()
    })

    return sortedRatings
  }

  async searchManyDetailsByReaderId(
    readerId: string,
    query?: string | null,
  ): Promise<RatingDetails[]> {
    const filteredRatings = this.items.filter((item) => {
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

    const ratings = filteredRatings.map((item) => {
      const reader = this.readersRepository.items.find((reader) => {
        return reader.id.equals(item.readerId)
      })

      if (!reader) {
        throw new Error(
          `Reader with ID "${item.readerId.toString()}" not found.`,
        )
      }

      const book = this.booksRepository.items.find((book) => {
        return book.id.equals(item.bookId)
      })

      if (!book) {
        throw new Error(`Book with ID "${item.bookId.toString()}" not found.`)
      }

      return RatingDetails.create({
        ratingId: item.id,
        bookId: item.bookId,
        readerId: item.readerId,
        reader: reader.name,
        avatarUrl: reader.avatarUrl,
        description: item.description,
        score: item.score,
        title: book.title,
        author: book.author,
        coverUrl: book.coverUrl,
        createdAt: item.createdAt,
      })
    })

    return ratings
  }

  async create(rating: Rating): Promise<void> {
    this.items.push(rating)
  }
}
