import { type Either, right } from '../../core/either.ts'
import type { Rating } from '../entities/rating.ts'
import type { RatingsRepository } from '../repositories/ratings-repository.ts'

interface FetchBookRatingsUseCaseRequest {
  bookId: string
}

type FetchBookRatingsUseCaseResponse = Either<
  null,
  {
    ratings: Rating[]
  }
>

export class FetchBookRatingsUseCase {
  constructor(private readonly ratingsRepository: RatingsRepository) {}

  async execute(
    request: FetchBookRatingsUseCaseRequest,
  ): Promise<FetchBookRatingsUseCaseResponse> {
    const { bookId } = request

    const ratings = await this.ratingsRepository.findManyByBookId(bookId)

    return right({
      ratings,
    })
  }
}
