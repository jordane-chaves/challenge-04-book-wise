import { count, desc, eq } from 'drizzle-orm'
import type { Category } from '../../../../domain/entities/category.ts'
import type { CategoriesRepository } from '../../../../domain/repositories/categories-repository.ts'
import { db } from '../client.ts'
import { DrizzleCategoryMapper } from '../mappers/drizzle-category-mapper.ts'
import { schema } from '../schema/index.ts'

export class DrizzleCategoriesRepository implements CategoriesRepository {
  async findMostReadByReaderId(readerId: string): Promise<Category | null> {
    const result = await db
      .select({
        id: schema.categories.id,
        name: schema.categories.name,
      })
      .from(schema.categories)
      .innerJoin(
        schema.bookCategories,
        eq(schema.bookCategories.categoryId, schema.categories.id),
      )
      .innerJoin(
        schema.ratings,
        eq(schema.ratings.bookId, schema.bookCategories.bookId),
      )
      .where(eq(schema.ratings.userId, readerId))
      .groupBy(schema.categories.id)
      .orderBy(desc(count(schema.categories.id)))
      .limit(1)

    if (!result.length) {
      return null
    }

    const mostReadCategory = result[0]

    return DrizzleCategoryMapper.toDomain(mostReadCategory)
  }

  async findManyByBookId(bookId: string): Promise<Category[]> {
    const result = await db
      .select({
        id: schema.categories.id,
        name: schema.categories.name,
      })
      .from(schema.categories)
      .innerJoin(
        schema.bookCategories,
        eq(schema.bookCategories.categoryId, schema.categories.id),
      )
      .where(eq(schema.bookCategories.bookId, bookId))

    return result.map(DrizzleCategoryMapper.toDomain)
  }

  async findMany(): Promise<Category[]> {
    const result = await db
      .select()
      .from(schema.categories)
      .orderBy(schema.categories.name)

    return result.map(DrizzleCategoryMapper.toDomain)
  }
}
