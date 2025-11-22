import { makeBook } from '../../../test/factories/make-book.ts'
import { makeBookCategory } from '../../../test/factories/make-book-category.ts'
import { InMemoryBookCategoriesRepository } from '../../../test/repositories/in-memory-book-categories-repository.ts'
import { InMemoryBooksRepository } from '../../../test/repositories/in-memory-books-repository.ts'
import { UniqueEntityID } from '../../core/entities/unique-entity-id.ts'
import { SearchBooksUseCase } from './search-books.ts'

let inMemoryBooksRepository: InMemoryBooksRepository
let inMemoryBookCategoriesRepository: InMemoryBookCategoriesRepository

let sut: SearchBooksUseCase

describe('Search Books', () => {
  beforeEach(() => {
    inMemoryBookCategoriesRepository = new InMemoryBookCategoriesRepository()
    inMemoryBooksRepository = new InMemoryBooksRepository(
      inMemoryBookCategoriesRepository,
    )

    sut = new SearchBooksUseCase(inMemoryBooksRepository)
  })

  it('should list all books when there are no search parameters', async () => {
    inMemoryBooksRepository.items.push(
      makeBook({ title: 'Código Limpo' }),
      makeBook({ title: 'Arquitetura Limpa' }),
      makeBook({ title: 'O Hobbit' }),
    )

    const result = await sut.execute({})

    expect(result.isRight()).toBe(true)
    expect(result.value?.books).toHaveLength(3)
    expect(result.value).toEqual({
      books: [
        expect.objectContaining({ title: 'Código Limpo' }),
        expect.objectContaining({ title: 'Arquitetura Limpa' }),
        expect.objectContaining({ title: 'O Hobbit' }),
      ],
    })
  })

  it('should be able to search books by title', async () => {
    inMemoryBooksRepository.items.push(
      makeBook({ title: 'Código Limpo' }),
      makeBook({ title: 'Arquitetura Limpa' }),
      makeBook({ title: 'O Hobbit' }),
    )

    const result = await sut.execute({
      query: 'Código Limpo',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.books).toHaveLength(1)
    expect(result.value).toEqual({
      books: [expect.objectContaining({ title: 'Código Limpo' })],
    })
  })

  it('should be able to search books by author', async () => {
    inMemoryBooksRepository.items.push(
      makeBook({ author: 'Robert C. Martin' }),
      makeBook({ author: 'Robert C. Martin' }),
      makeBook({ author: 'J.R.R. Tolkien' }),
    )

    const result = await sut.execute({
      query: 'Robert C. Martin',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.books).toHaveLength(2)
    expect(result.value).toEqual({
      books: [
        expect.objectContaining({ author: 'Robert C. Martin' }),
        expect.objectContaining({ author: 'Robert C. Martin' }),
      ],
    })
  })

  it('should be able to search books by category id', async () => {
    const book1 = makeBook()
    const book2 = makeBook()
    const book3 = makeBook()

    inMemoryBooksRepository.items.push(book1, book2, book3)

    inMemoryBookCategoriesRepository.items.push(
      makeBookCategory({
        bookId: book1.id,
        categoryId: new UniqueEntityID('category-1'),
      }),
      makeBookCategory({
        bookId: book1.id,
        categoryId: new UniqueEntityID('category-2'),
      }),
      makeBookCategory({
        bookId: book2.id,
        categoryId: new UniqueEntityID('category-1'),
      }),
      makeBookCategory({
        bookId: book3.id,
        categoryId: new UniqueEntityID('category-2'),
      }),
    )

    const result = await sut.execute({
      categoryId: 'category-1',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.books).toHaveLength(2)
    expect(result.value).toEqual({
      books: [
        expect.objectContaining({ id: book1.id }),
        expect.objectContaining({ id: book2.id }),
      ],
    })
  })
})
