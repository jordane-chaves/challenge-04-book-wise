import { api } from "./api"
import type { GetPopularBooksResponse } from "./types/get-popular-books-response"

export async function getPopularBooks(): Promise<GetPopularBooksResponse> {
  const response = await api("/popular-books", {
    next: {
      revalidate: 60 * 10, // 10 minutes
      tags: ["rate-book"],
    },
  })

  return response.json()
}
