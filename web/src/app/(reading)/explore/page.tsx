import { BinocularsIcon } from "@phosphor-icons/react/dist/ssr"
import Image from "next/image"
import { Rating } from "@/components/rating"
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
      <header className="flex justify-between">
        <div className="flex items-center gap-3">
          <BinocularsIcon className="size-8 shrink-0 text-accent" />
          <h1 className="font-bold text-2xl leading-snug">Explorar</h1>
        </div>

        <SearchForm />
      </header>

      <Categories categories={categoriesResponse.categories} />

      <div className="mt-12 grid grid-cols-3 gap-5">
        {booksResponse.books.map((book) => {
          const isReadBook = readBooksIds.includes(book.id)

          return (
            <BookSheet key={book.id} bookId={book.id}>
              <SheetTrigger asChild>
                <Card className="cursor-pointer px-5 py-4 ring-card-hover hover:ring-2">
                  <div className="flex w-full gap-5">
                    <div className="h-[152px] w-[108px] shrink-0 overflow-hidden rounded-sm">
                      <Image
                        className="size-full"
                        src={book.coverUrl}
                        alt=""
                        height={152}
                        width={108}
                      />
                    </div>
                    <div className="flex flex-col overflow-hidden">
                      <h1 className="line-clamp-2 font-bold text-base leading-snug">
                        {book.name}
                      </h1>
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
