import type { Book } from '../entities/book.ts'

export interface SearchManyParams {
  categoryId?: string | null
  query?: string | null
}

export interface BooksRepository {
  searchMany(params: SearchManyParams): Promise<Book[]>
}
