import { api } from "./api"
import type { SignInWithGoogleRequest } from "./types/sign-in-with-google-request"
import type { SignInWithGoogleResponse } from "./types/sign-in-with-google-response"

export async function signInWithGoogle({
  code,
}: SignInWithGoogleRequest): Promise<SignInWithGoogleResponse> {
  const response = await api("/sessions/google", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      code,
    }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message)
  }

  const data: SignInWithGoogleResponse = await response.json()

  return data
}
