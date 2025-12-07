import { eq } from 'drizzle-orm'
import type { Reader } from '../../../../domain/entities/reader.ts'
import type { ReadersRepository } from '../../../../domain/repositories/readers-repository.ts'
import { db } from '../client.ts'
import { DrizzleReaderMapper } from '../mappers/drizzle-reader-mapper.ts'
import { schema } from '../schema/index.ts'

export class DrizzleReadersRepository implements ReadersRepository {
  async findById(id: string): Promise<Reader | null> {
    const result = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.id, id))

    if (!result.length) {
      return null
    }

    const user = result[0]

    return DrizzleReaderMapper.toDomain(user)
  }
}
