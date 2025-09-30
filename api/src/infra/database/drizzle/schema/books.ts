import { integer, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const books = pgTable('books', {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  author: text().notNull(),
  summary: text().notNull(),
  coverUrl: text().notNull(),
  totalPages: integer().notNull(),
  createdAt: timestamp().defaultNow().notNull(),
})
