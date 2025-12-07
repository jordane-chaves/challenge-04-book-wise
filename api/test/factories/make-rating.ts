import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '../../src/core/entities/unique-entity-id.ts'
import { Rating, type RatingProps } from '../../src/domain/entities/rating.ts'
import { db } from '../../src/infra/database/drizzle/client.ts'
import { DrizzleRatingMapper } from '../../src/infra/database/drizzle/mappers/drizzle-rating-mapper.ts'
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

export async function makeDrizzleRating(data: Partial<RatingProps> = {}) {
  const rating = makeRating(data)

  await db.insert(schema.ratings).values(DrizzleRatingMapper.toDrizzle(rating))

  return rating
}
