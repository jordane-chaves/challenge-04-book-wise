import { makeBook } from '../../../test/factories/make-book.ts'
import { InMemoryBookCategoriesRepository } from '../../../test/repositories/in-memory-book-categories-repository.ts'
import { InMemoryBooksRepository } from '../../../test/repositories/in-memory-books-repository.ts'
import { UniqueEntityID } from '../../core/entities/unique-entity-id.ts'
import { GetBookUseCase } from './get-book.ts'

let inMemoryBooksRepository: InMemoryBooksRepository
let inMemoryBookCategoriesRepository: InMemoryBookCategoriesRepository

let sut: GetBookUseCase

describe('Get Book', () => {
  beforeEach(() => {
    inMemoryBookCategoriesRepository = new InMemoryBookCategoriesRepository()
    inMemoryBooksRepository = new InMemoryBooksRepository(
      inMemoryBookCategoriesRepository,
    )

    sut = new GetBookUseCase(inMemoryBooksRepository)
  })

  it('should be able to get a book', async () => {
    inMemoryBooksRepository.items.push(
      makeBook({ title: 'Código Limpo' }, new UniqueEntityID('book-1')),
    )

    const result = await sut.execute({
      bookId: 'book-1',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      book: expect.objectContaining({
        title: 'Código Limpo',
      }),
    })
  })
})
