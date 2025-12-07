import { SearchReaderRatingsUseCase } from '../../domain/use-cases/search-reader-ratings.ts'
import { DrizzleRatingsRepository } from '../database/drizzle/repositories/drizzle-ratings-repository.ts'

export function makeSearchReaderRatingsUseCase() {
  const ratingsRepository = new DrizzleRatingsRepository()

  return new SearchReaderRatingsUseCase(ratingsRepository)
}
