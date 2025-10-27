import request from 'supertest'

import { makeDrizzleBook } from '../../../../../test/factories/make-book.ts'
import { makeDrizzleRating } from '../../../../../test/factories/make-rating.ts'
import { makeAuthenticatedDrizzleUser } from '../../../../../test/factories/make-user.ts'
import { app } from '../../../app.ts'

describe('Search User Ratings (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('[GET] /ratings - group results by created date', async () => {
    const { token, user } = await makeAuthenticatedDrizzleUser()

    const [book1, book2, book3] = await Promise.all([
      makeDrizzleBook(),
      makeDrizzleBook(),
      makeDrizzleBook(),
    ])

    const nextYear = new Date().getFullYear() + 1

    await Promise.all([
      makeDrizzleRating({
        bookId: book1.id,
        userId: user.id,
        createdAt: new Date(nextYear, 2, 1),
      }),
      makeDrizzleRating({
        bookId: book2.id,
        userId: user.id,
        createdAt: new Date(nextYear, 2, 1),
      }),
      makeDrizzleRating({
        bookId: book3.id,
        userId: user.id,
        createdAt: new Date(nextYear, 3, 1),
      }),
    ])

    const response = await request(app.server)
      .get('/ratings')
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      ratings: {
        [`${nextYear}-03-01`]: expect.arrayContaining([
          expect.objectContaining({ id: book1.id }),
          expect.objectContaining({ id: book2.id }),
        ]),
        [`${nextYear}-04-01`]: expect.arrayContaining([
          expect.objectContaining({ id: book3.id }),
        ]),
      },
    })
  })

  test('[GET] /ratings - search by book name', async () => {
    const { token, user } = await makeAuthenticatedDrizzleUser()

    const [book1, book2, book3] = await Promise.all([
      makeDrizzleBook(),
      makeDrizzleBook({ name: 'O Hobbit' }),
      makeDrizzleBook(),
    ])

    const nextYear = new Date().getFullYear() + 1

    await Promise.all([
      makeDrizzleRating({
        bookId: book1.id,
        userId: user.id,
        createdAt: new Date(nextYear, 2, 1),
      }),
      makeDrizzleRating({
        bookId: book2.id,
        userId: user.id,
        createdAt: new Date(nextYear, 2, 1),
      }),
      makeDrizzleRating({
        bookId: book3.id,
        userId: user.id,
        createdAt: new Date(nextYear, 2, 1),
      }),
    ])

    const response = await request(app.server)
      .get('/ratings')
      .set('Authorization', `Bearer ${token}`)
      .query({ query: 'O Hobbit' })

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      ratings: {
        [`${nextYear}-03-01`]: [expect.objectContaining({ name: 'O Hobbit' })],
      },
    })
  })
})
