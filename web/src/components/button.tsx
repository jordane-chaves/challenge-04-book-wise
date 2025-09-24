import { cva, type VariantProps } from "class-variance-authority"
import type { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"

const buttonVariants = cva(
  "inline-flex shrink-0 not-disabled:cursor-pointer items-center rounded-lg font-bold text-base text-button-foreground outline-none transition-all focus-visible:ring-2 focus-visible:ring-accent [&_svg:not([class*='size-'])]:size-5 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "gap-5 bg-button px-6 py-5 text-lg hover:bg-button-hover",
        link: "gap-3 bg-transparent p-1 px-2 hover:bg-button-foreground/5",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export function Button({
  className,
  variant,
  ...props
}: ComponentProps<"button"> & VariantProps<typeof buttonVariants>) {
  return (
    <button
      className={twMerge(buttonVariants({ className, variant }))}
      type="button"
      {...props}
    />
  )
}
