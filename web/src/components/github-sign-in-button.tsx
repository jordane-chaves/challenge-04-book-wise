"use client"

import { signInWithGithub } from "@/app/(auth)/actions"
import { GithubIcon } from "@/assets/github-icon"
import { Button } from "./button"

export function GithubSignInButton() {
  return (
    <Button onClick={signInWithGithub}>
      <GithubIcon className="size-8 text-white" />
      Entrar com Github
    </Button>
  )
}
