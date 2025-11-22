import { Entity } from '../../core/entities/entity.ts'
import type { UniqueEntityID } from '../../core/entities/unique-entity-id.ts'

export interface BookCategoryProps {
  bookId: UniqueEntityID
  categoryId: UniqueEntityID
}

export class BookCategory extends Entity<BookCategoryProps> {
  get bookId() {
    return this.props.bookId
  }

  get categoryId() {
    return this.props.categoryId
  }

  static create(props: BookCategoryProps, id?: UniqueEntityID) {
    const bookCategory = new BookCategory(props, id)

    return bookCategory
  }
}
