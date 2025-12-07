import { GetPagesReadAmountUseCase } from '../../domain/use-cases/get-pages-read-amount.ts'
import { DrizzleBooksRepository } from '../database/drizzle/repositories/drizzle-books-repository.ts'
import { DrizzleRatingsRepository } from '../database/drizzle/repositories/drizzle-ratings-repository.ts'

export function makeGetPagesReadAmountUseCase() {
  const booksRepository = new DrizzleBooksRepository()
  const ratingsRepository = new DrizzleRatingsRepository()

  return new GetPagesReadAmountUseCase(ratingsRepository, booksRepository)
}
