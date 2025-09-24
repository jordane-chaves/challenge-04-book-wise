"server-only"

import { cookies } from "next/headers"
import { env } from "@/env"

const COOKIE_TOKEN_KEY = "bookwise.token"

export async function createSession(token: string) {
  const cookieStore = await cookies()

  cookieStore.set(COOKIE_TOKEN_KEY, token, {
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    httpOnly: true,
    secure: env.NODE_ENV === "production",
  })
}

export async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.delete(COOKIE_TOKEN_KEY)
}

export async function getTokenFromCookie() {
  const cookieStore = await cookies()
  return cookieStore.get(COOKIE_TOKEN_KEY)?.value
}
