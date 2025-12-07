import { makeCategory } from '../../../test/factories/make-category.ts'
import { InMemoryBookCategoriesRepository } from '../../../test/repositories/in-memory-book-categories-repository.ts'
import { InMemoryBooksRepository } from '../../../test/repositories/in-memory-books-repository.ts'
import { InMemoryCategoriesRepository } from '../../../test/repositories/in-memory-categories-repository.ts'
import { InMemoryRatingsRepository } from '../../../test/repositories/in-memory-ratings-repository.ts'
import { InMemoryReadersRepository } from '../../../test/repositories/in-memory-readers-repository.ts'
import { FetchCategoriesUseCase } from './fetch-categories.ts'

let inMemoryCategoriesRepository: InMemoryCategoriesRepository
let inMemoryBookCategoriesRepository: InMemoryBookCategoriesRepository
let inMemoryBooksRepository: InMemoryBooksRepository
let inMemoryRatingsRepository: InMemoryRatingsRepository
let inMemoryReadersRepository: InMemoryReadersRepository

let sut: FetchCategoriesUseCase

describe('Fetch Categories', () => {
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

    sut = new FetchCategoriesUseCase(inMemoryCategoriesRepository)
  })

  it('should be able to list all categories', async () => {
    inMemoryCategoriesRepository.items.push(
      makeCategory({ name: 'Programação' }),
      makeCategory({ name: 'Ficção' }),
      makeCategory({ name: 'Educação' }),
    )

    const result = await sut.execute()

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      categories: [
        expect.objectContaining({ name: 'Programação' }),
        expect.objectContaining({ name: 'Ficção' }),
        expect.objectContaining({ name: 'Educação' }),
      ],
    })
  })
})
