import { GetMostReadCategoryUseCase } from '../../domain/use-cases/get-most-read-category.ts'
import { DrizzleCategoriesRepository } from '../database/drizzle/repositories/drizzle-categories-repository.ts'

export function makeGetMostReadCategoryUseCase() {
  const categoriesRepository = new DrizzleCategoriesRepository()

  return new GetMostReadCategoryUseCase(categoriesRepository)
}
