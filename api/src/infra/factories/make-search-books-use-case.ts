import { SearchBooksUseCase } from '../../domain/use-cases/search-books.ts'
import { DrizzleBooksRepository } from '../database/drizzle/repositories/drizzle-books-repository.ts'

export function makeSearchBooksUseCase() {
  const booksRepository = new DrizzleBooksRepository()

  return new SearchBooksUseCase(booksRepository)
}
