export interface FetchBookRatingsResponse {
  ratings: {
    id: string
    bookId: string
    userId: string
    user: string
    avatarUrl: string | null
    description: string
    rating: number
    createdAt: string
  }[]
}
