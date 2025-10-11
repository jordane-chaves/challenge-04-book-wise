export interface FetchBookRatingsResponse {
  ratings: {
    id: string
    userId: string
    user: string
    avatarUrl: string | null
    description: string
    rating: number
    createdAt: string
  }[]
}
