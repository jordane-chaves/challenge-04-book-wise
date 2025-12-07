import type { BookDetails } from '../../../domain/entities/value-objects/book-details.ts'
import { env } from '../../env.ts'

export class BookDetailsPresenter {
  static toHTTP(book: BookDetails) {
    const coverUrl = new URL(`/public/books/${book.coverUrl}`, env.API_BASE_URL)

    return {
      id: book.bookId.toString(),
      name: book.title,
      author: book.author,
      coverUrl: coverUrl.toString(),
      rating: book.score,
      ratingCount: book.ratingCount,
      totalPages: book.totalPages,
      categories: book.categories.map((category) => category.name),
    }
  }
}
