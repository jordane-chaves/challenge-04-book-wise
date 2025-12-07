import { makeBook } from '../../../test/factories/make-book.ts'
import { makeRating } from '../../../test/factories/make-rating.ts'
import { makeReader } from '../../../test/factories/make-reader.ts'
import { InMemoryBookCategoriesRepository } from '../../../test/repositories/in-memory-book-categories-repository.ts'
import { InMemoryBooksRepository } from '../../../test/repositories/in-memory-books-repository.ts'
import { InMemoryRatingsRepository } from '../../../test/repositories/in-memory-ratings-repository.ts'
import { InMemoryReadersRepository } from '../../../test/repositories/in-memory-readers-repository.ts'
import { UniqueEntityID } from '../../core/entities/unique-entity-id.ts'
import { FetchBookRatingsUseCase } from './fetch-book-ratings.ts'

let inMemoryBookCategoriesRepository: InMemoryBookCategoriesRepository
let inMemoryBooksRepository: InMemoryBooksRepository
let inMemoryRatingsRepository: InMemoryRatingsRepository
let inMemoryReadersRepository: InMemoryReadersRepository

let sut: FetchBookRatingsUseCase

describe('Fetch Book Ratings', () => {
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

    sut = new FetchBookRatingsUseCase(inMemoryRatingsRepository)
  })

  it('should be able to fetch all recent book ratings', async () => {
    const reader1 = makeReader()
    const reader2 = makeReader()
    const reader3 = makeReader()
    inMemoryReadersRepository.items.push(reader1, reader2, reader3)

    inMemoryBooksRepository.items.push(
      makeBook({}, new UniqueEntityID('book-1')),
    )

    inMemoryRatingsRepository.items.push(
      makeRating({
        bookId: new UniqueEntityID('book-1'),
        readerId: reader1.id,
        createdAt: new Date(2025, 11, 1),
      }),
      makeRating({
        bookId: new UniqueEntityID('book-1'),
        readerId: reader2.id,
        createdAt: new Date(2025, 11, 3),
      }),
      makeRating({
        bookId: new UniqueEntityID('book-1'),
        readerId: reader3.id,
        createdAt: new Date(2025, 11, 2),
      }),
    )

    const result = await sut.execute({
      bookId: 'book-1',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.ratings).toHaveLength(3)
    expect(result.value).toEqual({
      ratings: [
        expect.objectContaining({
          bookId: new UniqueEntityID('book-1'),
          reader: reader2.name,
          createdAt: new Date(2025, 11, 3),
        }),
        expect.objectContaining({
          bookId: new UniqueEntityID('book-1'),
          reader: reader3.name,
          createdAt: new Date(2025, 11, 2),
        }),
        expect.objectContaining({
          bookId: new UniqueEntityID('book-1'),
          reader: reader1.name,
          createdAt: new Date(2025, 11, 1),
        }),
      ],
    })
  })
})
