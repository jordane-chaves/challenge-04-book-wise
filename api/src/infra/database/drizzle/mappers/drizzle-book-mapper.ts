import type { InferSelectModel } from 'drizzle-orm'
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id.ts'
import { Book } from '../../../../domain/entities/book.ts'
import type { schema } from '../schema/index.ts'

type DrizzleBook = InferSelectModel<typeof schema.books>

export class DrizzleBookMapper {
  static toDomain(raw: DrizzleBook): Book {
    return Book.create(
      {
        title: raw.name,
        author: raw.author,
        coverUrl: raw.coverUrl,
        summary: raw.summary,
        totalPages: raw.totalPages,
        createdAt: raw.createdAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toDrizzle(book: Book): DrizzleBook {
    return {
      id: book.id.toString(),
      name: book.title,
      author: book.author,
      coverUrl: book.coverUrl,
      summary: book.summary,
      totalPages: book.totalPages,
      createdAt: book.createdAt,
    }
  }
}
