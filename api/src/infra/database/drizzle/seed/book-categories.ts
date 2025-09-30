import type { PgInsertValue } from 'drizzle-orm/pg-core'
import type { schema } from '../schema/index.ts'
import { books } from './books.ts'

type BookCategory = PgInsertValue<typeof schema.bookCategories>

export const bookCategories = books.reduce((bookCategories, book) => {
  for (const category of book.categories) {
    bookCategories.push({ bookId: book.id, categoryId: category.id })
  }

  return bookCategories
}, [] as BookCategory[])
