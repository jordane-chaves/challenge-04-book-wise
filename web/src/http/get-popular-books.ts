import { api } from "./api"
import type { GetPopularBooksResponse } from "./types/get-popular-books-response"

export async function getPopularBooks(): Promise<GetPopularBooksResponse> {
  const response = await api("/popular-books", {
    next: {
      tags: ["rate-book"],
    },
  })

  return response.json()
}
