import {
  BookmarkSimpleIcon,
  BookOpenIcon,
  BooksIcon,
  UserListIcon,
} from "@phosphor-icons/react/dist/ssr"
import { Skeleton } from "@/components/ui/skeleton"

export function MetricsLoading() {
  return (
    <div className="grid grid-cols-2 gap-4 px-8 py-5 md:px-14 lg:grid-cols-1 lg:gap-10">
      <div className="flex items-center gap-5">
        <BookOpenIcon className="size-8 shrink-0 text-accent" />
        <div className="space-y-1">
          <Skeleton className="h-5 w-10" />
          <p className="text-muted-foreground text-sm leading-relaxed">
            Páginas lidas
          </p>
        </div>
      </div>

      <div className="flex items-center gap-5">
        <BooksIcon className="size-8 shrink-0 text-accent" />
        <div className="space-y-1">
          <Skeleton className="h-5 w-10" />
          <p className="text-muted-foreground text-sm leading-relaxed">
            Livros avaliados
          </p>
        </div>
      </div>

      <div className="flex items-center gap-5">
        <UserListIcon className="size-8 shrink-0 text-accent" />
        <div className="space-y-1">
          <Skeleton className="h-5 w-10" />
          <p className="text-muted-foreground text-sm leading-relaxed">
            Autores lidos
          </p>
        </div>
      </div>

      <div className="flex items-center gap-5">
        <BookmarkSimpleIcon className="size-8 shrink-0 text-accent" />
        <div className="space-y-1">
          <Skeleton className="h-5 w-22" />
          <p className="text-muted-foreground text-sm leading-relaxed">
            Categoria mais lida
          </p>
        </div>
      </div>
    </div>
  )
}
