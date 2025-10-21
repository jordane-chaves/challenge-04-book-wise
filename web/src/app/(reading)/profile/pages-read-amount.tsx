import { BookOpenIcon } from "@phosphor-icons/react/dist/ssr"
import { getPagesReadAmount } from "@/http/get-pages-read-amount"
import { getTokenFromCookie } from "@/lib/sessions"

export async function PagesReadAmount() {
  const accessToken = await getTokenFromCookie()

  if (!accessToken) {
    return null
  }

  const pagesReadAmountResponse = await getPagesReadAmount({ accessToken })

  return (
    <div className="flex items-center gap-5">
      <BookOpenIcon className="size-8 shrink-0 text-accent" />
      <div>
        <strong className="leading-snug">
          {pagesReadAmountResponse.amount}
        </strong>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Páginas lidas
        </p>
      </div>
    </div>
  )
}
