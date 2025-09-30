import { api } from "./api"
import type { FetchCategoriesResponse } from "./types/fetch-categories-response"

export async function fetchCategories(): Promise<FetchCategoriesResponse> {
  const response = await api("/categories")

  return response.json()
}
