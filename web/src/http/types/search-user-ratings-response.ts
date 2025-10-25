type DateKey = string

interface Rating {
  id: string
  author: string
  name: string
  coverUrl: string
  description: string
  rating: number
}

export interface SearchUserRatingsResponse {
  ratings: Record<DateKey, Rating[]>
}
