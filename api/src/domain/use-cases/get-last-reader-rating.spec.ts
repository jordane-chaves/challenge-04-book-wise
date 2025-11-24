import { makeRating } from '../../../test/factories/make-rating.ts'
import { InMemoryRatingsRepository } from '../../../test/repositories/in-memory-ratings-repository.ts'
import { UniqueEntityID } from '../../core/entities/unique-entity-id.ts'
import { GetLastReaderRatingUseCase } from './get-last-reader-rating.ts'

let inMemoryRatingsRepository: InMemoryRatingsRepository

let sut: GetLastReaderRatingUseCase

describe('Get Last Reader Rating', () => {
  beforeEach(() => {
    inMemoryRatingsRepository = new InMemoryRatingsRepository()

    sut = new GetLastReaderRatingUseCase(inMemoryRatingsRepository)
  })

  it('should be able to get the last reader rating', async () => {
    const rating1 = makeRating({
      readerId: new UniqueEntityID('reader-1'),
      createdAt: new Date(Date.now() - 2),
    })

    const rating2 = makeRating({
      readerId: new UniqueEntityID('reader-1'),
      createdAt: new Date(Date.now() - 1),
    })

    const rating3 = makeRating({
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
        id: rating3.id,
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
