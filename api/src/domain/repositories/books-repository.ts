import type { Book } from '../entities/book.ts'

export interface SearchManyParams {
  categoryId?: string | null
  query?: string | null
}

export interface BooksRepository {
  findById(id: string): Promise<Book | null>
  searchMany(params: SearchManyParams): Promise<Book[]>
}
