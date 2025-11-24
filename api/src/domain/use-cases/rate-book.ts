import { type Either, left, right } from '../../core/either.ts'
import { UniqueEntityID } from '../../core/entities/unique-entity-id.ts'
import { ConflictError } from '../../core/errors/errors/conflict-error.ts'
import { ResourceNotFoundError } from '../../core/errors/errors/resource-not-found-error.ts'
import { Rating } from '../entities/rating.ts'
import type { BooksRepository } from '../repositories/books-repository.ts'
import type { RatingsRepository } from '../repositories/ratings-repository.ts'

interface RateBookUseCaseRequest {
  bookId: string
  readerId: string
  description: string
  score: number
}

type RateBookUseCaseResponse = Either<
  ConflictError | ResourceNotFoundError,
  {
    rating: Rating
  }
>

export class RateBookUseCase {
  constructor(
    private readonly ratingsRepository: RatingsRepository,
    private readonly booksRepository: BooksRepository,
  ) {}

  async execute({
    bookId,
    readerId,
    description,
    score,
  }: RateBookUseCaseRequest): Promise<RateBookUseCaseResponse> {
    const book = await this.booksRepository.findById(bookId)

    if (!book) {
      return left(new ResourceNotFoundError())
    }

    const ratingExists = await this.ratingsRepository.findByBookIdAndReaderId(
      bookId,
      readerId,
    )

    if (ratingExists) {
      return left(new ConflictError())
    }

    const rating = Rating.create({
      bookId: new UniqueEntityID(bookId),
      readerId: new UniqueEntityID(readerId),
      description,
      score,
    })

    await this.ratingsRepository.create(rating)

    return right({
      rating,
    })
  }
}
