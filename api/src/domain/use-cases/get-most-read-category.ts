import { type Either, right } from '../../core/either.ts'
import type { Category } from '../entities/category.ts'
import type { CategoriesRepository } from '../repositories/categories-repository.ts'

interface GetMostReadCategoryUseCaseRequest {
  readerId: string
}

type GetMostReadCategoryUseCaseResponse = Either<
  null,
  {
    category: Category | null
  }
>

export class GetMostReadCategoryUseCase {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async execute(
    request: GetMostReadCategoryUseCaseRequest,
  ): Promise<GetMostReadCategoryUseCaseResponse> {
    const { readerId } = request

    const category =
      await this.categoriesRepository.findMostReadByReaderId(readerId)

    return right({
      category,
    })
  }
}
