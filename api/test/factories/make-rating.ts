import { faker } from '@faker-js/faker'
import { db } from '../../src/infra/database/drizzle/client.ts'
import { schema } from '../../src/infra/database/drizzle/schema/index.ts'

interface RatingProps {
  bookId: string
  userId: string
  description: string
  rating: number
  createdAt?: Date
}

export async function makeDrizzleRating(override: Partial<RatingProps> = {}) {
  const result = await db
    .insert(schema.ratings)
    .values({
      bookId: faker.string.uuid(),
      userId: faker.string.uuid(),
      description: faker.lorem.sentences(),
      rating: faker.number.int({ min: 0, max: 5 }),
      ...override,
    })
    .returning()

  return result[0]
}
