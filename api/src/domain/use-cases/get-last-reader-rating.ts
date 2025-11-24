import { type Either, right } from '../../core/either.ts'
import type { Rating } from '../entities/rating.ts'
import type { RatingsRepository } from '../repositories/ratings-repository.ts'

interface GetLastReaderRatingUseCaseRequest {
  readerId: string
}

type GetLastReaderRatingUseCaseResponse = Either<
  null,
  {
    rating: Rating | null
  }
>

export class GetLastReaderRatingUseCase {
  constructor(private readonly ratingsRepository: RatingsRepository) {}

  async execute(
    request: GetLastReaderRatingUseCaseRequest,
  ): Promise<GetLastReaderRatingUseCaseResponse> {
    const { readerId } = request

    const rating = await this.ratingsRepository.findLastByReaderId(readerId)

    return right({
      rating,
    })
  }
}
