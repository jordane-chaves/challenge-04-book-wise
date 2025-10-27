import request from 'supertest'

import { makeDrizzleBook } from '../../../../../test/factories/make-book.ts'
import { makeDrizzleRating } from '../../../../../test/factories/make-rating.ts'
import { makeDrizzleUser } from '../../../../../test/factories/make-user.ts'
import { app } from '../../../app.ts'

describe('Fetch Recent Ratings (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('[GET] /ratings/recent', async () => {
    const book = await makeDrizzleBook()
    const [user1, user2, user3] = await Promise.all([
      makeDrizzleUser(),
      makeDrizzleUser(),
      makeDrizzleUser(),
    ])

    const nextYear = new Date().getFullYear() + 1

    await Promise.all([
      makeDrizzleRating({
        bookId: book.id,
        userId: user1.id,
        createdAt: new Date(nextYear, 10, 1),
      }),
      makeDrizzleRating({
        bookId: book.id,
        userId: user2.id,
        createdAt: new Date(nextYear, 8, 1),
      }),
      makeDrizzleRating({
        bookId: book.id,
        userId: user3.id,
        createdAt: new Date(nextYear, 9, 1),
      }),
    ])

    const response = await request(app.server).get('/ratings/recent')

    expect(response.statusCode).toBe(200)
    expect(response.body.ratings[0]).toMatchObject({
      createdAt: new Date(nextYear, 10, 1).toISOString(),
    })
    expect(response.body.ratings[1]).toMatchObject({
      createdAt: new Date(nextYear, 9, 1).toISOString(),
    })
    expect(response.body.ratings[2]).toMatchObject({
      createdAt: new Date(nextYear, 8, 1).toISOString(),
    })
  })
})
