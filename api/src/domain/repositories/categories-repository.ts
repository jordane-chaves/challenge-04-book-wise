import type { Category } from '../entities/category.ts'

export interface CategoriesRepository {
  findMostReadByReaderId(readerId: string): Promise<Category | null>
  findManyByBookId(bookId: string): Promise<Category[]>
  findMany(): Promise<Category[]>
}
