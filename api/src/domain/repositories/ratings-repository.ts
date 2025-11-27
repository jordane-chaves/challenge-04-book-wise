import type { Book } from '../entities/book.ts'
import type { Rating } from '../entities/rating.ts'

export interface RatingsRepository {
  countRatedBooksByReaderId(readerId: string): Promise<number>
  findByBookIdAndReaderId(
    bookId: string,
    readerId: string,
  ): Promise<Rating | null>
  findLastByReaderId(readerId: string): Promise<Rating | null>
  findManyByBookId(bookId: string): Promise<Rating[]>
  findManyByReaderId(bookId: string): Promise<Rating[]>
  findManyPopularBooks(): Promise<Book[]>
  findManyRecent(): Promise<Rating[]>
  searchManyByReaderId(
    readerId: string,
    query?: string | null,
  ): Promise<Rating[]>
  create(rating: Rating): Promise<void>
}
