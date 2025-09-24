import { SignOutIcon } from "@phosphor-icons/react/dist/ssr"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "./avatar"

export function NavUser() {
  return (
    <div className="flex max-w-full items-center gap-3">
      <Avatar size="sm">
        <AvatarImage src="https://github.com/jordane-chaves.png" alt="" />
        <AvatarFallback>JC</AvatarFallback>
      </Avatar>
      <span className="truncate text-sidebar-foreground">Jordane Chaves</span>
      <Link
        className="not-disabled:cursor-pointer rounded-xs outline-none not-disabled:hover:brightness-90 focus-visible:ring-2 focus-visible:ring-accent"
        href="#"
      >
        <SignOutIcon className="size-5 text-destructive" />
        <span className="sr-only">Sair</span>
      </Link>
    </div>
  )
}
