import { type Either, right } from '../../core/either.ts'
import type { RatingDetails } from '../entities/value-objects/rating-details.ts'
import type { RatingsRepository } from '../repositories/ratings-repository.ts'

type FetchRecentRatingsUseCaseResponse = Either<
  null,
  {
    ratings: RatingDetails[]
  }
>

export class FetchRecentRatingsUseCase {
  constructor(private readonly ratingsRepository: RatingsRepository) {}

  async execute(): Promise<FetchRecentRatingsUseCaseResponse> {
    const ratings = await this.ratingsRepository.findManyRecentWithDetails()

    return right({
      ratings,
    })
  }
}
