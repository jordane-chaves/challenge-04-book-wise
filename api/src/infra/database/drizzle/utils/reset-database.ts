import { db } from '../client.ts'
import { schema } from '../schema/index.ts'

export async function resetDatabase() {
  for await (const table of Object.values(schema)) {
    await db.delete(table)
  }
}
