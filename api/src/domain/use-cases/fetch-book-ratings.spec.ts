import { makeRating } from '../../../test/factories/make-rating.ts'
import { InMemoryRatingsRepository } from '../../../test/repositories/in-memory-ratings-repository.ts'
import { UniqueEntityID } from '../../core/entities/unique-entity-id.ts'
import { FetchBookRatingsUseCase } from './fetch-book-ratings.ts'

let inMemoryRatingsRepository: InMemoryRatingsRepository

let sut: FetchBookRatingsUseCase

describe('Fetch Book Ratings', () => {
  beforeEach(() => {
    inMemoryRatingsRepository = new InMemoryRatingsRepository()

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
