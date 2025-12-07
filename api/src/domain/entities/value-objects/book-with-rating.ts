import type { UniqueEntityID } from '../../../core/entities/unique-entity-id.ts'
import { ValueObject } from '../../../core/entities/value-object.ts'

export interface BookWithRatingProps {
  bookId: UniqueEntityID
  author: string
  coverUrl: string
  title: string
  score: number
}

export class BookWithRating extends ValueObject<BookWithRatingProps> {
  get bookId() {
    return this.props.bookId
  }

  get title() {
    return this.props.title
  }

  get author() {
    return this.props.author
  }

  get coverUrl() {
    return this.props.coverUrl
  }

  get score() {
    return Math.round(this.props.score * 2) / 2 // round to half
  }

  static create(props: BookWithRatingProps) {
    return new BookWithRating(props)
  }
}
