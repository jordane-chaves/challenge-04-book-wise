import {
  BookmarkSimpleIcon,
  BookOpenIcon,
} from "@phosphor-icons/react/dist/ssr"
import Image from "next/image"
import { auth } from "@/auth/auth"
import { Rating } from "@/components/rating"
import { Card } from "@/components/ui/card"
import {
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet"
import { RatingFormProvider } from "@/contexts/rating-form"
import { fetchBookRatings } from "@/http/fetch-book-ratings"
import { getBookDetails } from "@/http/get-book-details"
import { getReadBooks } from "@/http/get-read-books"
import { getTokenFromCookie } from "@/lib/sessions"
import { RatingButton } from "./rating-button"
import { RatingCard } from "./rating-card"
import { RatingForm } from "./rating-form"

interface BookDetailsProps {
  bookId: string
}

export async function BookDetails({ bookId }: BookDetailsProps) {
  const { user } = await auth()
  const accessToken = await getTokenFromCookie()

  const { book } = await getBookDetails({ bookId })
  const { ratings } = await fetchBookRatings({ bookId })

  let readBooksIds: string[] = []

  if (accessToken) {
    const readBooksResponse = await getReadBooks({ accessToken })
    readBooksIds = readBooksResponse.booksIds
  }

  const isAuthenticated = !!user
  const isReadBook = readBooksIds.includes(bookId)

  return (
    <SheetContent>
      <Card className="min-h-max space-y-10 px-8 py-6">
        <div className="flex gap-8">
          <div className="size-full max-h-[242px] max-w-[172px] overflow-hidden rounded-[10px]">
            <Image
              className="size-auto object-cover"
              src={book.coverUrl}
              alt=""
              height={242}
              width={172}
            />
          </div>

          <div className="flex flex-col justify-between">
            <header>
              <SheetTitle>{book.name}</SheetTitle>
              <SheetDescription>{book.author}</SheetDescription>
            </header>

            <div>
              <Rating className="-ml-1" rating={book.rating} size="md" />
              <p className="text-muted-foreground text-sm">
                {book.ratingCount} avaliações
              </p>
            </div>
          </div>
        </div>

        <footer className="flex gap-14 border-border border-t pt-6">
          <div className="flex items-center gap-4 px-1">
            <BookmarkSimpleIcon className="size-6 text-accent" />
            <div>
              <p className="text-sm">Categoria</p>
              <strong className="leading-snug">
                {book.categories.join(", ")}
              </strong>
            </div>
          </div>

          <div className="flex items-center gap-4 px-1">
            <BookOpenIcon className="size-6 text-accent" />
            <div>
              <p className="text-sm">Páginas</p>
              <strong className="leading-snug">{book.totalPages}</strong>
            </div>
          </div>
        </footer>
      </Card>

      <RatingFormProvider>
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <span>Avaliações</span>
            {!isReadBook && <RatingButton isAuthenticated={isAuthenticated} />}
          </div>

          <div className="space-y-3">
            {isAuthenticated && !isReadBook && (
              <RatingForm bookId={bookId} user={user} />
            )}

            {ratings.map((rating) => {
              return (
                <RatingCard
                  key={rating.id}
                  isAuthor={rating.userId === user?.id}
                  rating={rating}
                />
              )
            })}
          </div>
        </div>
      </RatingFormProvider>
    </SheetContent>
  )
}
