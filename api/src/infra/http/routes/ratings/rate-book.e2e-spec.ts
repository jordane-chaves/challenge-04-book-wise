import { and, eq } from 'drizzle-orm'
import request from 'supertest'
import { makeDrizzleBook } from '../../../../../test/factories/make-book.ts'
import { makeAuthenticatedDrizzleUser } from '../../../../../test/factories/make-user.ts'
import { app } from '../../../app.ts'
import { db } from '../../../database/drizzle/client.ts'
import { schema } from '../../../database/drizzle/schema/index.ts'

describe('Rate Book (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('[POST] /books/:bookId/ratings', async () => {
    const { token, user } = await makeAuthenticatedDrizzleUser()
    const book = await makeDrizzleBook()

    const response = await request(app.server)
      .post(`/books/${book.id}/ratings`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        description: 'Example description',
        rating: 5,
      })

    expect(response.statusCode).toBe(201)

    const ratingInDatabaseResult = await db
      .select()
      .from(schema.ratings)
      .where(
        and(
          eq(schema.ratings.bookId, book.id),
          eq(schema.ratings.userId, user.id),
        ),
      )

    expect(ratingInDatabaseResult).toHaveLength(1)
  })
})
