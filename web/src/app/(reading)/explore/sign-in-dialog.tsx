import { GithubSignInButton } from "@/components/github-sign-in-button"
import { GoogleSignInButton } from "@/components/google-sign-in-button"
import {
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"

export function SignInDialog() {
  return (
    <DialogContent className="px-[4.5rem] py-14">
      <header>
        <DialogTitle className="sr-only">Login</DialogTitle>
        <DialogDescription className="text-center text-foreground">
          Faça login para deixar sua avaliação
        </DialogDescription>
      </header>
      <div className="mt-10 grid grid-cols-1 gap-4">
        <GoogleSignInButton />
        <GithubSignInButton />
      </div>
    </DialogContent>
  )
}
