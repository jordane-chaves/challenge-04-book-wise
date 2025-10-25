import { api } from "./api"
import type { FetchRecentRatingsResponse } from "./types/fetch-recent-ratings-response"

export async function fetchRecentRatings(): Promise<FetchRecentRatingsResponse> {
  const response = await api("/ratings/recent", {
    next: {
      revalidate: 60 * 10, // 10 minutes
      tags: ["rate-book"],
    },
  })

  return response.json()
}
