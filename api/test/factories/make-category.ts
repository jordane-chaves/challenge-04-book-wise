import { faker } from '@faker-js/faker'
import type { UniqueEntityID } from '../../src/core/entities/unique-entity-id.ts'
import {
  Category,
  type CategoryProps,
} from '../../src/domain/entities/category.ts'
import { db } from '../../src/infra/database/drizzle/client.ts'
import { DrizzleCategoryMapper } from '../../src/infra/database/drizzle/mappers/drizzle-category-mapper.ts'
import { schema } from '../../src/infra/database/drizzle/schema/index.ts'

export function makeCategory(
  override: Partial<CategoryProps> = {},
  id?: UniqueEntityID,
): Category {
  return Category.create(
    {
      name: faker.book.genre(),
      ...override,
    },
    id,
  )
}

export async function makeDrizzleCategory(data: Partial<CategoryProps> = {}) {
  const category = makeCategory(data)

  await db
    .insert(schema.categories)
    .values(DrizzleCategoryMapper.toDrizzle(category))

  return category
}
