import { makeBook } from '../../../test/factories/make-book.ts'
import { makeBookCategory } from '../../../test/factories/make-book-category.ts'
import { makeCategory } from '../../../test/factories/make-category.ts'
import { makeRating } from '../../../test/factories/make-rating.ts'
import { InMemoryBookCategoriesRepository } from '../../../test/repositories/in-memory-book-categories-repository.ts'
import { InMemoryBooksRepository } from '../../../test/repositories/in-memory-books-repository.ts'
import { InMemoryCategoriesRepository } from '../../../test/repositories/in-memory-categories-repository.ts'
import { InMemoryRatingsRepository } from '../../../test/repositories/in-memory-ratings-repository.ts'
import { UniqueEntityID } from '../../core/entities/unique-entity-id.ts'
import { GetMostReadCategoryUseCase } from './get-most-read-category.ts'

let inMemoryCategoriesRepository: InMemoryCategoriesRepository
let inMemoryBookCategoriesRepository: InMemoryBookCategoriesRepository
let inMemoryBooksRepository: InMemoryBooksRepository
let inMemoryRatingsRepository: InMemoryRatingsRepository

let sut: GetMostReadCategoryUseCase

describe('Get Most Read Category', () => {
  beforeEach(() => {
    inMemoryBookCategoriesRepository = new InMemoryBookCategoriesRepository()
    inMemoryBooksRepository = new InMemoryBooksRepository(
      inMemoryBookCategoriesRepository,
    )

    inMemoryRatingsRepository = new InMemoryRatingsRepository(
      inMemoryBooksRepository,
    )

    inMemoryCategoriesRepository = new InMemoryCategoriesRepository(
      inMemoryRatingsRepository,
      inMemoryBookCategoriesRepository,
    )

    sut = new GetMostReadCategoryUseCase(inMemoryCategoriesRepository)
  })

  it('should be able to get the most read category', async () => {
    const category1 = makeCategory()
    const category2 = makeCategory()
    inMemoryCategoriesRepository.items.push(category1, category2)

    const book1 = makeBook()
    const book2 = makeBook()
    inMemoryBooksRepository.items.push(book1, book2)

    inMemoryBookCategoriesRepository.items.push(
      makeBookCategory({
        bookId: book1.id,
        categoryId: category1.id,
      }),
      makeBookCategory({
        bookId: book1.id,
        categoryId: category2.id,
      }),
      makeBookCategory({
        bookId: book2.id,
        categoryId: category2.id,
      }),
    )

    inMemoryRatingsRepository.items.push(
      makeRating({
        bookId: book1.id,
        readerId: new UniqueEntityID('reader-1'),
      }),
      makeRating({
        bookId: book2.id,
        readerId: new UniqueEntityID('reader-1'),
      }),
    )

    const result = await sut.execute({
      readerId: 'reader-1',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      category: category2,
    })
  })

  it('should return null when no has ratings', async () => {
    const result = await sut.execute({
      readerId: 'reader-1',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      category: null,
    })
  })
})
