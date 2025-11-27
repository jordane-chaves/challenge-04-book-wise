import { makeBook } from '../../../test/factories/make-book.ts'
import { makeRating } from '../../../test/factories/make-rating.ts'
import { InMemoryBookCategoriesRepository } from '../../../test/repositories/in-memory-book-categories-repository.ts'
import { InMemoryBooksRepository } from '../../../test/repositories/in-memory-books-repository.ts'
import { InMemoryRatingsRepository } from '../../../test/repositories/in-memory-ratings-repository.ts'
import { UniqueEntityID } from '../../core/entities/unique-entity-id.ts'
import { GetPagesReadAmountUseCase } from './get-pages-read-amount.ts'

let inMemoryBookCategoriesRepository: InMemoryBookCategoriesRepository
let inMemoryBooksRepository: InMemoryBooksRepository
let inMemoryRatingsRepository: InMemoryRatingsRepository

let sut: GetPagesReadAmountUseCase

describe('Get Pages Read Amount', () => {
  beforeEach(() => {
    inMemoryBookCategoriesRepository = new InMemoryBookCategoriesRepository()
    inMemoryBooksRepository = new InMemoryBooksRepository(
      inMemoryBookCategoriesRepository,
    )

    inMemoryRatingsRepository = new InMemoryRatingsRepository(
      inMemoryBooksRepository,
    )

    sut = new GetPagesReadAmountUseCase(
      inMemoryRatingsRepository,
      inMemoryBooksRepository,
    )
  })

  it('should be able to get pages read amount', async () => {
    const book1 = makeBook({ totalPages: 500 })
    const book2 = makeBook({ totalPages: 1000 })
    const book3 = makeBook({ totalPages: 500 })

    inMemoryBooksRepository.items.push(book1, book2, book3)

    inMemoryRatingsRepository.items.push(
      makeRating({
        bookId: book1.id,
        readerId: new UniqueEntityID('reader-1'),
      }),
      makeRating({
        bookId: book2.id,
        readerId: new UniqueEntityID('reader-1'),
      }),
      makeRating({
        bookId: book3.id,
        readerId: new UniqueEntityID('reader-1'),
      }),
    )

    const result = await sut.execute({
      readerId: 'reader-1',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      amount: 2000,
    })
  })
})
