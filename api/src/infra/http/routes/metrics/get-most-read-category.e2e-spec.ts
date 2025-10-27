import request from 'supertest'
import { makeDrizzleBook } from '../../../../../test/factories/make-book.ts'
import { makeDrizzleBookCategory } from '../../../../../test/factories/make-book-category.ts'
import { makeDrizzleCategory } from '../../../../../test/factories/make-category.ts'
import { makeDrizzleRating } from '../../../../../test/factories/make-rating.ts'
import { makeAuthenticatedDrizzleUser } from '../../../../../test/factories/make-user.ts'
import { app } from '../../../app.ts'

describe('Get Most Read Category (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('[GET] /metrics/most-read-category', async () => {
    const { token, user } = await makeAuthenticatedDrizzleUser()

    const [book1, book2, book3] = await Promise.all([
      makeDrizzleBook({ author: 'Author 1' }),
      makeDrizzleBook({ author: 'Author 2' }),
      makeDrizzleBook({ author: 'Author 2' }),
    ])

    const [category1, category2] = await Promise.all([
      makeDrizzleCategory(),
      makeDrizzleCategory(),
    ])

    await Promise.all([
      makeDrizzleBookCategory({ bookId: book1.id, categoryId: category1.id }),
      makeDrizzleBookCategory({ bookId: book2.id, categoryId: category1.id }),
      makeDrizzleBookCategory({ bookId: book3.id, categoryId: category2.id }),
      makeDrizzleRating({ bookId: book1.id, userId: user.id }),
      makeDrizzleRating({ bookId: book2.id, userId: user.id }),
      makeDrizzleRating({ bookId: book3.id, userId: user.id }),
    ])

    const response = await request(app.server)
      .get('/metrics/most-read-category')
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({ category: category1.name })
  })
})
