import type { Reader } from '../entities/reader.ts'

export interface ReadersRepository {
  findById(id: string): Promise<Reader | null>
}
