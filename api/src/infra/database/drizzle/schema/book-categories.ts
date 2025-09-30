import { pgTable, uuid } from 'drizzle-orm/pg-core'
import { books } from './books.ts'
import { categories } from './categories.ts'

export const bookCategories = pgTable('book_categories', {
  id: uuid().primaryKey().defaultRandom(),
  bookId: uuid()
    .notNull()
    .references(() => books.id, { onDelete: 'cascade' }),
  categoryId: uuid()
    .notNull()
    .references(() => categories.id, { onDelete: 'cascade' }),
})
