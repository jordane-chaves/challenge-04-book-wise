import { GetReaderProfileUseCase } from '../../domain/use-cases/get-reader-profile.ts'
import { DrizzleReadersRepository } from '../database/drizzle/repositories/drizzle-readers-repository.ts'

export function makeGetReaderProfileUseCase() {
  const readersRepository = new DrizzleReadersRepository()

  return new GetReaderProfileUseCase(readersRepository)
}
