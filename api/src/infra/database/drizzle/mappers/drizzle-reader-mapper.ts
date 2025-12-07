import type { InferSelectModel } from 'drizzle-orm'
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id.ts'
import { Reader } from '../../../../domain/entities/reader.ts'
import type { schema } from '../schema/index.ts'

type DrizzleUser = InferSelectModel<typeof schema.users>

export class DrizzleReaderMapper {
  static toDomain(raw: DrizzleUser): Reader {
    return Reader.create(
      {
        email: raw.email,
        name: raw.name,
        avatarUrl: raw.avatarUrl,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toDrizzle(reader: Reader): DrizzleUser {
    return {
      id: reader.id.toString(),
      avatarUrl: reader.avatarUrl ?? null,
      email: reader.email,
      name: reader.name,
      createdAt: reader.createdAt,
      updatedAt: reader.updatedAt ?? null,
    }
  }
}
