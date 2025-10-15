import { BooksIcon } from "@phosphor-icons/react/dist/ssr"

export function BooksReviewedAmount() {
  return (
    <div className="flex items-center gap-5">
      <BooksIcon className="size-8 text-accent" />
      <div>
        <strong className="leading-snug">10</strong>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Livros avaliados
        </p>
      </div>
    </div>
  )
}
