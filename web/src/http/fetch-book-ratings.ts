import { api } from "./api"
import type { FetchBookRatingsRequest } from "./types/fetch-book-ratings-request"
import type { FetchBookRatingsResponse } from "./types/fetch-book-ratings-response"

export async function fetchBookRatings({
  bookId,
}: FetchBookRatingsRequest): Promise<FetchBookRatingsResponse> {
  const response = await api(`/books/${bookId}/ratings`)

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message)
  }

  return response.json()
}
