import { Entity } from '../../core/entities/entity.ts'
import type { UniqueEntityID } from '../../core/entities/unique-entity-id.ts'
import type { Optional } from '../../core/types/optional.ts'

export interface RatingProps {
  bookId: UniqueEntityID
  readerId: UniqueEntityID
  description: string
  score: number
  createdAt: Date
}

export class Rating extends Entity<RatingProps> {
  get bookId() {
    return this.props.bookId
  }

  get readerId() {
    return this.props.readerId
  }

  get description() {
    return this.props.description
  }

  get score() {
    return this.props.score
  }

  get createdAt() {
    return this.props.createdAt
  }

  static create(
    props: Optional<RatingProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const rating = new Rating(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return rating
  }
}
