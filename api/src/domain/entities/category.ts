import { Entity } from '../../core/entities/entity.ts'
import type { UniqueEntityID } from '../../core/entities/unique-entity-id.ts'

export interface CategoryProps {
  name: string
}

export class Category extends Entity<CategoryProps> {
  get name() {
    return this.props.name
  }

  static create(props: CategoryProps, id?: UniqueEntityID) {
    const category = new Category(props, id)

    return category
  }
}
