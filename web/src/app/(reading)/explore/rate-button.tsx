"use client"

import { Button } from "@/components/ui/button"
import { useRatingForm } from "@/contexts/rating-form"

export function RateButton() {
  const { showRatingForm } = useRatingForm()

  return (
    <Button onClick={showRatingForm} type="button" variant="link">
      Avaliar
    </Button>
  )
}
