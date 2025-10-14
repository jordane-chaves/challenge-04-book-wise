export interface GetPopularBooksResponse {
  books: {
    id: string
    author: string
    coverUrl: string
    name: string
    rating: number
  }[]
}
