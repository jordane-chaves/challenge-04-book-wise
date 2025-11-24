import type { Reader } from '../../src/domain/entities/reader.ts'
import type { ReadersRepository } from '../../src/domain/repositories/readers-repository.ts'

export class InMemoryReadersRepository implements ReadersRepository {
  public items: Reader[] = []

  async findById(id: string): Promise<Reader | null> {
    const reader = this.items.find((item) => item.id.toString() === id)

    if (!reader) {
      return null
    }

    return reader
  }
}
