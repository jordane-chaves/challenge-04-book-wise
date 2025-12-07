import { GetBookUseCase } from '../../domain/use-cases/get-book.ts'
import { DrizzleBooksRepository } from '../database/drizzle/repositories/drizzle-books-repository.ts'
import { DrizzleCategoriesRepository } from '../database/drizzle/repositories/drizzle-categories-repository.ts'
import { DrizzleRatingsRepository } from '../database/drizzle/repositories/drizzle-ratings-repository.ts'

export function makeGetBookUseCase() {
  const booksRepository = new DrizzleBooksRepository()
  const categoriesRepository = new DrizzleCategoriesRepository()
  const ratingsRepository = new DrizzleRatingsRepository()

  return new GetBookUseCase(
    booksRepository,
    categoriesRepository,
    ratingsRepository,
  )
}
