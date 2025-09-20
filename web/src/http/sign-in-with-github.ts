import { api } from "./api"
import type { SignInWithGithubRequest } from "./types/sign-in-with-github-request"
import type { SignInWithGithubResponse } from "./types/sign-in-with-github-response"

export async function signInWithGithub({
  code,
}: SignInWithGithubRequest): Promise<SignInWithGithubResponse> {
  const response = await api("/sessions/github", {
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

  const data: SignInWithGithubResponse = await response.json()

  return data
}
