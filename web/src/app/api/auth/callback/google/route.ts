import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"
import { signInWithGoogle } from "@/http/sign-in-with-google"
import { createSession } from "@/lib/sessions"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams

  const code = searchParams.get("code")

  if (!code) {
    return Response.json(
      { message: "Google OAuth code was not found." },
      { status: 400 },
    )
  }

  const cookieStore = await cookies()

  const csrfToken = cookieStore.get("bookwise.csrf-token")?.value ?? null
  const csrfTokenFromRequest = searchParams.get("state")

  const isValidCSRFToken = csrfToken === csrfTokenFromRequest

  if (!isValidCSRFToken) {
    return new Response(undefined, { status: 403 })
  }

  cookieStore.delete("bookwise.csrf-token")

  const redirectUrl = request.nextUrl.clone()

  try {
    const { token } = await signInWithGoogle({ code })

    await createSession(token)
  } catch {
    redirectUrl.pathname = "/sign-in"
    redirectUrl.search = ""
    redirectUrl.searchParams.set("error", "true")

    return NextResponse.redirect(redirectUrl)
  }

  redirectUrl.pathname = "/"
  redirectUrl.search = ""

  return NextResponse.redirect(redirectUrl)
}
