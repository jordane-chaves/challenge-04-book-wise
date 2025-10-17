export interface SearchUserRatingsResponse {
  ratings: Record<
    string,
    {
      id: string
      author: string
      name: string
      coverUrl: string
      description: string
      rating: number
    }[]
  >
}
