import { BookOpenIcon } from "@phosphor-icons/react/dist/ssr"

export function PagesReadAmount() {
  return (
    <div className="flex items-center gap-5">
      <BookOpenIcon className="size-8 text-accent" />
      <div>
        <strong className="leading-snug">3853</strong>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Páginas lidas
        </p>
      </div>
    </div>
  )
}
