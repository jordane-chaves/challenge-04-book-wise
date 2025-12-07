import { GetReadBooksUseCase } from '../../domain/use-cases/get-read-books.ts'
import { DrizzleRatingsRepository } from '../database/drizzle/repositories/drizzle-ratings-repository.ts'

export function makeGetReadBooksUseCase() {
  const ratingsRepository = new DrizzleRatingsRepository()

  return new GetReadBooksUseCase(ratingsRepository)
}
