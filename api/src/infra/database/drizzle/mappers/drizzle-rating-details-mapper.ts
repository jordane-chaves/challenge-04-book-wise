import type { InferSelectModel } from 'drizzle-orm'
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id.ts'
import { RatingDetails } from '../../../../domain/entities/value-objects/rating-details.ts'
import type { schema } from '../schema/index.ts'

type DrizzleRatingDetails = InferSelectModel<typeof schema.ratings> & {
  user: string
  avatarUrl?: string | null
  title: string
  coverUrl: string
  author: string
}

export class DrizzleRatingDetailsMapper {
  static toDomain(raw: DrizzleRatingDetails): RatingDetails {
    return RatingDetails.create({
      ratingId: new UniqueEntityID(raw.id),
      bookId: new UniqueEntityID(raw.bookId),
      readerId: new UniqueEntityID(raw.userId),
      reader: raw.user,
      avatarUrl: raw.avatarUrl,
      description: raw.description,
      score: raw.score,
      title: raw.title,
      coverUrl: raw.coverUrl,
      author: raw.author,
      createdAt: raw.createdAt,
    })
  }
}
