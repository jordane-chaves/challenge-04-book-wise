import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { cva, type VariantProps } from "class-variance-authority"
import type { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"

const avatarVariants = cva(
  "flex shrink-0 rounded-full bg-gradient-to-b from-gradient-1 to-gradient-2 p-px",
  {
    variants: {
      size: {
        sm: "size-8",
        md: "size-10",
        lg: "size-[4.5rem]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
)

export function Avatar({
  className,
  children,
  size,
  ...props
}: ComponentProps<typeof AvatarPrimitive.Root> &
  VariantProps<typeof avatarVariants>) {
  return (
    <AvatarPrimitive.Root
      className={twMerge(avatarVariants({ className, size }))}
      {...props}
    >
      <div className="relative size-full overflow-hidden rounded-full">
        {children}
      </div>
    </AvatarPrimitive.Root>
  )
}

export function AvatarImage({
  className,
  ...props
}: ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      className={twMerge("aspect-square size-full", className)}
      {...props}
    />
  )
}

export function AvatarFallback({
  className,
  ...props
}: ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      className={twMerge(
        "flex size-full items-center justify-center rounded-full bg-muted",
        className,
      )}
      {...props}
    />
  )
}
