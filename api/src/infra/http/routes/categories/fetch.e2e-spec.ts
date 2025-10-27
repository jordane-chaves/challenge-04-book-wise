import request from 'supertest'
import { makeDrizzleCategory } from '../../../../../test/factories/make-category.ts'
import { app } from '../../../app.ts'

describe('Fetch Categories (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('[GET] /categories', async () => {
    const [category1, category2, category3] = await Promise.all([
      makeDrizzleCategory(),
      makeDrizzleCategory(),
      makeDrizzleCategory(),
    ])

    const response = await request(app.server).get('/categories')

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      categories: expect.arrayContaining([
        expect.objectContaining({ id: category1.id }),
        expect.objectContaining({ id: category2.id }),
        expect.objectContaining({ id: category3.id }),
      ]),
    })
  })
})
