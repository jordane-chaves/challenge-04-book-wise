import MockDate from 'mockdate'
import request from 'supertest'
import { makeDrizzleBook } from '../../../../../test/factories/make-book.ts'
import { makeDrizzleRating } from '../../../../../test/factories/make-rating.ts'
import { makeAuthenticatedDrizzleUser } from '../../../../../test/factories/make-reader.ts'
import { app } from '../../../app.ts'

describe('Get Last Rating (E2E)', async () => {
  beforeAll(async () => {
    await app.ready()
    MockDate.set(new Date())
  })

  afterAll(async () => {
    await app.close()
    MockDate.reset()
  })

  test('[GET] /ratings/last', async () => {
    const { token, user } = await makeAuthenticatedDrizzleUser()

    const [book1, book2] = await Promise.all([
      makeDrizzleBook(),
      makeDrizzleBook(),
    ])

    const [rating1] = await Promise.all([
      makeDrizzleRating({
        bookId: book1.id,
        readerId: user.id,
        createdAt: new Date(),
      }),
      makeDrizzleRating({
        bookId: book2.id,
        readerId: user.id,
        createdAt: new Date(Date.now() - 1),
      }),
    ])

    const response = await request(app.server)
      .get('/ratings/last')
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      rating: expect.objectContaining({
        id: rating1.id.toString(),
        createdAt: new Date().toISOString(),
      }),
    })
  })
})
