import { makeBook } from '../../../test/factories/make-book.ts'
import { makeRating } from '../../../test/factories/make-rating.ts'
import { InMemoryBookCategoriesRepository } from '../../../test/repositories/in-memory-book-categories-repository.ts'
import { InMemoryBooksRepository } from '../../../test/repositories/in-memory-books-repository.ts'
import { InMemoryRatingsRepository } from '../../../test/repositories/in-memory-ratings-repository.ts'
import { UniqueEntityID } from '../../core/entities/unique-entity-id.ts'
import { ConflictError } from '../../core/errors/errors/conflict-error.ts'
import { ResourceNotFoundError } from '../../core/errors/errors/resource-not-found-error.ts'
import { RateBookUseCase } from './rate-book.ts'

let inMemoryBooksRepository: InMemoryBooksRepository
let inMemoryBookCategoriesRepository: InMemoryBookCategoriesRepository
let inMemoryRatingsRepository: InMemoryRatingsRepository

let sut: RateBookUseCase

describe('Rate Book', () => {
  beforeEach(() => {
    inMemoryBookCategoriesRepository = new InMemoryBookCategoriesRepository()
    inMemoryBooksRepository = new InMemoryBooksRepository(
      inMemoryBookCategoriesRepository,
    )

    inMemoryRatingsRepository = new InMemoryRatingsRepository()

    sut = new RateBookUseCase(
      inMemoryRatingsRepository,
      inMemoryBooksRepository,
    )
  })

  it('should be able to rate the book', async () => {
    inMemoryBooksRepository.items.push(
      makeBook({}, new UniqueEntityID('book-1')),
    )

    const result = await sut.execute({
      bookId: 'book-1',
      readerId: 'reader-1',
      description: 'Some rating description',
      score: 5,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      rating: inMemoryRatingsRepository.items[0],
    })
  })

  it('should not be able to rate the same book twice', async () => {
    inMemoryBooksRepository.items.push(
      makeBook({}, new UniqueEntityID('book-1')),
    )

    inMemoryRatingsRepository.items.push(
      makeRating({
        bookId: new UniqueEntityID('book-1'),
        readerId: new UniqueEntityID('reader-1'),
      }),
    )

    const result = await sut.execute({
      bookId: 'book-1',
      readerId: 'reader-1',
      description: 'Some rating description',
      score: 5,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ConflictError)
  })

  it('should not be able to rate a non existent book', async () => {
    const result = await sut.execute({
      bookId: 'book-1',
      readerId: 'reader-1',
      description: 'Some rating description',
      score: 5,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
