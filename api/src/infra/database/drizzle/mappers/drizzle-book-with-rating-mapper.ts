import type { InferSelectModel } from 'drizzle-orm'
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id.ts'
import { BookWithRating } from '../../../../domain/entities/value-objects/book-with-rating.ts'
import type { schema } from '../schema/index.ts'

type DrizzleBookWithRating = InferSelectModel<typeof schema.books> & {
  score: number
}

export class DrizzleBookWithRatingMapper {
  static toDomain(raw: DrizzleBookWithRating): BookWithRating {
    return BookWithRating.create({
      bookId: new UniqueEntityID(raw.id),
      author: raw.author,
      coverUrl: raw.coverUrl,
      title: raw.name,
      score: raw.score,
    })
  }
}
