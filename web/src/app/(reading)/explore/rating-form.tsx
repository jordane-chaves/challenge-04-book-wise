"use client"

import { CheckIcon, XIcon } from "@phosphor-icons/react/dist/ssr"
import { Rating } from "@/components/rating"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { useRatingForm } from "@/contexts/rating-form"

export function RatingForm() {
  const { isShowingRatingForm, hideRatingForm } = useRatingForm()

  if (!isShowingRatingForm) {
    return null
  }

  return (
    <Card>
      <form className="space-y-6">
        <header className="flex items-center gap-4">
          <Avatar size="md">
            <AvatarImage src="http://github.com/jordane-chaves.png" />
            <AvatarFallback>JC</AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <h3 className="font-bold text-base leading-snug">Jordane Chaves</h3>
          </div>

          <Rating className="self-start" size="lg" />
        </header>

        <div className="space-y-3">
          <div className="relative flex">
            <Textarea className="h-40" placeholder="Escreva sua avaliação" />
            <span className="absolute right-2 bottom-1 text-muted-foreground text-xs leading-none">
              0/450
            </span>
          </div>

          <footer className="flex justify-end gap-2">
            <Button type="button" size="icon" onClick={hideRatingForm}>
              <XIcon className="size-6 text-primary" />
              <span className="sr-only">Cancelar</span>
            </Button>
            <Button type="button" size="icon">
              <CheckIcon className="size-6 text-secondary" />
              <span className="sr-only">Avaliar</span>
            </Button>
          </footer>
        </div>
      </form>
    </Card>
  )
}
