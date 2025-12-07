import type { UniqueEntityID } from '../../../core/entities/unique-entity-id.ts'
import { ValueObject } from '../../../core/entities/value-object.ts'
import type { Category } from '../category.ts'

export interface BookDetailsProps {
  bookId: UniqueEntityID
  title: string
  author: string
  coverUrl: string
  score: number
  ratingCount: number
  totalPages: number
  categories: Category[]
}

export class BookDetails extends ValueObject<BookDetailsProps> {
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

  get ratingCount() {
    return this.props.ratingCount
  }

  get totalPages() {
    return this.props.totalPages
  }

  get categories() {
    return this.props.categories
  }

  static create(props: BookDetailsProps) {
    return new BookDetails(props)
  }
}
