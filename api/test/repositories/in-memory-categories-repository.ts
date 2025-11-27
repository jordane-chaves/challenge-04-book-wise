import type { Category } from '../../src/domain/entities/category.ts'
import type { CategoriesRepository } from '../../src/domain/repositories/categories-repository.ts'
import type { InMemoryBookCategoriesRepository } from './in-memory-book-categories-repository.ts'
import type { InMemoryRatingsRepository } from './in-memory-ratings-repository.ts'

export class InMemoryCategoriesRepository implements CategoriesRepository {
  public items: Category[] = []

  constructor(
    private readonly ratingsRepository: InMemoryRatingsRepository,
    private readonly bookCategoriesRepository: InMemoryBookCategoriesRepository,
  ) {}

  async findMostReadByReaderId(readerId: string): Promise<Category | null> {
    const ratings = await this.ratingsRepository.findManyByReaderId(readerId)
    const booksIds = ratings.map((rating) => rating.bookId.toString())

    const bookCategories =
      await this.bookCategoriesRepository.findManyByBooksIds(booksIds)

    const aggregatedCategoriesCount = bookCategories.reduce(
      (result, bookCategory) => {
        const categoryId = bookCategory.categoryId.toString()

        const itemIndex = result.findIndex((item) => {
          return item.categoryId === categoryId
        })

        if (itemIndex >= 0) {
          result[itemIndex].count += 1
        } else {
          result.push({ categoryId, count: 1 })
        }

        return result
      },
      [] as { categoryId: string; count: number }[],
    )

    const sortedByMostReadCategories = aggregatedCategoriesCount.sort(
      (itemA, itemB) => {
        return itemB.count - itemA.count
      },
    )

    const categoryId = sortedByMostReadCategories[0]?.categoryId

    const category = this.items.find((item) => {
      return item.id.toString() === categoryId
    })

    if (!category) {
      return null
    }

    return category
  }

  async findById(id: string): Promise<Category | null> {
    const category = this.items.find((item) => item.id.toString() === id)

    if (!category) {
      return null
    }

    return category
  }

  async findMany(): Promise<Category[]> {
    return this.items
  }
}
