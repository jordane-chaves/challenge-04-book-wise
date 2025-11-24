import { type Either, left, right } from '../../core/either.ts'
import { ResourceNotFoundError } from '../../core/errors/errors/resource-not-found-error.ts'
import type { Reader } from '../entities/reader.ts'
import type { ReadersRepository } from '../repositories/readers-repository.ts'

export interface GetReaderProfileUseCaseRequest {
  readerId: string
}

export type GetReaderProfileUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    reader: Reader
  }
>

export class GetReaderProfileUseCase {
  constructor(private readonly readersRepository: ReadersRepository) {}

  async execute(
    request: GetReaderProfileUseCaseRequest,
  ): Promise<GetReaderProfileUseCaseResponse> {
    const { readerId } = request

    const reader = await this.readersRepository.findById(readerId)

    if (!reader) {
      return left(new ResourceNotFoundError())
    }

    return right({
      reader,
    })
  }
}
