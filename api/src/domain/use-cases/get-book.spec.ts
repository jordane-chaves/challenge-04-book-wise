import { makeBook } from '../../../test/factories/make-book.ts'
import { makeBookCategory } from '../../../test/factories/make-book-category.ts'
import { makeCategory } from '../../../test/factories/make-category.ts'
import { makeRating } from '../../../test/factories/make-rating.ts'
import { InMemoryBookCategoriesRepository } from '../../../test/repositories/in-memory-book-categories-repository.ts'
import { InMemoryBooksRepository } from '../../../test/repositories/in-memory-books-repository.ts'
import { InMemoryCategoriesRepository } from '../../../test/repositories/in-memory-categories-repository.ts'
import { InMemoryRatingsRepository } from '../../../test/repositories/in-memory-ratings-repository.ts'
import { InMemoryReadersRepository } from '../../../test/repositories/in-memory-readers-repository.ts'
import { UniqueEntityID } from '../../core/entities/unique-entity-id.ts'
import { GetBookUseCase } from './get-book.ts'

let inMemoryBooksRepository: InMemoryBooksRepository
let inMemoryBookCategoriesRepository: InMemoryBookCategoriesRepository
let inMemoryCategoriesRepository: InMemoryCategoriesRepository
let inMemoryRatingsRepository: InMemoryRatingsRepository
let inMemoryReadersRepository: InMemoryReadersRepository

let sut: GetBookUseCase

describe('Get Book', () => {
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

    inMemoryCategoriesRepository = new InMemoryCategoriesRepository(
      inMemoryRatingsRepository,
      inMemoryBookCategoriesRepository,
    )

    sut = new GetBookUseCase(
      inMemoryBooksRepository,
      inMemoryCategoriesRepository,
      inMemoryRatingsRepository,
    )
  })

  it('should be able to get a book details', async () => {
    inMemoryBooksRepository.items.push(
      makeBook({ title: 'Código Limpo' }, new UniqueEntityID('book-1')),
    )

    inMemoryRatingsRepository.items.push(
      makeRating({ bookId: new UniqueEntityID('book-1'), score: 5 }),
      makeRating({ bookId: new UniqueEntityID('book-1'), score: 4 }),
      makeRating({ bookId: new UniqueEntityID('book-1'), score: 3 }),
    )

    inMemoryCategoriesRepository.items.push(
      makeCategory({ name: 'Educação' }, new UniqueEntityID('category-1')),
      makeCategory({ name: 'Programação' }, new UniqueEntityID('category-2')),
    )

    inMemoryBookCategoriesRepository.items.push(
      makeBookCategory({
        bookId: new UniqueEntityID('book-1'),
        categoryId: new UniqueEntityID('category-1'),
      }),
      makeBookCategory({
        bookId: new UniqueEntityID('book-1'),
        categoryId: new UniqueEntityID('category-2'),
      }),
    )

    const result = await sut.execute({
      bookId: 'book-1',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      book: expect.objectContaining({
        title: 'Código Limpo',
        score: 4,
        ratingCount: 3,
        categories: expect.arrayContaining([
          expect.objectContaining({ name: 'Educação' }),
          expect.objectContaining({ name: 'Programação' }),
        ]),
      }),
    })
  })

  it('should return zero when no has ratings', async () => {
    inMemoryBooksRepository.items.push(
      makeBook({ title: 'Código Limpo' }, new UniqueEntityID('book-1')),
    )

    inMemoryCategoriesRepository.items.push(
      makeCategory({ name: 'Educação' }, new UniqueEntityID('category-1')),
      makeCategory({ name: 'Programação' }, new UniqueEntityID('category-2')),
    )

    inMemoryBookCategoriesRepository.items.push(
      makeBookCategory({
        bookId: new UniqueEntityID('book-1'),
        categoryId: new UniqueEntityID('category-1'),
      }),
      makeBookCategory({
        bookId: new UniqueEntityID('book-1'),
        categoryId: new UniqueEntityID('category-2'),
      }),
    )

    const result = await sut.execute({
      bookId: 'book-1',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      book: expect.objectContaining({
        title: 'Código Limpo',
        score: 0,
        ratingCount: 0,
        categories: expect.arrayContaining([
          expect.objectContaining({ name: 'Educação' }),
          expect.objectContaining({ name: 'Programação' }),
        ]),
      }),
    })
  })
})
