import type { InferSelectModel } from 'drizzle-orm'
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id.ts'
import { Rating } from '../../../../domain/entities/rating.ts'
import type { schema } from '../schema/index.ts'

type DrizzleRating = InferSelectModel<typeof schema.ratings>

export class DrizzleRatingMapper {
  static toDomain(raw: DrizzleRating): Rating {
    return Rating.create(
      {
        bookId: new UniqueEntityID(raw.bookId),
        readerId: new UniqueEntityID(raw.userId),
        description: raw.description,
        score: raw.score,
        createdAt: raw.createdAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toDrizzle(rating: Rating): DrizzleRating {
    return {
      id: rating.id.toString(),
      bookId: rating.bookId.toString(),
      userId: rating.readerId.toString(),
      description: rating.description,
      score: rating.score,
      createdAt: rating.createdAt,
    }
  }
}
