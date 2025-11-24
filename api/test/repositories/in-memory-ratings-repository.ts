import type { Rating } from '../../src/domain/entities/rating.ts'
import type { RatingsRepository } from '../../src/domain/repositories/ratings-repository.ts'

export class InMemoryRatingsRepository implements RatingsRepository {
  public items: Rating[] = []

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

  async findManyByBookId(bookId: string): Promise<Rating[]> {
    const ratings = this.items.filter((item) => {
      return item.bookId.toString() === bookId
    })

    return ratings
  }

  async create(rating: Rating): Promise<void> {
    this.items.push(rating)
  }
}
