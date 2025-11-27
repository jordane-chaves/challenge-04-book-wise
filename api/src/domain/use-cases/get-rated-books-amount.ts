import { type Either, right } from '../../core/either.ts'
import type { RatingsRepository } from '../repositories/ratings-repository.ts'

interface GetRatedBooksAmountUseCaseRequest {
  readerId: string
}

type GetRatedBooksAmountUseCaseResponse = Either<null, { amount: number }>

export class GetRatedBooksAmountUseCase {
  constructor(private readonly ratingsRepository: RatingsRepository) {}

  async execute(
    request: GetRatedBooksAmountUseCaseRequest,
  ): Promise<GetRatedBooksAmountUseCaseResponse> {
    const { readerId } = request

    const ratedBooksAmount =
      await this.ratingsRepository.countRatedBooksByReaderId(readerId)

    return right({
      amount: ratedBooksAmount,
    })
  }
}
