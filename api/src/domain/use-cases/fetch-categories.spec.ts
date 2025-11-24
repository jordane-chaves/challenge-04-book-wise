import { makeCategory } from '../../../test/factories/make-category.ts'
import { InMemoryCategoriesRepository } from '../../../test/repositories/in-memory-categories-repository.ts'
import { FetchCategoriesUseCase } from './fetch-categories.ts'

let inMemoryCategoriesRepository: InMemoryCategoriesRepository

let sut: FetchCategoriesUseCase

describe('Fetch Categories', () => {
  beforeEach(() => {
    inMemoryCategoriesRepository = new InMemoryCategoriesRepository()

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
