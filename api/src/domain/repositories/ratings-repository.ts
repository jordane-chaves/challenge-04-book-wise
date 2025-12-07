import type { Rating } from '../entities/rating.ts'
import type { BookWithRating } from '../entities/value-objects/book-with-rating.ts'
import type { RatingDetails } from '../entities/value-objects/rating-details.ts'

export interface RatingsRepository {
  countRatedBooksByReaderId(readerId: string): Promise<number>
  findByBookIdAndReaderId(
    bookId: string,
    readerId: string,
  ): Promise<Rating | null>
  findLastDetailsByReaderId(readerId: string): Promise<RatingDetails | null>
  findManyByBookId(bookId: string): Promise<Rating[]>
  findManyByReaderId(readerId: string): Promise<Rating[]>
  findManyPopularBooks(): Promise<BookWithRating[]>
  findManyRecentWithDetails(): Promise<RatingDetails[]>
  findManyRecentWithDetailsByBookId(bookId: string): Promise<RatingDetails[]>
  searchManyDetailsByReaderId(
    readerId: string,
    query?: string | null,
  ): Promise<RatingDetails[]>
  create(rating: Rating): Promise<void>
}
