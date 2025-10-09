import type { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"

export function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return (
    <textarea
      className={twMerge(
        "min-h-16 w-full resize-none rounded-sm border border-input bg-background px-5 py-3.5 text-foreground text-sm leading-relaxed outline-none placeholder:text-muted-foreground focus-visible:border-input-hover",
        className,
      )}
      {...props}
    />
  )
}
