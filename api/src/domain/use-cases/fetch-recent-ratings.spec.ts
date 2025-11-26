import { makeRating } from '../../../test/factories/make-rating.ts'
import { InMemoryBookCategoriesRepository } from '../../../test/repositories/in-memory-book-categories-repository.ts'
import { InMemoryBooksRepository } from '../../../test/repositories/in-memory-books-repository.ts'
import { InMemoryRatingsRepository } from '../../../test/repositories/in-memory-ratings-repository.ts'
import { FetchRecentRatingsUseCase } from './fetch-recent-ratings.ts'

let inMemoryBookCategoriesRepository: InMemoryBookCategoriesRepository
let inMemoryBooksRepository: InMemoryBooksRepository
let inMemoryRatingsRepository: InMemoryRatingsRepository

let sut: FetchRecentRatingsUseCase

describe('Fetch Recent Ratings', () => {
  beforeEach(() => {
    inMemoryBookCategoriesRepository = new InMemoryBookCategoriesRepository()
    inMemoryBooksRepository = new InMemoryBooksRepository(
      inMemoryBookCategoriesRepository,
    )

    inMemoryRatingsRepository = new InMemoryRatingsRepository(
      inMemoryBooksRepository,
    )

    sut = new FetchRecentRatingsUseCase(inMemoryRatingsRepository)
  })

  it('should be able to fetch recent ratings', async () => {
    const rating1 = makeRating({ createdAt: new Date(Date.now() - 2) })
    const rating2 = makeRating({ createdAt: new Date() })
    const rating3 = makeRating({ createdAt: new Date(Date.now() - 1) })

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
