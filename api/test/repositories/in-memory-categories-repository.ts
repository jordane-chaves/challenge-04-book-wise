import type { Category } from '../../src/domain/entities/category.ts'
import type { CategoriesRepository } from '../../src/domain/repositories/categories-repository.ts'

export class InMemoryCategoriesRepository implements CategoriesRepository {
  public items: Category[] = []

  async findMany(): Promise<Category[]> {
    return this.items
  }
}
