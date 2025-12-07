import { GetPopularBooksUseCase } from '../../domain/use-cases/get-popular-books.ts'
import { DrizzleRatingsRepository } from '../database/drizzle/repositories/drizzle-ratings-repository.ts'

export function makeGetPopularBooksUseCase() {
  const ratingsRepository = new DrizzleRatingsRepository()

  return new GetPopularBooksUseCase(ratingsRepository)
}
