import { pgEnum, pgTable, text, unique, uuid } from 'drizzle-orm/pg-core'
import { users } from './users.ts'

export const providerEnum = pgEnum('provider', ['GITHUB', 'GOOGLE'])

export const accounts = pgTable(
  'accounts',
  {
    id: uuid().primaryKey().defaultRandom(),
    providerId: text().notNull(),
    userId: uuid()
      .notNull()
      .references(() => users.id),
    provider: providerEnum().notNull(),
  },
  (table) => [unique().on(table.provider, table.userId)],
)
