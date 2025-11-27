import { Entity } from '../../core/entities/entity.ts'
import type { UniqueEntityID } from '../../core/entities/unique-entity-id.ts'

export interface BookProps {
  title: string
  author: string
  totalPages: number
}

export class Book extends Entity<BookProps> {
  get title() {
    return this.props.title
  }

  get author() {
    return this.props.author
  }

  get totalPages() {
    return this.props.totalPages
  }

  static create(props: BookProps, id?: UniqueEntityID) {
    const book = new Book(props, id)

    return book
  }
}
