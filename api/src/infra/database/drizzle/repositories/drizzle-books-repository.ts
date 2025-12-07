import {
  and,
  avg,
  countDistinct,
  eq,
  ilike,
  inArray,
  or,
  sum,
} from 'drizzle-orm'
import type { Book } from '../../../../domain/entities/book.ts'
import type { BookWithRating } from '../../../../domain/entities/value-objects/book-with-rating.ts'
import type {
  BooksRepository,
  SearchManyParams,
} from '../../../../domain/repositories/books-repository.ts'
import { db } from '../client.ts'
import { DrizzleBookMapper } from '../mappers/drizzle-book-mapper.ts'
import { DrizzleBookWithRatingMapper } from '../mappers/drizzle-book-with-rating-mapper.ts'
import { schema } from '../schema/index.ts'

export class DrizzleBooksRepository implements BooksRepository {
  async countAuthorsByBooksIds(booksIds: string[]): Promise<number> {
    const result = await db
      .select({
        count: countDistinct(schema.books.author).mapWith(Number),
      })
      .from(schema.books)
      .where(inArray(schema.books.id, booksIds))

    return result[0]?.count ?? 0
  }

  async sumPagesByBooksIds(booksIds: string[]): Promise<number> {
    const result = await db
      .select({
        amount: sum(schema.books.totalPages).mapWith(Number),
      })
      .from(schema.books)
      .where(inArray(schema.books.id, booksIds))

    return result[0]?.amount ?? 0
  }

  async findById(id: string): Promise<Book | null> {
    const result = await db
      .select()
      .from(schema.books)
      .where(eq(schema.books.id, id))

    if (!result.length) {
      return null
    }

    const book = result[0]

    return DrizzleBookMapper.toDomain(book)
  }

  async searchMany({
    categoryId,
    query,
  }: SearchManyParams): Promise<BookWithRating[]> {
    const result = await db
      .select({
        id: schema.books.id,
        name: schema.books.name,
        author: schema.books.author,
        summary: schema.books.summary,
        coverUrl: schema.books.coverUrl,
        totalPages: schema.books.totalPages,
        createdAt: schema.books.createdAt,
        score: avg(schema.ratings.score).mapWith(Number),
      })
      .from(schema.books)
      .leftJoin(
        schema.bookCategories,
        eq(schema.bookCategories.bookId, schema.books.id),
      )
      .leftJoin(schema.ratings, eq(schema.ratings.bookId, schema.books.id))
      .where(
        and(
          categoryId
            ? eq(schema.bookCategories.categoryId, categoryId)
            : undefined,
          query
            ? or(
                ilike(schema.books.author, `%${query}%`),
                ilike(schema.books.name, `%${query}%`),
              )
            : undefined,
        ),
      )
      .groupBy(schema.books.id)

    return result.map(DrizzleBookWithRatingMapper.toDomain)
  }
}
