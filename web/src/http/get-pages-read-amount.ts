import { api } from "./api"
import type { GetPagesReadAmountRequest } from "./types/get-pages-read-amount-request"
import type { GetPagesReadAmountResponse } from "./types/get-pages-read-amount-response"

export async function getPagesReadAmount({
  accessToken,
}: GetPagesReadAmountRequest): Promise<GetPagesReadAmountResponse> {
  const response = await api("/metrics/pages-read-amount", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if (!response.ok) {
    return { amount: 0 }
  }

  return response.json()
}
