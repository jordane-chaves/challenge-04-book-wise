import { makeReader } from '../../../test/factories/make-reader.ts'
import { InMemoryReadersRepository } from '../../../test/repositories/in-memory-readers-repository.ts'
import { UniqueEntityID } from '../../core/entities/unique-entity-id.ts'
import { GetReaderProfileUseCase } from './get-reader-profile.ts'

let inMemoryReadersRepository: InMemoryReadersRepository

let sut: GetReaderProfileUseCase

describe('Get Reader Profile', () => {
  beforeEach(() => {
    inMemoryReadersRepository = new InMemoryReadersRepository()

    sut = new GetReaderProfileUseCase(inMemoryReadersRepository)
  })

  it('should be able to get reader profile', async () => {
    inMemoryReadersRepository.items.push(
      makeReader(
        {
          name: 'John Doe',
        },
        new UniqueEntityID('reader-1'),
      ),
    )

    const result = await sut.execute({
      readerId: 'reader-1',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      reader: expect.objectContaining({
        name: 'John Doe',
      }),
    })
  })
})
