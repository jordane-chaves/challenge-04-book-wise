import { api } from "./api"
import type { GetReadBooksRequest } from "./types/get-read-books-request"
import type { GetReadBooksResponse } from "./types/get-read-books-response"

export async function getReadBooks({
  accessToken,
}: GetReadBooksRequest): Promise<GetReadBooksResponse> {
  const response = await api("/books/read", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return response.json()
}
