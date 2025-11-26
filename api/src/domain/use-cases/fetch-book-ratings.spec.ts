import { makeRating } from '../../../test/factories/make-rating.ts'
import { InMemoryBookCategoriesRepository } from '../../../test/repositories/in-memory-book-categories-repository.ts'
import { InMemoryBooksRepository } from '../../../test/repositories/in-memory-books-repository.ts'
import { InMemoryRatingsRepository } from '../../../test/repositories/in-memory-ratings-repository.ts'
import { UniqueEntityID } from '../../core/entities/unique-entity-id.ts'
import { FetchBookRatingsUseCase } from './fetch-book-ratings.ts'

let inMemoryBookCategoriesRepository: InMemoryBookCategoriesRepository
let inMemoryBooksRepository: InMemoryBooksRepository
let inMemoryRatingsRepository: InMemoryRatingsRepository

let sut: FetchBookRatingsUseCase

describe('Fetch Book Ratings', () => {
  beforeEach(() => {
    inMemoryBookCategoriesRepository = new InMemoryBookCategoriesRepository()
    inMemoryBooksRepository = new InMemoryBooksRepository(
      inMemoryBookCategoriesRepository,
    )

    inMemoryRatingsRepository = new InMemoryRatingsRepository(
      inMemoryBooksRepository,
    )

    sut = new FetchBookRatingsUseCase(inMemoryRatingsRepository)
  })

  it('should be able to fetch all book ratings', async () => {
    inMemoryRatingsRepository.items.push(
      makeRating({ bookId: new UniqueEntityID('book-1') }),
      makeRating({ bookId: new UniqueEntityID('book-1') }),
      makeRating({ bookId: new UniqueEntityID('book-1') }),
    )

    const result = await sut.execute({
      bookId: 'book-1',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.ratings).toHaveLength(3)
    expect(result.value).toEqual({
      ratings: [
        expect.objectContaining({ bookId: new UniqueEntityID('book-1') }),
        expect.objectContaining({ bookId: new UniqueEntityID('book-1') }),
        expect.objectContaining({ bookId: new UniqueEntityID('book-1') }),
      ],
    })
  })
})
