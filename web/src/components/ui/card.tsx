import type { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"

export function Card({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={twMerge(
        "relative overflow-hidden rounded-lg bg-card p-6 text-card-foreground",
        className,
      )}
      {...props}
    />
  )
}
