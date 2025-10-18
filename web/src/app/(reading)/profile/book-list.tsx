import { BookOpenIcon } from "@phosphor-icons/react/dist/ssr"
import dayjs from "dayjs"
import Image from "next/image"
import { Rating } from "@/components/rating"
import { Card } from "@/components/ui/card"
import { searchUserRatings } from "@/http/search-user-ratings"
import { getTokenFromCookie } from "@/lib/sessions"

interface BookListProps {
  query?: string
}

export async function BookList({ query }: BookListProps) {
  const accessToken = await getTokenFromCookie()

  if (!accessToken) {
    return null
  }

  const searchUserRatingsResponse = await searchUserRatings({
    accessToken,
    query,
  })

  return (
    <div className="space-y-6">
      {Object.keys(searchUserRatingsResponse.ratings).length === 0 && (
        <div className="flex flex-col items-center justify-center gap-4 px-8 py-32">
          <BookOpenIcon className="size-20 text-accent" />
          <p className="text-lg text-muted-foreground">
            Nenhum livro encontrado
          </p>
        </div>
      )}

      {Object.entries(searchUserRatingsResponse.ratings).map(
        ([date, ratings]) => {
          const isSameDay = dayjs(new Date()).diff(date, "days") === 0
          const dateRelativeFromNow = isSameDay ? "Hoje" : dayjs(date).fromNow()

          return (
            <section key={date} className="space-y-2">
              <div>
                <span className="inline-block text-muted-foreground text-sm leading-relaxed first-letter:uppercase">
                  {dateRelativeFromNow}
                </span>
              </div>

              <div className="space-y-4">
                {ratings.map((item) => {
                  return (
                    <Card key={item.id} className="space-y-6">
                      <div className="flex gap-6">
                        <div className="h-[134px] w-[98px] shrink-0 overflow-hidden rounded-sm">
                          <Image
                            className="size-full"
                            src={item.coverUrl}
                            alt=""
                            height={134}
                            width={98}
                          />
                        </div>

                        <div className="flex w-full flex-col">
                          <h3 className="line-clamp-2 font-bold text-lg leading-snug">
                            {item.name}
                          </h3>
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {item.author}
                          </p>

                          <Rating className="mt-auto" rating={item.rating} />
                        </div>
                      </div>

                      <p className="text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </Card>
                  )
                })}
              </div>
            </section>
          )
        },
      )}
    </div>
  )
}
