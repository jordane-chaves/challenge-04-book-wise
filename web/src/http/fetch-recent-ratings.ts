import { api } from "./api"
import type { FetchRecentRatingsResponse } from "./types/fetch-recent-ratings-response"

export async function fetchRecentRatings(): Promise<FetchRecentRatingsResponse> {
  const response = await api("/ratings/recent", {
    next: {
      tags: ["rate-book"],
    },
  })

  return response.json()
}
