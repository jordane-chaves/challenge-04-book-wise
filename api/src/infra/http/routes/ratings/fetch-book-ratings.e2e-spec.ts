import request from 'supertest'
import { makeDrizzleBook } from '../../../../../test/factories/make-book.ts'
import { makeDrizzleRating } from '../../../../../test/factories/make-rating.ts'
import { makeDrizzleUser } from '../../../../../test/factories/make-user.ts'
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
      makeDrizzleRating({ bookId: book.id, userId: user1.id }),
      makeDrizzleRating({ bookId: book.id, userId: user2.id }),
      makeDrizzleRating({ bookId: book.id, userId: user3.id }),
    ])

    const response = await request(app.server).get(`/books/${book.id}/ratings`)

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      ratings: [
        expect.objectContaining({ bookId: book.id }),
        expect.objectContaining({ bookId: book.id }),
        expect.objectContaining({ bookId: book.id }),
      ],
    })
  })
})
