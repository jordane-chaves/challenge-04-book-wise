import { FetchRecentRatingsUseCase } from '../../domain/use-cases/fetch-recent-ratings.ts'
import { DrizzleRatingsRepository } from '../database/drizzle/repositories/drizzle-ratings-repository.ts'

export function makeFetchRecentRatingsUseCase() {
  const ratingsRepository = new DrizzleRatingsRepository()

  return new FetchRecentRatingsUseCase(ratingsRepository)
}
