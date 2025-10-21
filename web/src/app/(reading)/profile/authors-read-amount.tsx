import { UserListIcon } from "@phosphor-icons/react/dist/ssr"
import { getAuthorsReadAmount } from "@/http/get-authors-read-amount"
import { getTokenFromCookie } from "@/lib/sessions"

export async function AuthorsReadAmount() {
  const accessToken = await getTokenFromCookie()

  if (!accessToken) {
    return null
  }

  const authorsReadAmountResponse = await getAuthorsReadAmount({ accessToken })

  return (
    <div className="flex items-center gap-5">
      <UserListIcon className="size-8 shrink-0 text-accent" />
      <div>
        <strong className="leading-snug">
          {authorsReadAmountResponse.amount}
        </strong>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Autores lidos
        </p>
      </div>
    </div>
  )
}
