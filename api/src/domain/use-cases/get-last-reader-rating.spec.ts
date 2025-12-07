import { makeBook } from '../../../test/factories/make-book.ts'
import { makeRating } from '../../../test/factories/make-rating.ts'
import { makeReader } from '../../../test/factories/make-reader.ts'
import { InMemoryBookCategoriesRepository } from '../../../test/repositories/in-memory-book-categories-repository.ts'
import { InMemoryBooksRepository } from '../../../test/repositories/in-memory-books-repository.ts'
import { InMemoryRatingsRepository } from '../../../test/repositories/in-memory-ratings-repository.ts'
import { InMemoryReadersRepository } from '../../../test/repositories/in-memory-readers-repository.ts'
import { UniqueEntityID } from '../../core/entities/unique-entity-id.ts'
import { GetLastReaderRatingUseCase } from './get-last-reader-rating.ts'

let inMemoryBookCategoriesRepository: InMemoryBookCategoriesRepository
let inMemoryBooksRepository: InMemoryBooksRepository
let inMemoryRatingsRepository: InMemoryRatingsRepository
let inMemoryReadersRepository: InMemoryReadersRepository

let sut: GetLastReaderRatingUseCase

describe('Get Last Reader Rating', () => {
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

    sut = new GetLastReaderRatingUseCase(inMemoryRatingsRepository)
  })

  it('should be able to get the last reader rating', async () => {
    inMemoryReadersRepository.items.push(
      makeReader({}, new UniqueEntityID('reader-1')),
    )

    const book1 = makeBook()
    const book2 = makeBook()
    const book3 = makeBook()
    inMemoryBooksRepository.items.push(book1, book2, book3)

    const rating1 = makeRating({
      bookId: book1.id,
      readerId: new UniqueEntityID('reader-1'),
      createdAt: new Date(Date.now() - 2),
    })

    const rating2 = makeRating({
      bookId: book2.id,
      readerId: new UniqueEntityID('reader-1'),
      createdAt: new Date(Date.now() - 1),
    })

    const rating3 = makeRating({
      bookId: book3.id,
      readerId: new UniqueEntityID('reader-1'),
      createdAt: new Date(),
    })

    inMemoryRatingsRepository.items.push(rating1, rating2, rating3)

    const result = await sut.execute({
      readerId: 'reader-1',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      rating: expect.objectContaining({
        ratingId: rating3.id,
        createdAt: rating3.createdAt,
      }),
    })
  })

  it('should return null when there are no ratings', async () => {
    const result = await sut.execute({
      readerId: 'reader-1',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.rating).toBeNull()
  })
})
