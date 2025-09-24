import { redirect } from "next/navigation"
import type { NextRequest } from "next/server"
import { deleteSession } from "@/lib/sessions"

export async function GET(request: NextRequest) {
  const redirectUrl = request.nextUrl.clone()

  redirectUrl.pathname = "/"
  redirectUrl.search = ""

  await deleteSession()

  return redirect(redirectUrl.toString())
}
