import {
  and,
  avg,
  count,
  countDistinct,
  desc,
  eq,
  ilike,
  sql,
} from 'drizzle-orm'
import type { Rating } from '../../../../domain/entities/rating.ts'
import type { BookWithRating } from '../../../../domain/entities/value-objects/book-with-rating.ts'
import type { RatingDetails } from '../../../../domain/entities/value-objects/rating-details.ts'
import type { RatingsRepository } from '../../../../domain/repositories/ratings-repository.ts'
import { db } from '../client.ts'
import { DrizzleBookWithRatingMapper } from '../mappers/drizzle-book-with-rating-mapper.ts'
import { DrizzleRatingDetailsMapper } from '../mappers/drizzle-rating-details-mapper.ts'
import { DrizzleRatingMapper } from '../mappers/drizzle-rating-mapper.ts'
import { schema } from '../schema/index.ts'

export class DrizzleRatingsRepository implements RatingsRepository {
  async countRatedBooksByReaderId(readerId: string): Promise<number> {
    const result = await db
      .select({
        count: countDistinct(schema.ratings.bookId).mapWith(Number),
      })
      .from(schema.ratings)
      .where(eq(schema.ratings.userId, readerId))

    return result[0]?.count ?? 0
  }

  async findByBookIdAndReaderId(
    bookId: string,
    readerId: string,
  ): Promise<Rating | null> {
    const result = await db
      .select()
      .from(schema.ratings)
      .where(
        and(
          eq(schema.ratings.bookId, bookId),
          eq(schema.ratings.userId, readerId),
        ),
      )

    if (!result.length) {
      return null
    }

    const rating = result[0]

    return DrizzleRatingMapper.toDomain(rating)
  }

  async findLastDetailsByReaderId(
    readerId: string,
  ): Promise<RatingDetails | null> {
    const result = await db
      .select({
        id: schema.ratings.id,
        userId: schema.ratings.userId,
        bookId: schema.ratings.bookId,
        user: schema.users.name,
        avatarUrl: schema.users.avatarUrl,
        score: schema.ratings.score,
        description: schema.ratings.description,
        title: schema.books.name,
        coverUrl: schema.books.coverUrl,
        author: schema.books.author,
        createdAt: schema.ratings.createdAt,
      })
      .from(schema.ratings)
      .innerJoin(schema.books, eq(schema.books.id, schema.ratings.bookId))
      .innerJoin(schema.users, eq(schema.users.id, schema.ratings.userId))
      .where(eq(schema.ratings.userId, readerId))
      .orderBy(desc(schema.ratings.createdAt))
      .limit(1)

    if (!result.length) {
      return null
    }

    const rating = result[0]

    return DrizzleRatingDetailsMapper.toDomain(rating)
  }

  async findManyByBookId(bookId: string): Promise<Rating[]> {
    const result = await db
      .select()
      .from(schema.ratings)
      .where(eq(schema.ratings.bookId, bookId))

    return result.map(DrizzleRatingMapper.toDomain)
  }

  async findManyByReaderId(readerId: string): Promise<Rating[]> {
    const result = await db
      .select()
      .from(schema.ratings)
      .where(eq(schema.ratings.userId, readerId))

    return result.map(DrizzleRatingMapper.toDomain)
  }

  async findManyPopularBooks(): Promise<BookWithRating[]> {
    const result = await db
      .select({
        id: schema.books.id,
        author: schema.books.author,
        coverUrl: schema.books.coverUrl,
        name: schema.books.name,
        createdAt: schema.books.createdAt,
        summary: schema.books.summary,
        totalPages: schema.books.totalPages,
        score: avg(schema.ratings.score).mapWith(Number),
      })
      .from(schema.books)
      .leftJoin(schema.ratings, eq(schema.ratings.bookId, schema.books.id))
      .groupBy(schema.books.id)
      .orderBy(
        desc(
          sql<number>`COALESCE(CAST(AVG(${schema.ratings.score}) AS float), 0)`,
        ),
        desc(count(schema.ratings.bookId)),
      )
      .limit(4)

    return result.map(DrizzleBookWithRatingMapper.toDomain)
  }

  async findManyRecentWithDetails(): Promise<RatingDetails[]> {
    const result = await db
      .select({
        id: schema.ratings.id,
        userId: schema.ratings.userId,
        bookId: schema.ratings.bookId,
        user: schema.users.name,
        avatarUrl: schema.users.avatarUrl,
        score: schema.ratings.score,
        description: schema.ratings.description,
        title: schema.books.name,
        coverUrl: schema.books.coverUrl,
        author: schema.books.author,
        createdAt: schema.ratings.createdAt,
      })
      .from(schema.ratings)
      .innerJoin(schema.books, eq(schema.books.id, schema.ratings.bookId))
      .innerJoin(schema.users, eq(schema.users.id, schema.ratings.userId))
      .orderBy(desc(schema.ratings.createdAt))

    return result.map(DrizzleRatingDetailsMapper.toDomain)
  }

  async findManyRecentWithDetailsByBookId(
    bookId: string,
  ): Promise<RatingDetails[]> {
    const result = await db
      .select({
        id: schema.ratings.id,
        userId: schema.ratings.userId,
        bookId: schema.ratings.bookId,
        user: schema.users.name,
        avatarUrl: schema.users.avatarUrl,
        score: schema.ratings.score,
        description: schema.ratings.description,
        title: schema.books.name,
        coverUrl: schema.books.coverUrl,
        author: schema.books.author,
        createdAt: schema.ratings.createdAt,
      })
      .from(schema.ratings)
      .innerJoin(schema.books, eq(schema.books.id, schema.ratings.bookId))
      .innerJoin(schema.users, eq(schema.users.id, schema.ratings.userId))
      .where(eq(schema.ratings.bookId, bookId))
      .orderBy(desc(schema.ratings.createdAt))

    return result.map(DrizzleRatingDetailsMapper.toDomain)
  }

  async searchManyDetailsByReaderId(
    readerId: string,
    query?: string | null,
  ): Promise<RatingDetails[]> {
    const result = await db
      .select({
        id: schema.ratings.id,
        userId: schema.ratings.userId,
        bookId: schema.ratings.bookId,
        user: schema.users.name,
        avatarUrl: schema.users.avatarUrl,
        score: schema.ratings.score,
        description: schema.ratings.description,
        title: schema.books.name,
        coverUrl: schema.books.coverUrl,
        author: schema.books.author,
        createdAt: schema.ratings.createdAt,
      })
      .from(schema.ratings)
      .innerJoin(schema.books, eq(schema.ratings.bookId, schema.books.id))
      .innerJoin(schema.users, eq(schema.users.id, schema.ratings.userId))
      .where(
        and(
          eq(schema.ratings.userId, readerId),
          query ? ilike(schema.books.name, `%${query}%`) : undefined,
        ),
      )
      .orderBy(
        desc(sql<string>`TO_CHAR(${schema.ratings.createdAt}, 'YYYY-MM-DD')`),
      )

    return result.map(DrizzleRatingDetailsMapper.toDomain)
  }

  async create(rating: Rating): Promise<void> {
    const data = DrizzleRatingMapper.toDrizzle(rating)

    await db.insert(schema.ratings).values(data)
  }
}
