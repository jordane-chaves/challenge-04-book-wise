"use client"

import { StarIcon } from "@phosphor-icons/react/dist/ssr"
import clsx from "clsx"
import { type ComponentProps, useId } from "react"
import { twMerge } from "tailwind-merge"

const STARS_COUNT = 5

const options = Array.from(
  { length: STARS_COUNT * 2 },
  (_, index) => index + 1,
).map((option) => {
  return option / 2
})

interface RatingProps extends ComponentProps<"div"> {
  rating?: number
  onRatingChange?: (rating: number) => void
}

export function Rating({
  className,
  rating,
  onRatingChange = () => null,
  ...props
}: RatingProps) {
  const name = `rating-${useId()}`

  return (
    <div
      className={twMerge(
        "inline-flex w-fit shrink-0 rounded-sm p-0.5 text-primary ring-inset has-focus-visible:ring-2",
        className,
      )}
      {...props}
    >
      {options.map((option, index) => {
        const isEvenOption = index % 2 === 0

        return (
          <label
            key={option}
            className={twMerge(
              clsx(
                "group relative h-4 w-2 cursor-pointer overflow-hidden [&_svg]:right-0",
                {
                  "[&_svg]:left-0": isEvenOption,
                },
              ),
            )}
          >
            <input
              className="sr-only"
              type="radio"
              name={name}
              checked={rating === option}
              onChange={() => onRatingChange(option)}
            />

            <StarIcon className="absolute block size-4 select-none group-has-[input:checked]:hidden group-has-[~_label_input:checked]:hidden" />
            <StarIcon
              className="absolute hidden size-4 select-none group-has-[input:checked]:block group-has-[~_label_input:checked]:block"
              weight="fill"
            />

            <span className="sr-only">
              {option} star{option === 1 ? "" : "s"}
            </span>
          </label>
        )
      })}
    </div>
  )
}
