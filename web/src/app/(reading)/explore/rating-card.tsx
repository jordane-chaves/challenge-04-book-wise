import clsx from "clsx"
import dayjs from "dayjs"
import { twMerge } from "tailwind-merge"
import { Rating } from "@/components/rating"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { getInitials } from "@/utils/get-initials"

interface RatingCardProps {
  rating: {
    user: string
    avatarUrl: string | null
    description: string
    rating: number
    createdAt: string
  }
  isAuthor?: boolean
}

export function RatingCard({ rating, isAuthor = false }: RatingCardProps) {
  const createdAtRelativeFromNow = dayjs(rating.createdAt).fromNow()

  return (
    <Card className={twMerge(clsx("space-y-5", { "bg-card-hover": isAuthor }))}>
      <header className="flex gap-4">
        <Avatar size="md">
          {rating.avatarUrl && (
            <AvatarImage src={rating.avatarUrl} alt={rating.user} />
          )}
          <AvatarFallback>{getInitials(rating.user)}</AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <h3 className="font-bold text-base leading-snug">{rating.user}</h3>
          <span className="inline-block text-muted-foreground text-sm first-letter:uppercase">
            {createdAtRelativeFromNow}
          </span>
        </div>

        <Rating className="self-start" rating={rating.rating} />
      </header>

      <div className="text-sm">
        <p>{rating.description}</p>
      </div>
    </Card>
  )
}
