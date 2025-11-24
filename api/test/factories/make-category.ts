import { faker } from '@faker-js/faker'
import type { UniqueEntityID } from '../../src/core/entities/unique-entity-id.ts'
import {
  Category,
  type CategoryProps,
} from '../../src/domain/entities/category.ts'
import { db } from '../../src/infra/database/drizzle/client.ts'
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

interface DrizzleCategoryProps {
  name: string
}

export async function makeDrizzleCategory(
  override: Partial<DrizzleCategoryProps> = {},
) {
  const result = await db
    .insert(schema.categories)
    .values({
      name: faker.book.genre(),
      ...override,
    })
    .returning()

  return result[0]
}
