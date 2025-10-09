import clsx from "clsx"
import { twMerge } from "tailwind-merge"
import { Rating } from "@/components/rating"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"

interface RatingCardProps {
  isAuthor?: boolean
}

export function RatingCard({ isAuthor = false }: RatingCardProps) {
  return (
    <Card className={twMerge(clsx("space-y-5", { "bg-card-hover": isAuthor }))}>
      <header className="flex gap-4">
        <Avatar size="md">
          <AvatarImage src="http://github.com/jordane-chaves.png" />
          <AvatarFallback>JC</AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <h3 className="font-bold text-base leading-snug">Jordane Chaves</h3>
          <span className="text-muted-foreground text-sm">Há 2 dias</span>
        </div>

        <Rating className="self-start" rating={4} />
      </header>

      <div className="text-sm">
        <p>
          Nec tempor nunc in egestas. Euismod nisi eleifend at et in sagittis.
          Penatibus id vestibulum imperdiet a at imperdiet lectus leo. Sit porta
          eget nec vitae sit vulputate eget
        </p>
      </div>
    </Card>
  )
}
