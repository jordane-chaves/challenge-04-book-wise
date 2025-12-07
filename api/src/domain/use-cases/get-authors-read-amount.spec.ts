import { makeBook } from '../../../test/factories/make-book.ts'
import { makeRating } from '../../../test/factories/make-rating.ts'
import { InMemoryBookCategoriesRepository } from '../../../test/repositories/in-memory-book-categories-repository.ts'
import { InMemoryBooksRepository } from '../../../test/repositories/in-memory-books-repository.ts'
import { InMemoryRatingsRepository } from '../../../test/repositories/in-memory-ratings-repository.ts'
import { InMemoryReadersRepository } from '../../../test/repositories/in-memory-readers-repository.ts'
import { UniqueEntityID } from '../../core/entities/unique-entity-id.ts'
import { GetAuthorsReadAmountUseCase } from './get-authors-read-amount.ts'

let inMemoryBookCategoriesRepository: InMemoryBookCategoriesRepository
let inMemoryBooksRepository: InMemoryBooksRepository
let inMemoryRatingsRepository: InMemoryRatingsRepository
let inMemoryReadersRepository: InMemoryReadersRepository

let sut: GetAuthorsReadAmountUseCase

describe('Get Authors Read Amount', () => {
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

    sut = new GetAuthorsReadAmountUseCase(
      inMemoryRatingsRepository,
      inMemoryBooksRepository,
    )
  })

  it('should be able to get authors read amount', async () => {
    const book1 = makeBook({ author: 'Author 01' })
    const book2 = makeBook({ author: 'Author 02' })
    const book3 = makeBook({ author: 'Author 03' })

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
      amount: 3,
    })
  })

  it('should be able to get unique authors read amount', async () => {
    const book1 = makeBook({ author: 'Author 01' })
    const book2 = makeBook({ author: 'Author 02' })
    const book3 = makeBook({ author: 'Author 01' })

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
      amount: 2,
    })
  })
})
