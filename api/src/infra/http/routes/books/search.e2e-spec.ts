import request from 'supertest'

import { makeDrizzleBook } from '../../../../../test/factories/make-book.ts'
import { makeDrizzleBookCategory } from '../../../../../test/factories/make-book-category.ts'
import { makeDrizzleCategory } from '../../../../../test/factories/make-category.ts'
import { app } from '../../../app.ts'

describe('Search Books (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('[GET] /books - search by title', async () => {
    await Promise.all([
      makeDrizzleBook({ title: 'Código Limpo' }),
      makeDrizzleBook({ title: 'Arquitetura Limpa' }),
      makeDrizzleBook({ title: 'O Hobbit' }),
    ])

    const response = await request(app.server)
      .get('/books')
      .query({ query: 'Arquitetura Limpa' })

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      books: [expect.objectContaining({ name: 'Arquitetura Limpa' })],
    })
  })

  test('[GET] /books - search by author', async () => {
    await Promise.all([
      makeDrizzleBook({ author: 'Robert C. Martin' }),
      makeDrizzleBook({ author: 'Robert C. Martin' }),
      makeDrizzleBook({ author: 'J.R.R. Tolkien' }),
    ])

    const response = await request(app.server)
      .get('/books')
      .query({ query: 'Robert C. Martin' })

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      books: [
        expect.objectContaining({ author: 'Robert C. Martin' }),
        expect.objectContaining({ author: 'Robert C. Martin' }),
      ],
    })
  })

  test('[GET] /books - search by category', async () => {
    const [book1, book2, book3] = await Promise.all([
      makeDrizzleBook(),
      makeDrizzleBook(),
      makeDrizzleBook(),
    ])

    const [category1, category2] = await Promise.all([
      makeDrizzleCategory(),
      makeDrizzleCategory(),
    ])

    await Promise.all([
      makeDrizzleBookCategory({ bookId: book1.id, categoryId: category1.id }),
      makeDrizzleBookCategory({ bookId: book2.id, categoryId: category2.id }),
      makeDrizzleBookCategory({ bookId: book3.id, categoryId: category1.id }),
    ])

    const response = await request(app.server)
      .get('/books')
      .query({ categoryId: category1.id.toString() })

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      books: [
        expect.objectContaining({ id: book1.id.toString() }),
        expect.objectContaining({ id: book3.id.toString() }),
      ],
    })
  })
})
