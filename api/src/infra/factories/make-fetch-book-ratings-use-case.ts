import { FetchBookRatingsUseCase } from '../../domain/use-cases/fetch-book-ratings.ts'
import { DrizzleRatingsRepository } from '../database/drizzle/repositories/drizzle-ratings-repository.ts'

export function makeFetchBookRatingsUseCase() {
  const ratingsRepository = new DrizzleRatingsRepository()

  return new FetchBookRatingsUseCase(ratingsRepository)
}
