import { type Either, right } from '../../core/either.ts'
import type { Category } from '../entities/category.ts'
import type { CategoriesRepository } from '../repositories/categories-repository.ts'

type FetchCategoriesUseCaseResponse = Either<
  null,
  {
    categories: Category[]
  }
>

export class FetchCategoriesUseCase {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async execute(): Promise<FetchCategoriesUseCaseResponse> {
    const categories = await this.categoriesRepository.findMany()

    return right({
      categories,
    })
  }
}
