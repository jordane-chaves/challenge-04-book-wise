import { type Either, left, right } from '../../core/either.ts'
import { ResourceNotFoundError } from '../../core/errors/errors/resource-not-found-error.ts'
import type { Book } from '../entities/book.ts'
import type { BooksRepository } from '../repositories/books-repository.ts'

interface GetBookUseCaseRequest {
  bookId: string
}

type GetBookUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    book: Book
  }
>

export class GetBookUseCase {
  constructor(private booksRepository: BooksRepository) {}

  async execute(
    request: GetBookUseCaseRequest,
  ): Promise<GetBookUseCaseResponse> {
    const { bookId } = request

    const book = await this.booksRepository.findById(bookId)

    if (!book) {
      return left(new ResourceNotFoundError())
    }

    return right({
      book,
    })
  }
}
