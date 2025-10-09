import type { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"

interface BadgeProps extends ComponentProps<"div"> {
  selected?: boolean
}

export function Badge({ className, selected = false, ...props }: BadgeProps) {
  return (
    <div
      data-selected={selected}
      className={twMerge(
        "size-fit shrink-0 select-none rounded-full border border-primary px-4 py-1 text-base text-primary hover:bg-purple-200 hover:text-primary-foreground data-[selected=true]:border-transparent data-[selected=true]:bg-purple-200 data-[selected=true]:text-primary-foreground",
        className,
      )}
      {...props}
    />
  )
}
