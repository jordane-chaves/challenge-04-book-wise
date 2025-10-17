import { api } from "./api"
import type { SearchUserRatingsRequest } from "./types/search-user-ratings-request"
import type { SearchUserRatingsResponse } from "./types/search-user-ratings-response"

export async function searchUserRatings({
  accessToken,
  query,
}: SearchUserRatingsRequest): Promise<SearchUserRatingsResponse> {
  const searchParams = new URLSearchParams()

  if (query) {
    searchParams.set("query", query)
  }

  const response = await api(`/ratings?${searchParams.toString()}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return response.json()
}
