import { CaretRightIcon } from "@phosphor-icons/react/dist/ssr"
import dayjs from "dayjs"
import Image from "next/image"
import Link from "next/link"
import { Rating } from "@/components/rating"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { getLastRating } from "@/http/get-last-rating"
import type { GetLastRatingResponse } from "@/http/types/get-last-rating-response"
import { getTokenFromCookie } from "@/lib/sessions"

export async function LastRating() {
  const accessToken = await getTokenFromCookie()

  let rating: GetLastRatingResponse["rating"] | null = null

  if (accessToken) {
    const lastRatingResponse = await getLastRating({ accessToken })
    rating = lastRatingResponse.rating
  }

  if (!rating) {
    return null
  }

  const createdAtRelativeFromNow = dayjs(rating.createdAt).fromNow()

  return (
    <section className="space-y-4">
      <div className="flex justify-between">
        <span>Sua última leitura</span>
        <Link href="/profile">
          <Button variant="link">
            Ver todas <CaretRightIcon />
          </Button>
        </Link>
      </div>

      <Card className="bg-card-hover px-6 py-5">
        <div className="flex gap-6">
          <div className="h-[152px] w-[108px] shrink-0 overflow-hidden rounded-sm">
            <Image
              className="size-full"
              src={rating.coverUrl}
              alt=""
              height={152}
              width={108}
            />
          </div>

          <div className="w-full">
            <div className="mb-3 flex justify-between">
              <span className="inline-block first-letter:uppercase">
                {createdAtRelativeFromNow}
              </span>
              <Rating rating={rating.rating} />
            </div>

            <div>
              <h3 className="line-clamp-2 font-bold text-base leading-snug">
                {rating.bookName}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {rating.bookAuthor}
              </p>
            </div>

            <p className="mt-6 line-clamp-2">{rating.description}</p>
          </div>
        </div>
      </Card>
    </section>
  )
}
