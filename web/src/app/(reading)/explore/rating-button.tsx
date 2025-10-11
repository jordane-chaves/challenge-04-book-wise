"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { useRatingForm } from "@/contexts/rating-form"
import { SignInDialog } from "./sign-in-dialog"

interface RatingButtonProps {
  isAuthenticated: boolean
}

export function RatingButton({ isAuthenticated }: RatingButtonProps) {
  const { showRatingForm } = useRatingForm()

  if (!isAuthenticated) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button type="button" variant="link">
            Avaliar
          </Button>
        </DialogTrigger>
        <SignInDialog />
      </Dialog>
    )
  }

  return (
    <Button onClick={showRatingForm} type="button" variant="link">
      Avaliar
    </Button>
  )
}
