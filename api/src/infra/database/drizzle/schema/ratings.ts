import {
  numeric,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from 'drizzle-orm/pg-core'
import { books } from './books.ts'
import { users } from './users.ts'

export const ratings = pgTable(
  'ratings',
  {
    id: uuid().primaryKey().defaultRandom(),
    bookId: uuid()
      .notNull()
      .references(() => books.id, { onDelete: 'cascade' }),
    userId: uuid()
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    score: numeric({ mode: 'number' }).notNull(),
    description: text().notNull(),
    createdAt: timestamp().defaultNow().notNull(),
  },
  (table) => [uniqueIndex().on(table.bookId, table.userId)],
)
