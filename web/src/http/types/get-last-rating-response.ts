export interface GetLastRatingResponse {
  rating: {
    id: string
    coverUrl: string
    bookName: string
    bookAuthor: string
    description: string
    rating: number
    createdAt: Date
  } | null
}
