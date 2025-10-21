import { BooksIcon } from "@phosphor-icons/react/dist/ssr"
import { getRatedBooksAmount } from "@/http/get-rated-books-amount"
import { getTokenFromCookie } from "@/lib/sessions"

export async function RatedBooksAmount() {
  const accessToken = await getTokenFromCookie()

  if (!accessToken) {
    return null
  }

  const ratedBooksAmountResponse = await getRatedBooksAmount({ accessToken })

  return (
    <div className="flex items-center gap-5">
      <BooksIcon className="size-8 shrink-0 text-accent" />
      <div>
        <strong className="leading-snug">
          {ratedBooksAmountResponse.amount}
        </strong>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Livros avaliados
        </p>
      </div>
    </div>
  )
}
