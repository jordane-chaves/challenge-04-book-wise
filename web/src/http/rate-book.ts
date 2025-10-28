import { api } from "./api"
import type { RateBookRequest } from "./types/rate-book-request"

export async function rateBook({
  accessToken,
  bookId,
  description,
  rating,
}: RateBookRequest) {
  const response = await api(`/books/${bookId}/ratings`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      description,
      rating,
    }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message)
  }
}
