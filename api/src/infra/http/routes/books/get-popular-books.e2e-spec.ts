import request from 'supertest'
import { makeDrizzleBook } from '../../../../../test/factories/make-book.ts'
import { makeDrizzleRating } from '../../../../../test/factories/make-rating.ts'
import { makeDrizzleUser } from '../../../../../test/factories/make-reader.ts'
import { app } from '../../../app.ts'

describe('Get Popular Books (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('[GET] /popular-books', async () => {
    const [user1, user2, user3] = await Promise.all([
      makeDrizzleUser(),
      makeDrizzleUser(),
      makeDrizzleUser(),
    ])

    const [book1, book2, book3, book4, book5] = await Promise.all([
      makeDrizzleBook(),
      makeDrizzleBook(),
      makeDrizzleBook(),
      makeDrizzleBook(),
      makeDrizzleBook(),
    ])

    await Promise.all([
      makeDrizzleRating({ bookId: book1.id, readerId: user1.id, score: 4.5 }),

      makeDrizzleRating({ bookId: book2.id, readerId: user1.id, score: 5 }),
      makeDrizzleRating({ bookId: book3.id, readerId: user1.id, score: 5 }),
      makeDrizzleRating({ bookId: book4.id, readerId: user1.id, score: 5 }),
      makeDrizzleRating({ bookId: book5.id, readerId: user1.id, score: 5 }),

      makeDrizzleRating({ bookId: book2.id, readerId: user2.id, score: 5 }),
      makeDrizzleRating({ bookId: book3.id, readerId: user2.id, score: 5 }),
      makeDrizzleRating({ bookId: book4.id, readerId: user2.id, score: 5 }),
      makeDrizzleRating({ bookId: book5.id, readerId: user2.id, score: 5 }),

      makeDrizzleRating({ bookId: book2.id, readerId: user3.id, score: 5 }),
      makeDrizzleRating({ bookId: book3.id, readerId: user3.id, score: 5 }),
      makeDrizzleRating({ bookId: book4.id, readerId: user3.id, score: 5 }),
      makeDrizzleRating({ bookId: book5.id, readerId: user3.id, score: 5 }),
    ])

    const response = await request(app.server).get('/popular-books')

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      books: expect.arrayContaining([
        expect.objectContaining({ id: book3.id.toString(), rating: 5 }),
        expect.objectContaining({ id: book5.id.toString(), rating: 5 }),
        expect.objectContaining({ id: book2.id.toString(), rating: 5 }),
        expect.objectContaining({ id: book4.id.toString(), rating: 5 }),
      ]),
    })
  })
})
