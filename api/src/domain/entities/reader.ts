import { Entity } from '../../core/entities/entity.ts'
import type { UniqueEntityID } from '../../core/entities/unique-entity-id.ts'
import type { Optional } from '../../core/types/optional.ts'

export interface ReaderProps {
  name: string
  email: string
  avatarUrl?: string
  createdAt: Date
}

export class Reader extends Entity<ReaderProps> {
  get name() {
    return this.props.name
  }

  get email() {
    return this.props.email
  }

  get avatarUrl() {
    return this.props.avatarUrl
  }

  get createdAt() {
    return this.props.createdAt
  }

  static create(
    props: Optional<ReaderProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const reader = new Reader(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return reader
  }
}
