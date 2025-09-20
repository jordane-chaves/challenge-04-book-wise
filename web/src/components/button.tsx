import type { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"

export function Button({ className, ...props }: ComponentProps<"button">) {
  return (
    <button
      className={twMerge(
        "flex cursor-pointer items-center gap-5 rounded-lg bg-button px-6 py-5 transition-colors hover:bg-button-hover",
        className,
      )}
      type="button"
      {...props}
    />
  )
}
