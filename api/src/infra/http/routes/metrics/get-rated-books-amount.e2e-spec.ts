import request from 'supertest'
import { makeDrizzleBook } from '../../../../../test/factories/make-book.ts'
import { makeDrizzleRating } from '../../../../../test/factories/make-rating.ts'
import { makeAuthenticatedDrizzleUser } from '../../../../../test/factories/make-user.ts'
import { app } from '../../../app.ts'

describe('Get Rated Books Amount (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('[GET] /metrics/rated-books-amount', async () => {
    const { token, user } = await makeAuthenticatedDrizzleUser()

    const [book1, book2, book3] = await Promise.all([
      makeDrizzleBook(),
      makeDrizzleBook(),
      makeDrizzleBook(),
    ])

    await Promise.all([
      makeDrizzleRating({ bookId: book1.id, userId: user.id }),
      makeDrizzleRating({ bookId: book2.id, userId: user.id }),
      makeDrizzleRating({ bookId: book3.id, userId: user.id }),
    ])

    const response = await request(app.server)
      .get('/metrics/rated-books-amount')
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({ amount: 3 })
  })
})
