import type { Category } from '../entities/category.ts'

export interface CategoriesRepository {
  findMany(): Promise<Category[]>
}
