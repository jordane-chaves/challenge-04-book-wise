import { api } from "./api"
import type { GetLastRatingRequest } from "./types/get-last-rating-request"
import type { GetLastRatingResponse } from "./types/get-last-rating-response"

export async function getLastRating({
  accessToken,
}: GetLastRatingRequest): Promise<GetLastRatingResponse> {
  const response = await api("/ratings/last", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    next: {
      tags: ["rate-book"],
    },
  })

  return response.json()
}
