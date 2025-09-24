"use client"

import { signInWithGoogle } from "@/app/(auth)/actions"
import { GoogleIcon } from "@/assets/google-icon"
import { Button } from "./button"

export function GoogleSignInButton() {
  return (
    <Button onClick={signInWithGoogle} size="lg">
      <GoogleIcon className="size-8" />
      Entrar com Google
    </Button>
  )
}
