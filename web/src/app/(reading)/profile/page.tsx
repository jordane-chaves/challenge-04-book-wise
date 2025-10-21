import { UserIcon } from "@phosphor-icons/react/dist/ssr"
import { redirect } from "next/navigation"
import { auth } from "@/auth/auth"
import { SidebarButton } from "@/components/sidebar-button"
import { AuthorsReadAmount } from "./authors-read-amount"
import { BookList } from "./book-list"
import { MostReadCategory } from "./most-read-category"
import { PagesReadAmount } from "./pages-read-amount"
import { RatedBooksAmount } from "./rated-books-amount"
import { SearchForm } from "./search-form"
import { User } from "./user"

export default async function Profile({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q: query } = await searchParams

  const { user } = await auth()
  const isAuthenticated = !!user

  if (!isAuthenticated) {
    redirect("/")
  }

  return (
    <div>
      <header className="flex justify-between">
        <div className="flex items-center gap-3">
          <SidebarButton />
          <UserIcon className="size-8 shrink-0 text-accent" />
          <h1 className="font-bold text-2xl leading-snug">Perfil</h1>
        </div>
      </header>

      <div className="mt-10 grid grid-cols-1 gap-16 lg:grid-cols-[1fr_308px]">
        <main className="space-y-8">
          <SearchForm />
          <BookList query={query} />
        </main>

        <div className="-order-1 h-fit space-y-8 border-border border-b lg:order-none lg:border-b-0 lg:border-l">
          <User />
          <div className="mx-auto h-1 w-8 rounded-full bg-gradient-to-r from-gradient-1 to-gradient-2" />
          <div className="grid grid-cols-2 gap-4 px-8 py-5 md:px-14 lg:grid-cols-1 lg:gap-10">
            <PagesReadAmount />
            <RatedBooksAmount />
            <AuthorsReadAmount />
            <MostReadCategory />
          </div>
        </div>
      </div>
    </div>
  )
}
