import { makeBook } from '../../../test/factories/make-book.ts'
import { makeRating } from '../../../test/factories/make-rating.ts'
import { InMemoryBookCategoriesRepository } from '../../../test/repositories/in-memory-book-categories-repository.ts'
import { InMemoryBooksRepository } from '../../../test/repositories/in-memory-books-repository.ts'
import { InMemoryRatingsRepository } from '../../../test/repositories/in-memory-ratings-repository.ts'
import { InMemoryReadersRepository } from '../../../test/repositories/in-memory-readers-repository.ts'
import { GetPopularBooksUseCase } from './get-popular-books.ts'

let inMemoryBookCategoriesRepository: InMemoryBookCategoriesRepository
let inMemoryBooksRepository: InMemoryBooksRepository
let inMemoryRatingsRepository: InMemoryRatingsRepository
let inMemoryReadersRepository: InMemoryReadersRepository

let sut: GetPopularBooksUseCase

describe('Get Popular Books', () => {
  beforeEach(() => {
    inMemoryReadersRepository = new InMemoryReadersRepository()
    inMemoryBookCategoriesRepository = new InMemoryBookCategoriesRepository()
    inMemoryBooksRepository = new InMemoryBooksRepository(
      inMemoryBookCategoriesRepository,
    )

    inMemoryRatingsRepository = new InMemoryRatingsRepository(
      inMemoryBooksRepository,
      inMemoryReadersRepository,
    )

    sut = new GetPopularBooksUseCase(inMemoryRatingsRepository)
  })

  it('should be able to get the popular books', async () => {
    const book1 = makeBook()
    const book2 = makeBook()
    const book3 = makeBook()
    const book4 = makeBook()
    const book5 = makeBook()

    inMemoryBooksRepository.items.push(book1, book2, book3, book4, book5)

    inMemoryRatingsRepository.items.push(
      makeRating({ bookId: book1.id, score: 1 }),
      makeRating({ bookId: book2.id, score: 3 }),
      makeRating({ bookId: book3.id, score: 5 }),
      makeRating({ bookId: book4.id, score: 2 }),
      makeRating({ bookId: book5.id, score: 4 }),
    )

    const result = await sut.execute()

    expect(result.isRight()).toBe(true)
    expect(result.value?.books).toHaveLength(4)
    expect(result.value).toEqual({
      books: [
        expect.objectContaining({ bookId: book3.id, score: 5 }),
        expect.objectContaining({ bookId: book5.id, score: 4 }),
        expect.objectContaining({ bookId: book2.id, score: 3 }),
        expect.objectContaining({ bookId: book4.id, score: 2 }),
      ],
    })
  })
})
