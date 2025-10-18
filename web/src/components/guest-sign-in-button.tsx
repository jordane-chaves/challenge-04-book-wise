"use client"

import { RocketLaunchIcon } from "@phosphor-icons/react/dist/ssr"
import { useRouter } from "next/navigation"
import { Button } from "./ui/button"

export function GuestSignInButton() {
  const router = useRouter()

  function handleNavigateToHome() {
    router.push("/")
  }

  return (
    <Button size="lg" onClick={handleNavigateToHome}>
      <RocketLaunchIcon className="size-8 text-primary" />
      Acessar como Visitante
    </Button>
  )
}
