import { api } from "./api"
import type { GetMostReadCategoryRequest } from "./types/get-most-read-category-request"
import type { GetMostReadCategoryResponse } from "./types/get-most-read-category-response"

export async function getMostReadCategory({
  accessToken,
}: GetMostReadCategoryRequest): Promise<GetMostReadCategoryResponse> {
  const response = await api("/metrics/most-read-category", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if (!response.ok) {
    return { category: "-" }
  }

  return response.json()
}
