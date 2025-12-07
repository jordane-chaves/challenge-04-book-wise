import { Entity } from '../../core/entities/entity.ts'
import type { UniqueEntityID } from '../../core/entities/unique-entity-id.ts'
import type { Optional } from '../../core/types/optional.ts'

export interface BookProps {
  coverUrl: string
  title: string
  author: string
  summary: string
  totalPages: number
  createdAt: Date
}

export class Book extends Entity<BookProps> {
  get coverUrl() {
    return this.props.coverUrl
  }

  get title() {
    return this.props.title
  }

  get author() {
    return this.props.author
  }

  get summary() {
    return this.props.summary
  }

  get totalPages() {
    return this.props.totalPages
  }

  get createdAt() {
    return this.props.createdAt
  }

  static create(props: Optional<BookProps, 'createdAt'>, id?: UniqueEntityID) {
    const book = new Book(
      { ...props, createdAt: props.createdAt ?? new Date() },
      id,
    )

    return book
  }
}
