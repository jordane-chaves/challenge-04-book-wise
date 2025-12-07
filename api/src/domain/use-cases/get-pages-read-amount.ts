import { type Either, right } from '../../core/either.ts'
import type { BooksRepository } from '../repositories/books-repository.ts'
import type { RatingsRepository } from '../repositories/ratings-repository.ts'

interface GetPagesReadAmountUseCaseRequest {
  readerId: string
}

type GetPagesReadAmountUseCaseResponse = Either<null, { amount: number }>

export class GetPagesReadAmountUseCase {
  constructor(
    private readonly ratingsRepository: RatingsRepository,
    private readonly booksRepository: BooksRepository,
  ) {}

  async execute(
    request: GetPagesReadAmountUseCaseRequest,
  ): Promise<GetPagesReadAmountUseCaseResponse> {
    const { readerId } = request

    const ratings = await this.ratingsRepository.findManyByReaderId(readerId)
    const booksIds = ratings.map((rating) => rating.bookId.toString())

    const pagesReadAmount =
      await this.booksRepository.sumPagesByBooksIds(booksIds)

    return right({
      amount: pagesReadAmount,
    })
  }
}
