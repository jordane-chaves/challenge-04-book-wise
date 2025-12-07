import dayjs from 'dayjs'
import request from 'supertest'
import { makeDrizzleBook } from '../../../../../test/factories/make-book.ts'
import { makeDrizzleRating } from '../../../../../test/factories/make-rating.ts'
import { makeAuthenticatedDrizzleUser } from '../../../../../test/factories/make-reader.ts'
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

    const date1 = dayjs().subtract(1, 'day')
    const date2 = dayjs()

    const [rating1, rating2, rating3] = await Promise.all([
      makeDrizzleRating({
        bookId: book1.id,
        readerId: user.id,
        createdAt: date1.toDate(),
      }),
      makeDrizzleRating({
        bookId: book2.id,
        readerId: user.id,
        createdAt: date1.toDate(),
      }),
      makeDrizzleRating({
        bookId: book3.id,
        readerId: user.id,
        createdAt: date2.toDate(),
      }),
    ])

    const response = await request(app.server)
      .get('/ratings')
      .set('Authorization', `Bearer ${token}`)

    const formattedDate1 = date1.format('YYYY-MM-DD')
    const formattedDate2 = date2.format('YYYY-MM-DD')

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      ratings: {
        [formattedDate1]: expect.arrayContaining([
          expect.objectContaining({ id: rating1.id.toString() }),
          expect.objectContaining({ id: rating2.id.toString() }),
        ]),
        [formattedDate2]: expect.arrayContaining([
          expect.objectContaining({ id: rating3.id.toString() }),
        ]),
      },
    })
  })

  test('[GET] /ratings - search by book title', async () => {
    const { token, user } = await makeAuthenticatedDrizzleUser()

    const [book1, book2, book3] = await Promise.all([
      makeDrizzleBook(),
      makeDrizzleBook({ title: 'O Hobbit' }),
      makeDrizzleBook(),
    ])

    const date1 = dayjs()

    await Promise.all([
      makeDrizzleRating({
        bookId: book1.id,
        readerId: user.id,
        createdAt: date1.toDate(),
      }),
      makeDrizzleRating({
        bookId: book2.id,
        readerId: user.id,
        createdAt: date1.toDate(),
      }),
      makeDrizzleRating({
        bookId: book3.id,
        readerId: user.id,
        createdAt: date1.toDate(),
      }),
    ])

    const response = await request(app.server)
      .get('/ratings')
      .set('Authorization', `Bearer ${token}`)
      .query({ query: 'O Hobbit' })

    const formattedDate1 = date1.format('YYYY-MM-DD')

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      ratings: {
        [formattedDate1]: [expect.objectContaining({ name: 'O Hobbit' })],
      },
    })
  })
})
