import { RocketLaunchIcon } from "@phosphor-icons/react/dist/ssr"
import { Button } from "./button"

export function GuestSignInButton() {
  return (
    <Button>
      <RocketLaunchIcon className="size-8 text-primary" />
      Acessar como Visitante
    </Button>
  )
}
