import type { Category } from '../entities/category.ts'

export interface CategoriesRepository {
  findMostReadByReaderId(readerId: string): Promise<Category | null>
  findMany(): Promise<Category[]>
}
