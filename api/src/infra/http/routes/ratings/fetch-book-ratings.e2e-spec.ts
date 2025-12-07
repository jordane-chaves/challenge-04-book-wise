import request from 'supertest'
import { makeDrizzleBook } from '../../../../../test/factories/make-book.ts'
import { makeDrizzleRating } from '../../../../../test/factories/make-rating.ts'
import { makeDrizzleUser } from '../../../../../test/factories/make-reader.ts'
import { app } from '../../../app.ts'

describe('Fetch Book Ratings (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('[GET] /books/:bookId/ratings', async () => {
    const book = await makeDrizzleBook()
    const [user1, user2, user3] = await Promise.all([
      makeDrizzleUser(),
      makeDrizzleUser(),
      makeDrizzleUser(),
    ])

    await Promise.all([
      makeDrizzleRating({ bookId: book.id, readerId: user1.id }),
      makeDrizzleRating({ bookId: book.id, readerId: user2.id }),
      makeDrizzleRating({ bookId: book.id, readerId: user3.id }),
    ])

    const response = await request(app.server).get(
      `/books/${book.id.toString()}/ratings`,
    )

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      ratings: expect.arrayContaining([
        expect.objectContaining({
          bookId: book.id.toString(),
          user: user1.name,
        }),
        expect.objectContaining({
          bookId: book.id.toString(),
          user: user2.name,
        }),
        expect.objectContaining({
          bookId: book.id.toString(),
          user: user3.name,
        }),
      ]),
    })
  })
})
