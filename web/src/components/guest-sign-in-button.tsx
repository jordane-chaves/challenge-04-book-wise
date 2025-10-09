import { RocketLaunchIcon } from "@phosphor-icons/react/dist/ssr"
import { Button } from "./ui/button"

export function GuestSignInButton() {
  return (
    <Button size="lg">
      <RocketLaunchIcon className="size-8 text-primary" />
      Acessar como Visitante
    </Button>
  )
}
