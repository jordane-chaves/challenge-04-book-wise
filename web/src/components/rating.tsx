"use client"

import { StarIcon } from "@phosphor-icons/react/dist/ssr"
import { cva, type VariantProps } from "class-variance-authority"
import clsx from "clsx"
import { type ComponentProps, useId, useState } from "react"
import { twMerge } from "tailwind-merge"

const STARS_COUNT = 5

const options = Array.from(
  { length: STARS_COUNT * 2 },
  (_, index) => index + 1,
).map((option) => {
  return option / 2
})

const ratingVariants = cva(
  "inline-flex w-fit shrink-0 rounded-sm p-0.5 text-primary ring-inset has-focus-visible:ring-2",
  {
    variants: {
      size: {
        sm: "[&_label]:h-4 [&_label]:w-2 [&_svg]:size-4",
        md: "[&_label]:h-5 [&_label]:w-2.5 [&_svg]:size-5",
        lg: "[&_label]:h-7 [&_label]:w-3.5 [&_svg]:size-7",
      },
    },

    defaultVariants: {
      size: "sm",
    },
  },
)

type RatingProps = ComponentProps<"div"> &
  VariantProps<typeof ratingVariants> & {
    name?: string
    rating?: number
    onRatingChange?: (rating: number) => void
  }

export function Rating({
  className,
  name: inputName,
  rating,
  size,
  onRatingChange = () => null,
  ...props
}: RatingProps) {
  const [value, setValue] = useState(rating)

  const nameId = useId()
  const name = inputName ?? `rating-${nameId}`

  function handleRatingChange(rating: number) {
    setValue(rating)
    onRatingChange(rating)
  }

  return (
    <div className={twMerge(ratingVariants({ className, size }))} {...props}>
      {options.map((option, index) => {
        const isEvenOption = index % 2 === 0

        return (
          <label
            key={option}
            className={twMerge(
              clsx(
                "group relative cursor-pointer overflow-hidden [&_svg]:right-0",
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
              value={option}
              checked={value === option}
              onChange={() => handleRatingChange(option)}
            />

            <StarIcon className="absolute block select-none group-has-[input:checked]:hidden group-has-[~_label_input:checked]:hidden" />
            <StarIcon
              className="absolute hidden select-none group-has-[input:checked]:block group-has-[~_label_input:checked]:block"
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
