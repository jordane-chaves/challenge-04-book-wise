import { BinocularsIcon, BookOpenIcon } from "@phosphor-icons/react/dist/ssr"
import type { Metadata } from "next"
import Image from "next/image"
import { Rating } from "@/components/rating"
import { SidebarButton } from "@/components/sidebar-button"
import { Card } from "@/components/ui/card"
import { SheetTrigger } from "@/components/ui/sheet"
import { fetchCategories } from "@/http/fetch-categories"
import { getReadBooks } from "@/http/get-read-books"
import { searchBooks } from "@/http/search-books"
import { getTokenFromCookie } from "@/lib/sessions"
import { BookDetails } from "./book-details"
import { BookSheet } from "./book-sheet"
import { Categories } from "./categories"
import { SearchForm } from "./search-form"

export const metadata: Metadata = {
  title: "Explorar",
}

export default async function Explore({
  searchParams,
}: {
  searchParams: Promise<{
    categoryId?: string
    q?: string
    selectedBookId?: string
  }>
}) {
  const { categoryId, q: query, selectedBookId } = await searchParams
  const accessToken = await getTokenFromCookie()

  let readBooksIds: string[] = []

  if (accessToken) {
    const readBooksResponse = await getReadBooks({ accessToken })
    readBooksIds = readBooksResponse.booksIds
  }

  const categoriesResponse = await fetchCategories()
  const booksResponse = await searchBooks({ categoryId, query })

  return (
    <div>
      <header className="flex flex-wrap justify-between gap-5">
        <div className="flex items-center gap-3">
          <SidebarButton />
          <BinocularsIcon className="size-8 shrink-0 text-accent" />
          <h1 className="font-bold text-2xl leading-snug">Explorar</h1>
        </div>

        <SearchForm />
      </header>

      <Categories categories={categoriesResponse?.categories ?? []} />

      {booksResponse?.books?.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-4 px-8 py-52">
          <BookOpenIcon className="size-20 text-accent" />
          <p className="text-lg text-muted-foreground">
            Nenhum livro encontrado
          </p>
        </div>
      )}

      <div className="mt-12 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5">
        {booksResponse?.books?.map((book) => {
          const isReadBook = readBooksIds.includes(book.id)

          return (
            <BookSheet key={book.id} bookId={book.id}>
              <SheetTrigger asChild>
                <Card className="cursor-pointer px-5 py-4 ring-card-hover hover:ring-2">
                  <div className="flex w-full gap-5">
                    <div className="h-[94px] w-[64px] shrink-0 overflow-hidden rounded-sm sm:h-[152px] sm:w-[108px]">
                      <Image
                        className="size-full object-cover"
                        src={book.coverUrl}
                        alt=""
                        height={152}
                        width={108}
                      />
                    </div>
                    <div className="flex flex-col overflow-hidden">
                      <p className="line-clamp-2 font-bold text-base leading-snug">
                        {book.name}
                      </p>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {book.author}
                      </p>

                      <Rating className="mt-auto" rating={book.rating} />
                    </div>
                  </div>

                  {isReadBook && (
                    <span className="absolute top-0 right-0 rounded-bl-sm bg-tag px-3 py-1 font-bold text-tag-foreground text-xs uppercase leading-tight">
                      Lido
                    </span>
                  )}
                </Card>
              </SheetTrigger>

              {selectedBookId === book.id && <BookDetails bookId={book.id} />}
            </BookSheet>
          )
        })}
      </div>
    </div>
  )
}
