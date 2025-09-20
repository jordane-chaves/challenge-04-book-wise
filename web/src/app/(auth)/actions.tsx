"use server"

import { randomBytes } from "node:crypto"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { env } from "@/env"

function generateCSRFToken() {
  return randomBytes(32).toString("hex")
}

export async function signInWithGithub() {
  const cookieStore = await cookies()

  const csrfToken = generateCSRFToken()

  cookieStore.set("bookwise.csrf-token", csrfToken)

  const githubSignInURL = new URL("https://github.com/login/oauth/authorize")

  githubSignInURL.searchParams.set("client_id", env.GITHUB_OAUTH_CLIENT_ID)
  githubSignInURL.searchParams.set(
    "redirect_uri",
    env.GITHUB_OAUTH_REDIRECT_URI,
  )

  githubSignInURL.searchParams.set("scope", "user")
  githubSignInURL.searchParams.set("state", csrfToken)

  redirect(githubSignInURL.toString())
}

export async function signInWithGoogle() {
  const cookieStore = await cookies()

  const csrfToken = generateCSRFToken()

  cookieStore.set("bookwise.csrf-token", csrfToken)

  const googleSignInURL = new URL(
    "https://accounts.google.com/o/oauth2/v2/auth",
  )

  googleSignInURL.searchParams.set("client_id", env.GOOGLE_OAUTH_CLIENT_ID)
  googleSignInURL.searchParams.set(
    "redirect_uri",
    env.GOOGLE_OAUTH_REDIRECT_URI,
  )

  googleSignInURL.searchParams.set("response_type", "code")
  googleSignInURL.searchParams.set("scope", "profile email")
  googleSignInURL.searchParams.set("state", csrfToken)

  redirect(googleSignInURL.toString())
}
