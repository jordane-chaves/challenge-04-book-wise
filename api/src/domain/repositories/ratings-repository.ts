import type { Rating } from '../entities/rating.ts'

export interface RatingsRepository {
  findByBookIdAndReaderId(
    bookId: string,
    readerId: string,
  ): Promise<Rating | null>
  create(rating: Rating): Promise<void>
}
