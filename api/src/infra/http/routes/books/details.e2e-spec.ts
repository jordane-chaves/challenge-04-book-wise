import request from 'supertest'

import { makeDrizzleBook } from '../../../../../test/factories/make-book.ts'
import { makeDrizzleBookCategory } from '../../../../../test/factories/make-book-category.ts'
import { makeDrizzleCategory } from '../../../../../test/factories/make-category.ts'
import { makeDrizzleRating } from '../../../../../test/factories/make-rating.ts'
import { makeDrizzleUser } from '../../../../../test/factories/make-reader.ts'
import { app } from '../../../app.ts'

describe('Get Book Details (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('[GET] /books/:bookId', async () => {
    const book = await makeDrizzleBook()
    const [category1, category2] = await Promise.all([
      makeDrizzleCategory(),
      makeDrizzleCategory(),
    ])

    await Promise.all([
      makeDrizzleBookCategory({ bookId: book.id, categoryId: category1.id }),
      makeDrizzleBookCategory({ bookId: book.id, categoryId: category2.id }),
    ])

    const [user1, user2] = await Promise.all([
      makeDrizzleUser(),
      makeDrizzleUser(),
    ])

    await Promise.all([
      makeDrizzleRating({ bookId: book.id, readerId: user1.id, score: 3 }),
      makeDrizzleRating({ bookId: book.id, readerId: user2.id, score: 5 }),
    ])

    const response = await request(app.server).get(`/books/${book.id}`)

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      book: expect.objectContaining({
        name: book.title,
        rating: 4,
        ratingCount: 2,
        categories: expect.arrayContaining([category1.name, category2.name]),
      }),
    })
  })
})
