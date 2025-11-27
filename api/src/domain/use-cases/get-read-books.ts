import { type Either, right } from '../../core/either.ts'
import type { RatingsRepository } from '../repositories/ratings-repository.ts'

interface GetReadBooksUseCaseRequest {
  readerId: string
}

type GetReadBooksUseCaseResponse = Either<
  null,
  {
    booksIds: string[]
  }
>

export class GetReadBooksUseCase {
  constructor(private readonly ratingsRepository: RatingsRepository) {}

  async execute(
    request: GetReadBooksUseCaseRequest,
  ): Promise<GetReadBooksUseCaseResponse> {
    const { readerId } = request

    const ratings = await this.ratingsRepository.findManyByReaderId(readerId)
    const booksIds = ratings.map((rating) => rating.bookId.toString())

    return right({
      booksIds,
    })
  }
}
