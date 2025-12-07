import { GetAuthorsReadAmountUseCase } from '../../domain/use-cases/get-authors-read-amount.ts'
import { DrizzleBooksRepository } from '../database/drizzle/repositories/drizzle-books-repository.ts'
import { DrizzleRatingsRepository } from '../database/drizzle/repositories/drizzle-ratings-repository.ts'

export function makeGetAuthorsReadAmountUseCase() {
  const booksRepository = new DrizzleBooksRepository()
  const ratingsRepository = new DrizzleRatingsRepository()

  return new GetAuthorsReadAmountUseCase(ratingsRepository, booksRepository)
}
