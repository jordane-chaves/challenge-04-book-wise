import { WarningCircleIcon } from "@phosphor-icons/react/dist/ssr"
import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { GithubSignInButton } from "@/components/github-sign-in-button"
import { GoogleSignInButton } from "@/components/google-sign-in-button"
import { GuestSignInButton } from "@/components/guest-sign-in-button"
import { getTokenFromCookie } from "@/lib/sessions"

export const metadata: Metadata = {
  title: "Login",
}

export default async function SignIn({
  searchParams,
}: {
  searchParams: Promise<{ error: string }>
}) {
  const accessToken = await getTokenFromCookie()
  const { error } = await searchParams

  if (accessToken) {
    redirect("/")
  }

  return (
    <div className="flex w-full max-w-[372px] flex-col gap-10">
      <header>
        <h1 className="font-bold text-2xl leading-snug">Boas vindas!</h1>
        <p className="font-normal text-base text-sidebar-foreground leading-relaxed">
          Faça seu login ou acesse como visitante.
        </p>
      </header>

      {error && (
        <div className="flex gap-2 rounded-lg border p-4 text-destructive">
          <WarningCircleIcon className="mt-1" />
          <p>Falha ao fazer login!</p>
        </div>
      )}

      <div className="flex flex-col gap-4">
        <GoogleSignInButton />
        <GithubSignInButton />
        <GuestSignInButton />
      </div>
    </div>
  )
}
