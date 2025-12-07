import { RateBookUseCase } from '../../domain/use-cases/rate-book.ts'
import { DrizzleBooksRepository } from '../database/drizzle/repositories/drizzle-books-repository.ts'
import { DrizzleRatingsRepository } from '../database/drizzle/repositories/drizzle-ratings-repository.ts'

export function makeRateBookUseCase() {
  const booksRepository = new DrizzleBooksRepository()
  const ratingsRepository = new DrizzleRatingsRepository()

  return new RateBookUseCase(ratingsRepository, booksRepository)
}
