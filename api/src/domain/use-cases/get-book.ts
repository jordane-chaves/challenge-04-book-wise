import { type Either, left, right } from '../../core/either.ts'
import { ResourceNotFoundError } from '../../core/errors/errors/resource-not-found-error.ts'
import { BookDetails } from '../entities/value-objects/book-details.ts'
import type { BooksRepository } from '../repositories/books-repository.ts'
import type { CategoriesRepository } from '../repositories/categories-repository.ts'
import type { RatingsRepository } from '../repositories/ratings-repository.ts'

interface GetBookUseCaseRequest {
  bookId: string
}

type GetBookUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    book: BookDetails
  }
>

export class GetBookUseCase {
  constructor(
    private readonly booksRepository: BooksRepository,
    private readonly categoriesRepository: CategoriesRepository,
    private readonly ratingsRepository: RatingsRepository,
  ) {}

  async execute(
    request: GetBookUseCaseRequest,
  ): Promise<GetBookUseCaseResponse> {
    const { bookId } = request

    const book = await this.booksRepository.findById(bookId)

    if (!book) {
      return left(new ResourceNotFoundError())
    }

    const categories = await this.categoriesRepository.findManyByBookId(
      book.id.toString(),
    )

    const ratings = await this.ratingsRepository.findManyByBookId(
      book.id.toString(),
    )

    const bookScoreSum = ratings.reduce((acc, rating) => {
      return acc + rating.score
    }, 0)

    const bookScore = bookScoreSum > 0 ? bookScoreSum / ratings.length : 0

    const bookDetails = BookDetails.create({
      bookId: book.id,
      title: book.title,
      author: book.author,
      coverUrl: book.coverUrl,
      totalPages: book.totalPages,
      score: bookScore,
      ratingCount: ratings.length,
      categories,
    })

    return right({
      book: bookDetails,
    })
  }
}
