import { api } from "./api"
import type { GetBookDetailsRequest } from "./types/get-book-details-request"
import type { GetBookDetailsResponse } from "./types/get-book-details-response"

export async function getBookDetails({
  bookId,
}: GetBookDetailsRequest): Promise<GetBookDetailsResponse> {
  const response = await api(`/books/${bookId}`, {
    next: {
      revalidate: 60 * 10, // 10 minutes
      tags: ["rate-book"],
    },
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message)
  }

  return response.json()
}
