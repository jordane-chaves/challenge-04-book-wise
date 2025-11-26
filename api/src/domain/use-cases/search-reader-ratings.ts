import { type Either, right } from '../../core/either.ts'
import type { Rating } from '../entities/rating.ts'
import type { RatingsRepository } from '../repositories/ratings-repository.ts'

interface SearchReaderRatingsUseCaseRequest {
  readerId: string
  query?: string | null
}

type SearchReaderRatingsUseCaseResponse = Either<
  null,
  {
    ratings: Rating[]
  }
>

export class SearchReaderRatingsUseCase {
  constructor(private readonly ratingsRepository: RatingsRepository) {}

  async execute(
    request: SearchReaderRatingsUseCaseRequest,
  ): Promise<SearchReaderRatingsUseCaseResponse> {
    const { readerId, query } = request

    const ratings = await this.ratingsRepository.searchManyByReaderId(
      readerId,
      query,
    )

    return right({
      ratings,
    })
  }
}
