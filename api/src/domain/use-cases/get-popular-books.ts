import { type Either, right } from '../../core/either.ts'
import type { BookWithRating } from '../entities/value-objects/book-with-rating.ts'
import type { RatingsRepository } from '../repositories/ratings-repository.ts'

type GetPopularBooksUseCaseResponse = Either<
  null,
  {
    books: BookWithRating[]
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
