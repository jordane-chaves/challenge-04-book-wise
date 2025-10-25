import { api } from "./api"
import type { GetAuthorsReadAmountRequest } from "./types/get-authors-read-amount-request"
import type { GetAuthorsReadAmountResponse } from "./types/get-authors-read-amount-response"

export async function getAuthorsReadAmount({
  accessToken,
}: GetAuthorsReadAmountRequest): Promise<GetAuthorsReadAmountResponse> {
  const response = await api("/metrics/authors-read-amount", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    next: {
      tags: ["rate-book"],
    },
  })

  if (!response.ok) {
    return { amount: 0 }
  }

  return response.json()
}
