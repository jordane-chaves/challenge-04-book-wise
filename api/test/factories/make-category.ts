import { faker } from '@faker-js/faker'
import { db } from '../../src/infra/database/drizzle/client.ts'
import { schema } from '../../src/infra/database/drizzle/schema/index.ts'

interface CategoryProps {
  name: string
}

export async function makeDrizzleCategory(
  override: Partial<CategoryProps> = {},
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
