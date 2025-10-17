import { BookOpenIcon, CaretRightIcon } from "@phosphor-icons/react/dist/ssr"
import Image from "next/image"
import Link from "next/link"
import { Rating } from "@/components/rating"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { getPopularBooks } from "@/http/get-popular-books"

export async function PopularBooks() {
  const popularBooksResponse = await getPopularBooks()

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <span>Livros populares</span>
        <Link href="/explore">
          <Button variant="link">
            Ver todos <CaretRightIcon />
          </Button>
        </Link>
      </div>

      <div className="space-y-3">
        {popularBooksResponse.books.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-4 px-8 py-32">
            <BookOpenIcon className="size-16 text-accent" />
            <p className="text-lg text-muted-foreground">
              Nenhum livro encontrado
            </p>
          </div>
        )}

        {popularBooksResponse.books.map((book) => {
          return (
            <Card key={book.id} className="px-5 py-4">
              <div className="flex gap-5">
                <div className="h-[94px] w-[64px] shrink-0 overflow-hidden rounded-sm">
                  <Image
                    className="size-full"
                    src={book.coverUrl}
                    alt=""
                    height={94}
                    width={64}
                  />
                </div>

                <div className="flex w-full flex-col">
                  <h3 className="line-clamp-2 font-bold text-base leading-snug">
                    {book.name}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {book.author}
                  </p>

                  <Rating className="mt-auto" rating={book.rating} />
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
