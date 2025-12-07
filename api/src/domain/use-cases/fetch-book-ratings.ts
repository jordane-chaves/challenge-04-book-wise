import { type Either, right } from '../../core/either.ts'
import type { RatingDetails } from '../entities/value-objects/rating-details.ts'
import type { RatingsRepository } from '../repositories/ratings-repository.ts'

interface FetchBookRatingsUseCaseRequest {
  bookId: string
}

type FetchBookRatingsUseCaseResponse = Either<
  null,
  {
    ratings: RatingDetails[]
  }
>

export class FetchBookRatingsUseCase {
  constructor(private readonly ratingsRepository: RatingsRepository) {}

  async execute(
    request: FetchBookRatingsUseCaseRequest,
  ): Promise<FetchBookRatingsUseCaseResponse> {
    const { bookId } = request

    const ratings =
      await this.ratingsRepository.findManyRecentWithDetailsByBookId(bookId)

    return right({
      ratings,
    })
  }
}
