"use client"

import { XIcon } from "@phosphor-icons/react/dist/ssr"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import type { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"

export function Dialog(props: ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root {...props} />
}

export function DialogTrigger(
  props: ComponentProps<typeof DialogPrimitive.Trigger>,
) {
  return <DialogPrimitive.Trigger {...props} />
}

export function DialogPortal(
  props: ComponentProps<typeof DialogPrimitive.Portal>,
) {
  return <DialogPrimitive.Portal {...props} />
}

export function DialogOverlay({
  className,
  ...props
}: ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      className={twMerge("fixed inset-0 z-50 bg-black/60", className)}
      {...props}
    />
  )
}

export function DialogContent({
  className,
  children,
  ...props
}: ComponentProps<typeof DialogPrimitive.Content>) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        className={twMerge(
          "-translate-1/2 fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] gap-4 overflow-x-auto rounded-xl bg-background p-6 shadow-xl transition ease-in-out sm:max-w-[516px]",
          className,
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close className="absolute top-4 right-4 rounded-xs text-muted-foreground opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-hidden focus:ring-2 focus:ring-accent focus:ring-offset-2 disabled:pointer-events-none">
          <XIcon className="size-6" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  )
}

export function DialogTitle({
  className,
  ...props
}: ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      className={twMerge(
        "font-bold text-foreground text-lg leading-snug",
        className,
      )}
      {...props}
    />
  )
}

export function DialogDescription({
  className,
  ...props
}: ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      className={twMerge(
        "text-base text-muted-foreground leading-relaxed",
        className,
      )}
      {...props}
    />
  )
}
