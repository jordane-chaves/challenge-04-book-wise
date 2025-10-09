import type { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"

export function Input({ className, ...props }: ComponentProps<"input">) {
  return (
    <input
      className={twMerge(
        "rounded-sm border border-input bg-background px-5 py-3.5 text-foreground text-sm leading-5 outline-none placeholder:text-muted-foreground focus-visible:border-input-hover",
        className,
      )}
      {...props}
    />
  )
}
