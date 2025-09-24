import { api } from "./api"
import type { GetProfileRequest } from "./types/get-profile-request"
import type { GetProfileResponse } from "./types/get-profile-response"

export async function getProfile({
  accessToken,
}: GetProfileRequest): Promise<GetProfileResponse> {
  const response = await api("/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message)
  }

  return response.json()
}
