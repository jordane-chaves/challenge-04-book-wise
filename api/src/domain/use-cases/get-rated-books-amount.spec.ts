import { makeRating } from '../../../test/factories/make-rating.ts'
import { InMemoryBookCategoriesRepository } from '../../../test/repositories/in-memory-book-categories-repository.ts'
import { InMemoryBooksRepository } from '../../../test/repositories/in-memory-books-repository.ts'
import { InMemoryRatingsRepository } from '../../../test/repositories/in-memory-ratings-repository.ts'
import { UniqueEntityID } from '../../core/entities/unique-entity-id.ts'
import { GetRatedBooksAmountUseCase } from './get-rated-books-amount.ts'

let inMemoryBookCategoriesRepository: InMemoryBookCategoriesRepository
let inMemoryBooksRepository: InMemoryBooksRepository
let inMemoryRatingsRepository: InMemoryRatingsRepository

let sut: GetRatedBooksAmountUseCase

describe('Get Rated Books Amount', () => {
  beforeEach(() => {
    inMemoryBookCategoriesRepository = new InMemoryBookCategoriesRepository()
    inMemoryBooksRepository = new InMemoryBooksRepository(
      inMemoryBookCategoriesRepository,
    )

    inMemoryRatingsRepository = new InMemoryRatingsRepository(
      inMemoryBooksRepository,
    )

    sut = new GetRatedBooksAmountUseCase(inMemoryRatingsRepository)
  })

  it('should be able to get rated books amount', async () => {
    inMemoryRatingsRepository.items.push(
      makeRating({ readerId: new UniqueEntityID('reader-1') }),
      makeRating({ readerId: new UniqueEntityID('reader-1') }),
      makeRating({ readerId: new UniqueEntityID('reader-1') }),
    )

    const result = await sut.execute({
      readerId: 'reader-1',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      amount: 3,
    })
  })
})
