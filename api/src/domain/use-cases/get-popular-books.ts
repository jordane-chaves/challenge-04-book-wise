import { type Either, right } from '../../core/either.ts'
import type { Book } from '../entities/book.ts'
import type { RatingsRepository } from '../repositories/ratings-repository.ts'

type GetPopularBooksUseCaseResponse = Either<
  null,
  {
    books: Book[]
  }
>

export class GetPopularBooksUseCase {
  constructor(private readonly ratingsRepository: RatingsRepository) {}

  async execute(): Promise<GetPopularBooksUseCaseResponse> {
    const books = await this.ratingsRepository.findManyPopularBooks()

    return right({
      books,
    })
  }
}
