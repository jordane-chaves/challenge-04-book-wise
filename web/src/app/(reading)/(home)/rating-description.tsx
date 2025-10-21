"use client"

import { useState } from "react"

const MAX_DESCRIPTION_CHARS = 100

interface RatingDescriptionProps {
  description: string
}

export function RatingDescription({ description }: RatingDescriptionProps) {
  const [showFullDescription, setShowFullDescription] = useState(false)

  if (description.length > MAX_DESCRIPTION_CHARS && !showFullDescription) {
    return (
      <p className="mt-5 line-clamp-4 text-sm sm:text-base">
        {description.slice(0, MAX_DESCRIPTION_CHARS)}{" "}
        <button
          type="button"
          onClick={() => setShowFullDescription(true)}
          className="inline-block cursor-pointer font-bold text-primary underline-offset-4 hover:underline"
        >
          ver mais
        </button>
      </p>
    )
  }

  return <p className="mt-5 line-clamp-4 text-sm sm:text-base">{description}</p>
}
