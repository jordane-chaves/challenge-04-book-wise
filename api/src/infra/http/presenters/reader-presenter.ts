import type { Reader } from '../../../domain/entities/reader.ts'

export class ReaderPresenter {
  static toHTTP(reader: Reader) {
    return {
      id: reader.id.toString(),
      avatarUrl: reader.avatarUrl ?? null,
      name: reader.name,
      email: reader.email,
      createdAt: reader.createdAt,
    }
  }
}
