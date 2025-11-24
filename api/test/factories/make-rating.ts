import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '../../src/core/entities/unique-entity-id.ts'
import { Rating, type RatingProps } from '../../src/domain/entities/rating.ts'
import { db } from '../../src/infra/database/drizzle/client.ts'
import { schema } from '../../src/infra/database/drizzle/schema/index.ts'

export function makeRating(
  override: Partial<RatingProps>,
  id?: UniqueEntityID,
) {
  return Rating.create(
    {
      bookId: new UniqueEntityID(),
      readerId: new UniqueEntityID(),
      description: faker.lorem.sentence(),
      score: faker.number.int({ min: 0, max: 5 }),
      ...override,
    },
    id,
  )
}

interface DrizzleRatingProps {
  bookId: string
  userId: string
  description: string
  rating: number
  createdAt?: Date
}

export async function makeDrizzleRating(
  override: Partial<DrizzleRatingProps> = {},
) {
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
