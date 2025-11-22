import { type Either, right } from '../../core/either.ts'
import type { Book } from '../entities/book.ts'
import type { BooksRepository } from '../repositories/books-repository.ts'

export interface SearchBooksUseCaseRequest {
  categoryId?: string | null
  query?: string | null
}

export type SearchBooksUseCaseResponse = Either<null, { books: Book[] }>

export class SearchBooksUseCase {
  constructor(private readonly booksRepository: BooksRepository) {}

  async execute(
    request: SearchBooksUseCaseRequest,
  ): Promise<SearchBooksUseCaseResponse> {
    const { categoryId, query } = request

    const books = await this.booksRepository.searchMany({
      categoryId,
      query,
    })

    return right({
      books,
    })
  }
}
