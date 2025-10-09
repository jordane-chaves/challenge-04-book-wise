import { cva, type VariantProps } from "class-variance-authority"
import type { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"

const buttonVariants = cva(
  "inline-flex shrink-0 not-disabled:cursor-pointer items-center rounded-lg font-bold text-base text-button-foreground outline-none transition-all focus-visible:ring-2 focus-visible:ring-accent [&_svg:not([class*='size-'])]:size-5 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-button text-lg hover:bg-button-hover",
        ghost: "bg-transparent hover:bg-button-foreground/5",
        link: "text-primary hover:bg-primary/6",
      },
      size: {
        default: "gap-3 p-1 px-2",
        lg: "gap-5 px-6 py-5",
        icon: "rounded-sm p-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export function Button({
  className,
  variant,
  size,
  ...props
}: ComponentProps<"button"> & VariantProps<typeof buttonVariants>) {
  return (
    <button
      className={twMerge(buttonVariants({ className, variant, size }))}
      type="button"
      {...props}
    />
  )
}
