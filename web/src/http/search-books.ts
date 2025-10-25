import { api } from "./api"
import type { SearchBooksRequest } from "./types/search-books-request"
import type { SearchBooksResponse } from "./types/search-books-response"

export async function searchBooks({
  categoryId,
  query,
}: SearchBooksRequest): Promise<SearchBooksResponse> {
  const searchParams = new URLSearchParams()

  if (categoryId) {
    searchParams.set("categoryId", categoryId)
  }

  if (query) {
    searchParams.set("query", query)
  }

  const response = await api(`/books?${searchParams.toString()}`, {
    next: {
      revalidate: 60 * 60 * 24, // 24 hours
    },
  })

  return response.json()
}
