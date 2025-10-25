import { SignOutIcon } from "@phosphor-icons/react/dist/ssr"
import { getInitials } from "@/utils/get-initials"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"

interface User {
  name: string
  avatarUrl: string | null
}

interface NavUserProps {
  user: User
}

export function NavUser({ user }: NavUserProps) {
  return (
    <div className="flex max-w-full items-center gap-3">
      <Avatar size="sm">
        {user.avatarUrl && <AvatarImage src={user.avatarUrl} alt="" />}
        <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
      </Avatar>
      <span className="truncate text-sidebar-foreground">{user.name}</span>
      <a
        className="flex size-fit rounded-xs outline-none"
        href="/api/auth/sign-out"
      >
        <Button className="p-1" variant="ghost" size="icon">
          <SignOutIcon className="text-destructive" />
          <span className="sr-only">Sair</span>
        </Button>
      </a>
    </div>
  )
}
