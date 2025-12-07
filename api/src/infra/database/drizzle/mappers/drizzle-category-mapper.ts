import type { InferSelectModel } from 'drizzle-orm'
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id.ts'
import { Category } from '../../../../domain/entities/category.ts'
import type { schema } from '../schema/index.ts'

type DrizzleCategory = InferSelectModel<typeof schema.categories>

export class DrizzleCategoryMapper {
  static toDomain(raw: DrizzleCategory): Category {
    return Category.create(
      {
        name: raw.name,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toDrizzle(category: Category): DrizzleCategory {
    return {
      id: category.id.toString(),
      name: category.name,
    }
  }
}
