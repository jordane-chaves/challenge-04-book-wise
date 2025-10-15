import { UserIcon } from "@phosphor-icons/react/dist/ssr"
import { redirect } from "next/navigation"
import { auth } from "@/auth/auth"
import { AuthorsReadAmount } from "./authors-read-amount"
import { BookList } from "./book-list"
import { BooksReviewedAmount } from "./books-reviewed-amount"
import { MostReadCategory } from "./most-read-category"
import { PagesReadAmount } from "./pages-read-amount"
import { SearchForm } from "./search-form"
import { User } from "./user"

export default async function Profile() {
  const { user } = await auth()
  const isAuthenticated = !!user

  if (!isAuthenticated) {
    redirect("/")
  }

  return (
    <div>
      <header className="flex justify-between">
        <div className="flex items-center gap-3">
          <UserIcon className="size-8 shrink-0 text-accent" />
          <h1 className="font-bold text-2xl leading-snug">Perfil</h1>
        </div>
      </header>

      <div className="mt-10 grid grid-cols-[1fr_308px] gap-16">
        <main className="space-y-8">
          <SearchForm />
          <BookList />
        </main>

        <div className="h-fit space-y-8 border-border border-l">
          <User />
          <div className="mx-auto h-1 w-8 rounded-full bg-gradient-to-r from-gradient-1 to-gradient-2" />
          <div className="space-y-10 px-14 py-5">
            <PagesReadAmount />
            <BooksReviewedAmount />
            <AuthorsReadAmount />
            <MostReadCategory />
          </div>
        </div>
      </div>
    </div>
  )
}
