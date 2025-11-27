import { type Either, right } from '../../core/either.ts'
import type { BooksRepository } from '../repositories/books-repository.ts'
import type { RatingsRepository } from '../repositories/ratings-repository.ts'

interface GetAuthorsReadAmountUseCaseRequest {
  readerId: string
}

type GetAuthorsReadAmountUseCaseResponse = Either<null, { amount: number }>

export class GetAuthorsReadAmountUseCase {
  constructor(
    private readonly ratingsRepository: RatingsRepository,
    private readonly booksRepository: BooksRepository,
  ) {}

  async execute(
    request: GetAuthorsReadAmountUseCaseRequest,
  ): Promise<GetAuthorsReadAmountUseCaseResponse> {
    const { readerId } = request

    const ratings = await this.ratingsRepository.findManyByReaderId(readerId)
    const booksIds = ratings.map((rating) => rating.bookId.toString())

    const authorsReadAmount =
      await this.booksRepository.countAuthorsByBooksIds(booksIds)

    return right({
      amount: authorsReadAmount,
    })
  }
}
