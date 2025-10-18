import { faker } from '@faker-js/faker'
import type { PgInsertValue } from 'drizzle-orm/pg-core'
import { db } from '../client.ts'
import { schema } from '../schema/index.ts'
import { bookCategories } from './book-categories.ts'
import { books } from './books.ts'
import { categories } from './categories.ts'

/** Reset database */
for await (const table of Object.values(schema)) {
  await db.delete(table)
}

await db.insert(schema.books).values(books)
await db.insert(schema.categories).values(categories)
await db.insert(schema.bookCategories).values(bookCategories)

const users = await db
  .insert(schema.users)
  .values(
    Array.from({ length: 10 }).map(() => {
      return {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        avatarUrl: faker.image.avatarGitHub(),
      }
    }),
  )
  .returning()

/**
 * Create ratings
 */
const HALF_RATING_VALUES = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5]

const booksIds = books.map((book) => book.id)
const usersIds = users.map((user) => user.id)

const possibleUserRatings = booksIds.flatMap((bookId) => {
  return usersIds.map((userId) => ({ bookId, userId }))
})

const totalRatings = faker.number.int(possibleUserRatings.length)

const ratings: PgInsertValue<typeof schema.ratings>[] = possibleUserRatings
  .slice(0, totalRatings)
  .map((item) => {
    return {
      bookId: item.bookId,
      userId: item.userId,
      description: faker.lorem.paragraph(),
      rating: faker.helpers.arrayElement(HALF_RATING_VALUES),
      createdAt: faker.date.recent(),
    }
  })

await db.insert(schema.ratings).values(ratings)

await db.$client.end()

console.log('🌱 Database seeded')
