import { getProfile } from "@/http/get-profile"
import { getTokenFromCookie } from "@/lib/sessions"

export async function auth() {
  const accessToken = await getTokenFromCookie()

  if (!accessToken) {
    return { user: null }
  }

  try {
    const { user } = await getProfile({ accessToken })

    return { user }
  } catch {}

  return { user: null }
}
