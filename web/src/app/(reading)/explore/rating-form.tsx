"use client"

import { CheckIcon, XIcon } from "@phosphor-icons/react/dist/ssr"
import { useActionState, useState } from "react"
import { Rating } from "@/components/rating"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { useRatingForm } from "@/contexts/rating-form"
import { getInitials } from "@/utils/get-initials"
import { rateBookAction } from "./actions"

interface RatingFormProps {
  bookId: string
  user: {
    avatar_url: string | null
    name: string
  }
}

export function RatingForm({ bookId, user }: RatingFormProps) {
  const { isShowingRatingForm, hideRatingForm } = useRatingForm()

  const rateBook = rateBookAction.bind(null, bookId)
  const [formState, formAction, isPending] = useActionState(rateBook, null)

  const [description, setDescription] = useState("")

  if (!isShowingRatingForm) {
    return null
  }

  return (
    <Card>
      <form className="space-y-6" action={formAction}>
        <header className="flex items-center gap-4">
          <Avatar size="md">
            {user.avatar_url && <AvatarImage src={user.avatar_url} />}
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <h3 className="font-bold text-base leading-snug">{user.name}</h3>
          </div>

          <div className="flex max-w-1/2 flex-col items-end gap-1 text-right">
            <Rating name="rating" size="lg" />
            {formState?.errors?.rating && (
              <span className="text-destructive text-sm">
                {formState.errors.rating}
              </span>
            )}
          </div>
        </header>

        {formState?.message && (
          <span className="text-destructive text-sm">{formState.message}</span>
        )}

        <div className="space-y-3">
          <div className="space-y-1">
            <div className="relative flex">
              <Textarea
                name="description"
                className="h-40"
                placeholder="Escreva sua avaliação"
                maxLength={450}
                onChange={(event) => setDescription(event.target.value)}
              />
              <span className="absolute right-2 bottom-1 text-muted-foreground text-xs leading-none">
                {description.length}/450
              </span>
            </div>
            {formState?.errors?.description && (
              <span className="text-destructive text-sm">
                {formState.errors.description}
              </span>
            )}
          </div>

          <footer className="flex justify-end gap-2">
            <Button type="button" size="icon" onClick={hideRatingForm}>
              <XIcon className="size-6 text-primary" />
              <span className="sr-only">Cancelar</span>
            </Button>
            <Button disabled={isPending} type="submit" size="icon">
              <CheckIcon className="size-6 text-secondary" />
              <span className="sr-only">Avaliar</span>
            </Button>
          </footer>
        </div>
      </form>
    </Card>
  )
}
