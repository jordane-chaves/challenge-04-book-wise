import { makeRating } from '../../../test/factories/make-rating.ts'
import { InMemoryBookCategoriesRepository } from '../../../test/repositories/in-memory-book-categories-repository.ts'
import { InMemoryBooksRepository } from '../../../test/repositories/in-memory-books-repository.ts'
import { InMemoryRatingsRepository } from '../../../test/repositories/in-memory-ratings-repository.ts'
import { UniqueEntityID } from '../../core/entities/unique-entity-id.ts'
import { GetReadBooksUseCase } from './get-read-books.ts'

let inMemoryBookCategoriesRepository: InMemoryBookCategoriesRepository
let inMemoryBooksRepository: InMemoryBooksRepository
let inMemoryRatingsRepository: InMemoryRatingsRepository

let sut: GetReadBooksUseCase

describe('Get Read Books', () => {
  beforeEach(() => {
    inMemoryBookCategoriesRepository = new InMemoryBookCategoriesRepository()
    inMemoryBooksRepository = new InMemoryBooksRepository(
      inMemoryBookCategoriesRepository,
    )

    inMemoryRatingsRepository = new InMemoryRatingsRepository(
      inMemoryBooksRepository,
    )

    sut = new GetReadBooksUseCase(inMemoryRatingsRepository)
  })

  it('should be able to get the reader books', async () => {
    const rating1 = makeRating({ readerId: new UniqueEntityID('reader-1') })
    const rating2 = makeRating({ readerId: new UniqueEntityID('reader-1') })
    const rating3 = makeRating({ readerId: new UniqueEntityID('reader-1') })

    inMemoryRatingsRepository.items.push(rating1, rating2, rating3)

    const result = await sut.execute({
      readerId: 'reader-1',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.booksIds).toHaveLength(3)
    expect(result.value).toEqual({
      booksIds: [
        rating1.bookId.toString(),
        rating2.bookId.toString(),
        rating3.bookId.toString(),
      ],
    })
  })

  it('should not be able to fetch another reader ratings', async () => {
    const rating1 = makeRating({ readerId: new UniqueEntityID('reader-1') })
    const rating2 = makeRating({ readerId: new UniqueEntityID('reader-1') })
    const rating3 = makeRating({ readerId: new UniqueEntityID('reader-1') })

    inMemoryRatingsRepository.items.push(rating1, rating2, rating3)

    const result = await sut.execute({
      readerId: 'reader-2',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.booksIds).toHaveLength(0)
    expect(result.value).toEqual({
      booksIds: [],
    })
  })
})
