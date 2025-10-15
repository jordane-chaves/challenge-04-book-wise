import { BookmarkSimpleIcon } from "@phosphor-icons/react/dist/ssr"

export function MostReadCategory() {
  return (
    <div className="flex items-center gap-5">
      <BookmarkSimpleIcon className="size-8 text-accent" />
      <div>
        <strong className="leading-snug">Computação</strong>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Categoria mais lida
        </p>
      </div>
    </div>
  )
}
