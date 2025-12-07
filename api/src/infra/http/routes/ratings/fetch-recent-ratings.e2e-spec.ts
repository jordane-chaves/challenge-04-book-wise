import MockDate from 'mockdate'
import request from 'supertest'

import { makeDrizzleBook } from '../../../../../test/factories/make-book.ts'
import { makeDrizzleRating } from '../../../../../test/factories/make-rating.ts'
import { makeDrizzleUser } from '../../../../../test/factories/make-reader.ts'
import { app } from '../../../app.ts'

describe('Fetch Recent Ratings (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
    MockDate.set(new Date())
  })

  afterAll(async () => {
    await app.close()
    MockDate.reset()
  })

  test('[GET] /ratings/recent', async () => {
    const book = await makeDrizzleBook()
    const [user1, user2, user3] = await Promise.all([
      makeDrizzleUser(),
      makeDrizzleUser(),
      makeDrizzleUser(),
    ])

    const [rating1, rating2, rating3] = await Promise.all([
      makeDrizzleRating({
        bookId: book.id,
        readerId: user1.id,
        createdAt: new Date(Date.now()),
      }),
      makeDrizzleRating({
        bookId: book.id,
        readerId: user2.id,
        createdAt: new Date(Date.now() - 2),
      }),
      makeDrizzleRating({
        bookId: book.id,
        readerId: user3.id,
        createdAt: new Date(Date.now() - 1),
      }),
    ])

    const response = await request(app.server).get('/ratings/recent')

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      ratings: expect.arrayContaining([
        expect.objectContaining({
          id: rating1.id.toString(),
          createdAt: new Date(Date.now()).toISOString(),
        }),
        expect.objectContaining({
          id: rating3.id.toString(),
          createdAt: new Date(Date.now() - 1).toISOString(),
        }),
        expect.objectContaining({
          id: rating2.id.toString(),
          createdAt: new Date(Date.now() - 2).toISOString(),
        }),
      ]),
    })
  })
})
