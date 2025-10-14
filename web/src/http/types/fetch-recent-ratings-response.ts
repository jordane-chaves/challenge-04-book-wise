export interface FetchRecentRatingsResponse {
  ratings: {
    id: string
    userName: string
    avatarUrl: string | null
    coverUrl: string
    bookName: string
    bookAuthor: string
    description: string
    rating: number
    createdAt: Date
  }[]
}
