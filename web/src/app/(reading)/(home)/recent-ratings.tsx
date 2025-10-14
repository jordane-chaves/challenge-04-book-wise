import dayjs from "dayjs"
import Image from "next/image"
import { Rating } from "@/components/rating"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { fetchRecentRatings } from "@/http/fetch-recent-ratings"
import { getInitials } from "@/utils/get-initials"
import { RatingDescription } from "./rating-description"

export async function RecentRatings() {
  const recentRatingsResponse = await fetchRecentRatings()

  return (
    <section className="space-y-4">
      <div className="flex justify-between">
        <span>Avaliações mais recentes</span>
      </div>

      <div className="space-y-3">
        {recentRatingsResponse.ratings.map((rating) => {
          const createdAtRelativeFromNow = dayjs(rating.createdAt).fromNow()

          return (
            <Card key={rating.id} className="space-y-8">
              <header className="flex items-start gap-4">
                <Avatar>
                  {rating.avatarUrl && <AvatarImage src={rating.avatarUrl} />}
                  <AvatarFallback>
                    {getInitials(rating.userName)}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <p className="leading-relaxed">{rating.userName}</p>
                  <span className="inline-block text-muted-foreground text-sm leading-relaxed first-letter:uppercase">
                    {createdAtRelativeFromNow}
                  </span>
                </div>

                <Rating rating={rating.rating} />
              </header>

              <div className="flex gap-5">
                <div className="h-[152px] w-[108px] shrink-0 overflow-hidden rounded-sm">
                  <Image
                    className="size-full"
                    src={rating.coverUrl}
                    alt=""
                    height={152}
                    width={108}
                  />
                </div>

                <div>
                  <div>
                    <h3 className="line-clamp-2 font-bold text-base leading-snug">
                      {rating.bookName}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {rating.bookAuthor}
                    </p>
                  </div>

                  <RatingDescription description={rating.description} />
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
