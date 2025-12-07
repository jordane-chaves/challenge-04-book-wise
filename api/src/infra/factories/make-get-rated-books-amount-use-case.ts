import { GetRatedBooksAmountUseCase } from '../../domain/use-cases/get-rated-books-amount.ts'
import { DrizzleRatingsRepository } from '../database/drizzle/repositories/drizzle-ratings-repository.ts'

export function makeGetRatedBooksAmountUseCase() {
  const ratingsRepository = new DrizzleRatingsRepository()

  return new GetRatedBooksAmountUseCase(ratingsRepository)
}
