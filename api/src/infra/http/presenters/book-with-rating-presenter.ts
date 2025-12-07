import type { BookWithRating } from '../../../domain/entities/value-objects/book-with-rating.ts'
import { env } from '../../env.ts'

export class BookWithRatingPresenter {
  static toHTTP(book: BookWithRating) {
    const coverUrl = new URL(`/public/books/${book.coverUrl}`, env.API_BASE_URL)

    return {
      id: book.bookId.toString(),
      author: book.author,
      coverUrl: coverUrl.toString(),
      name: book.title,
      rating: book.score,
    }
  }
}
