import { faker } from '@faker-js/faker'
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

const booksIds = books.map((book) => book.id)
const usersIds = users.map((user) => user.id)

const RATING_VALUES = Array.from({ length: 10 }).map(
  (_, index) => (index + 1) / 2,
)

await db.insert(schema.ratings).values(
  Array.from({ length: 100 }).map(() => {
    return {
      bookId: faker.helpers.arrayElement(booksIds),
      userId: faker.helpers.arrayElement(usersIds),
      description: faker.lorem.paragraph(),
      rating: faker.helpers.arrayElement(RATING_VALUES),
    }
  }),
)

await db.$client.end()

console.log('🌱 Database seeded')
