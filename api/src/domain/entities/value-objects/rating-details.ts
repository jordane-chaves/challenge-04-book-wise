import type { UniqueEntityID } from '../../../core/entities/unique-entity-id.ts'
import { ValueObject } from '../../../core/entities/value-object.ts'

export interface RatingDetailsProps {
  bookId: UniqueEntityID
  ratingId: UniqueEntityID
  readerId: UniqueEntityID
  reader: string
  avatarUrl?: string | null
  title: string
  coverUrl: string
  author: string
  score: number
  description: string
  createdAt: Date
}

export class RatingDetails extends ValueObject<RatingDetailsProps> {
  get bookId() {
    return this.props.bookId
  }

  get ratingId() {
    return this.props.ratingId
  }

  get readerId() {
    return this.props.readerId
  }

  get reader() {
    return this.props.reader
  }

  get avatarUrl() {
    return this.props.avatarUrl
  }

  get title() {
    return this.props.title
  }

  get coverUrl() {
    return this.props.coverUrl
  }

  get author() {
    return this.props.author
  }

  get score() {
    return this.props.score
  }

  get description() {
    return this.props.description
  }

  get createdAt() {
    return this.props.createdAt
  }

  static create(props: RatingDetailsProps) {
    return new RatingDetails(props)
  }
}
