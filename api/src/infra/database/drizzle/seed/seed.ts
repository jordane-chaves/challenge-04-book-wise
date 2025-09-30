import { reset, seed } from 'drizzle-seed'
import { db } from '../client.ts'
import { schema } from '../schema/index.ts'
import { bookCategories } from './book-categories.ts'
import { books } from './books.ts'
import { categories } from './categories.ts'

await reset(db, schema)

await db.insert(schema.books).values(books)
await db.insert(schema.categories).values(categories)
await db.insert(schema.bookCategories).values(bookCategories)

const booksIds = books.map((book) => book.id)
const ratings = Array.from({ length: 10 }).map((_, index) => (index + 1) / 2)

await seed(db, {
  users: schema.users,
  ratings: schema.ratings,
}).refine((funcs) => {
  return {
    ratings: {
      count: 100,
      columns: {
        bookId: funcs.valuesFromArray({ values: booksIds }),
        rating: funcs.valuesFromArray({ values: ratings }),
      },
    },
  }
})

await db.$client.end()

console.log('🌱 Database seeded')
