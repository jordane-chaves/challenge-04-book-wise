import { pgEnum, pgTable, text, uniqueIndex, uuid } from 'drizzle-orm/pg-core'
import { users } from './users.ts'

export const providerEnum = pgEnum('provider', ['GITHUB', 'GOOGLE'])

export const accounts = pgTable(
  'accounts',
  {
    id: uuid().primaryKey().defaultRandom(),
    providerId: text().notNull(),
    userId: uuid()
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    provider: providerEnum().notNull(),
  },
  (table) => [uniqueIndex().on(table.provider, table.userId)],
)
