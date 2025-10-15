import { UserListIcon } from "@phosphor-icons/react/dist/ssr"

export function AuthorsReadAmount() {
  return (
    <div className="flex items-center gap-5">
      <UserListIcon className="size-8 text-accent" />
      <div>
        <strong className="leading-snug">8</strong>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Autores lidos
        </p>
      </div>
    </div>
  )
}
