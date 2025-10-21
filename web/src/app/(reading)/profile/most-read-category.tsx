import { BookmarkSimpleIcon } from "@phosphor-icons/react/dist/ssr"
import { getMostReadCategory } from "@/http/get-most-read-category"
import { getTokenFromCookie } from "@/lib/sessions"

export async function MostReadCategory() {
  const accessToken = await getTokenFromCookie()

  if (!accessToken) {
    return null
  }

  const mostReadCategoryResponse = await getMostReadCategory({ accessToken })

  return (
    <div className="flex items-center gap-5">
      <BookmarkSimpleIcon className="size-8 shrink-0 text-accent" />
      <div>
        <strong className="leading-snug">
          {mostReadCategoryResponse.category ?? "-"}
        </strong>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Categoria mais lida
        </p>
      </div>
    </div>
  )
}
