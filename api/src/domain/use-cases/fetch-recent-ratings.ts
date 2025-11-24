import { type Either, right } from '../../core/either.ts'
import type { Rating } from '../entities/rating.ts'
import type { RatingsRepository } from '../repositories/ratings-repository.ts'

type FetchRecentRatingsUseCaseResponse = Either<
  null,
  {
    ratings: Rating[]
  }
>

export class FetchRecentRatingsUseCase {
  constructor(private ratingsRepository: RatingsRepository) {}

  async execute(): Promise<FetchRecentRatingsUseCaseResponse> {
    const ratings = await this.ratingsRepository.findManyRecent()

    return right({
      ratings,
    })
  }
}
