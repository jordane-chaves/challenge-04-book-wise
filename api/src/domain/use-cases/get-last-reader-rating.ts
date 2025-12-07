import { type Either, right } from '../../core/either.ts'
import type { RatingDetails } from '../entities/value-objects/rating-details.ts'
import type { RatingsRepository } from '../repositories/ratings-repository.ts'

interface GetLastReaderRatingUseCaseRequest {
  readerId: string
}

type GetLastReaderRatingUseCaseResponse = Either<
  null,
  {
    rating: RatingDetails | null
  }
>

export class GetLastReaderRatingUseCase {
  constructor(private readonly ratingsRepository: RatingsRepository) {}

  async execute(
    request: GetLastReaderRatingUseCaseRequest,
  ): Promise<GetLastReaderRatingUseCaseResponse> {
    const { readerId } = request

    const rating =
      await this.ratingsRepository.findLastDetailsByReaderId(readerId)

    return right({
      rating,
    })
  }
}
