import { makeBook } from '../../../test/factories/make-book.ts'
import { makeRating } from '../../../test/factories/make-rating.ts'
import { InMemoryBookCategoriesRepository } from '../../../test/repositories/in-memory-book-categories-repository.ts'
import { InMemoryBooksRepository } from '../../../test/repositories/in-memory-books-repository.ts'
import { InMemoryRatingsRepository } from '../../../test/repositories/in-memory-ratings-repository.ts'
import { UniqueEntityID } from '../../core/entities/unique-entity-id.ts'
import { SearchReaderRatingsUseCase } from './search-reader-ratings.ts'

let inMemoryBookCategoriesRepository: InMemoryBookCategoriesRepository
let inMemoryBooksRepository: InMemoryBooksRepository
let inMemoryRatingsRepository: InMemoryRatingsRepository

let sut: SearchReaderRatingsUseCase

describe('Search Reader Ratings', () => {
  beforeEach(() => {
    inMemoryBookCategoriesRepository = new InMemoryBookCategoriesRepository()
    inMemoryBooksRepository = new InMemoryBooksRepository(
      inMemoryBookCategoriesRepository,
    )

    inMemoryRatingsRepository = new InMemoryRatingsRepository(
      inMemoryBooksRepository,
    )

    sut = new SearchReaderRatingsUseCase(inMemoryRatingsRepository)
  })

  it('should be able to list all reader ratings', async () => {
    const rating1 = makeRating({ readerId: new UniqueEntityID('reader-1') })
    const rating2 = makeRating({ readerId: new UniqueEntityID('reader-1') })
    const rating3 = makeRating({ readerId: new UniqueEntityID('reader-1') })

    inMemoryRatingsRepository.items.push(rating1, rating2, rating3)

    const result = await sut.execute({
      readerId: 'reader-1',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.ratings).toHaveLength(3)
    expect(result.value).toEqual({
      ratings: [
        expect.objectContaining({ readerId: new UniqueEntityID('reader-1') }),
        expect.objectContaining({ readerId: new UniqueEntityID('reader-1') }),
        expect.objectContaining({ readerId: new UniqueEntityID('reader-1') }),
      ],
    })
  })

  it('should be able to search for reader ratings', async () => {
    const book1 = makeBook({ title: 'Código Limpo' })
    const book2 = makeBook({ title: 'Arquitetura Limpa' })
    const book3 = makeBook({ title: 'O Hobbit' })

    inMemoryBooksRepository.items.push(book1, book2, book3)

    const rating1 = makeRating({
      bookId: book1.id,
      readerId: new UniqueEntityID('reader-1'),
    })

    const rating2 = makeRating({
      bookId: book2.id,
      readerId: new UniqueEntityID('reader-1'),
    })

    const rating3 = makeRating({
      bookId: book3.id,
      readerId: new UniqueEntityID('reader-1'),
    })

    inMemoryRatingsRepository.items.push(rating1, rating2, rating3)

    const result = await sut.execute({
      readerId: 'reader-1',
      query: 'Código Limpo',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.ratings).toHaveLength(1)
    expect(result.value).toEqual({
      ratings: [expect.objectContaining({ id: rating1.id })],
    })
  })

  it('should not be able to list another reader ratings', async () => {
    const rating1 = makeRating({ readerId: new UniqueEntityID('reader-1') })
    const rating2 = makeRating({ readerId: new UniqueEntityID('reader-1') })
    const rating3 = makeRating({ readerId: new UniqueEntityID('reader-1') })

    inMemoryRatingsRepository.items.push(rating1, rating2, rating3)

    const result = await sut.execute({
      readerId: 'reader-2',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.ratings).toHaveLength(0)
    expect(result.value).toEqual({
      ratings: [],
    })
  })
})
