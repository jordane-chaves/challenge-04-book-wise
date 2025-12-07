import { FetchCategoriesUseCase } from '../../domain/use-cases/fetch-categories.ts'
import { DrizzleCategoriesRepository } from '../database/drizzle/repositories/drizzle-categories-repository.ts'

export function makeFetchCategoriesUseCase() {
  const categoriesRepository = new DrizzleCategoriesRepository()

  return new FetchCategoriesUseCase(categoriesRepository)
}
