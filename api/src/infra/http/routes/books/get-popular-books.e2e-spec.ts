import request from 'supertest'
import { makeDrizzleBook } from '../../../../../test/factories/make-book.ts'
import { makeDrizzleRating } from '../../../../../test/factories/make-rating.ts'
import { makeDrizzleUser } from '../../../../../test/factories/make-user.ts'
import { app } from '../../../app.ts'

describe('Get Popular Books (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('[GET] /popular-books', async () => {
    const [, book2, book3, book4, book5] = await Promise.all([
      makeDrizzleBook(),
      makeDrizzleBook(),
      makeDrizzleBook(),
      makeDrizzleBook(),
      makeDrizzleBook(),
    ])

    const [user1, user2] = await Promise.all([
      makeDrizzleUser(),
      makeDrizzleUser(),
    ])

    await Promise.all([
      makeDrizzleRating({ bookId: book4.id, userId: user1.id, rating: 5 }),
      makeDrizzleRating({ bookId: book2.id, userId: user1.id, rating: 5 }),
      makeDrizzleRating({ bookId: book5.id, userId: user1.id, rating: 5 }),
      makeDrizzleRating({ bookId: book3.id, userId: user1.id, rating: 5 }),
      makeDrizzleRating({ bookId: book4.id, userId: user2.id, rating: 5 }),
      makeDrizzleRating({ bookId: book2.id, userId: user2.id, rating: 5 }),
      makeDrizzleRating({ bookId: book5.id, userId: user2.id, rating: 5 }),
      makeDrizzleRating({ bookId: book3.id, userId: user2.id, rating: 5 }),
    ])

    const response = await request(app.server).get('/popular-books')

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      books: expect.arrayContaining([
        expect.objectContaining({ id: book2.id }),
        expect.objectContaining({ id: book3.id }),
        expect.objectContaining({ id: book4.id }),
        expect.objectContaining({ id: book5.id }),
      ]),
    })
  })
})
