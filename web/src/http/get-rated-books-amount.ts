import { api } from "./api"
import type { GetRatedBooksAmountRequest } from "./types/get-rated-books-amount-request"
import type { GetRatedBooksAmountResponse } from "./types/get-rated-books-amount-response"

export async function getRatedBooksAmount({
  accessToken,
}: GetRatedBooksAmountRequest): Promise<GetRatedBooksAmountResponse> {
  const response = await api("/metrics/rated-books-amount", {
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
