import type { Category } from '../../../domain/entities/category.ts'

export class CategoryPresenter {
  static toHTTP(category: Category) {
    return {
      id: category.id.toString(),
      name: category.name,
    }
  }
}
