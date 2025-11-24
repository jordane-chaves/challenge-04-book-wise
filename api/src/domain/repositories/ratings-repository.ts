import type { Rating } from '../entities/rating.ts'

export interface RatingsRepository {
  findByBookIdAndReaderId(
    bookId: string,
    readerId: string,
  ): Promise<Rating | null>
  findLastByReaderId(readerId: string): Promise<Rating | null>
  findManyByBookId(bookId: string): Promise<Rating[]>
  findManyRecent(): Promise<Rating[]>
  create(rating: Rating): Promise<void>
}
