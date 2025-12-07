import { GetLastReaderRatingUseCase } from '../../domain/use-cases/get-last-reader-rating.ts'
import { DrizzleRatingsRepository } from '../database/drizzle/repositories/drizzle-ratings-repository.ts'

export function makeGetLastReaderRatingUseCase() {
  const ratingsRepository = new DrizzleRatingsRepository()

  return new GetLastReaderRatingUseCase(ratingsRepository)
}
