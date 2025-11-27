import type { Book } from '../entities/book.ts'

export interface SearchManyParams {
  categoryId?: string | null
  query?: string | null
}

export interface BooksRepository {
  countAuthorsByBooksIds(booksIds: string[]): Promise<number>
  findById(id: string): Promise<Book | null>
  searchMany(params: SearchManyParams): Promise<Book[]>
}
