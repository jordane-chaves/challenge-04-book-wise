export interface GetBookDetailsResponse {
  book: {
    id: string
    name: string
    author: string
    coverUrl: string
    rating: number
    ratingCount: number
    totalPages: number
    categories: string[]
  }
}
