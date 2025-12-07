import { makeBook } from '../../../test/factories/make-book.ts'
import { makeRating } from '../../../test/factories/make-rating.ts'
import { makeReader } from '../../../test/factories/make-reader.ts'
import { InMemoryBookCategoriesRepository } from '../../../test/repositories/in-memory-book-categories-repository.ts'
import { InMemoryBooksRepository } from '../../../test/repositories/in-memory-books-repository.ts'
import { InMemoryRatingsRepository } from '../../../test/repositories/in-memory-ratings-repository.ts'
import { InMemoryReadersRepository } from '../../../test/repositories/in-memory-readers-repository.ts'
import { FetchRecentRatingsUseCase } from './fetch-recent-ratings.ts'

let inMemoryBookCategoriesRepository: InMemoryBookCategoriesRepository
let inMemoryBooksRepository: InMemoryBooksRepository
let inMemoryRatingsRepository: InMemoryRatingsRepository
let inMemoryReadersRepository: InMemoryReadersRepository

let sut: FetchRecentRatingsUseCase

describe('Fetch Recent Ratings', () => {
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

    sut = new FetchRecentRatingsUseCase(inMemoryRatingsRepository)
  })

  it('should be able to fetch recent ratings', async () => {
    const reader = makeReader()
    inMemoryReadersRepository.items.push(reader)

    const book1 = makeBook()
    const book2 = makeBook()
    const book3 = makeBook()
    inMemoryBooksRepository.items.push(book1, book2, book3)

    const rating1 = makeRating({
      bookId: book1.id,
      readerId: reader.id,
      createdAt: new Date(Date.now() - 2),
    })

    const rating2 = makeRating({
      bookId: book2.id,
      readerId: reader.id,
      createdAt: new Date(),
    })

    const rating3 = makeRating({
      bookId: book3.id,
      readerId: reader.id,
      createdAt: new Date(Date.now() - 1),
    })

    inMemoryRatingsRepository.items.push(rating1, rating2, rating3)

    const result = await sut.execute()

    expect(result.isRight()).toBe(true)
    expect(result.value?.ratings).toHaveLength(3)
    expect(result.value).toEqual({
      ratings: [
        expect.objectContaining({ createdAt: rating2.createdAt }),
        expect.objectContaining({ createdAt: rating3.createdAt }),
        expect.objectContaining({ createdAt: rating1.createdAt }),
      ],
    })
  })
})
