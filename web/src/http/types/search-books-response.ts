export interface SearchBooksResponse {
  books: {
    id: string
    name: string
    author: string
    coverUrl: string
    rating: number
  }[]
}
