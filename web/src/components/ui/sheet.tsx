"use client"

import { XIcon } from "@phosphor-icons/react/dist/ssr"
import * as SheetPrimitive from "@radix-ui/react-dialog"
import type { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"

export function Sheet(props: ComponentProps<typeof SheetPrimitive.Root>) {
  return <SheetPrimitive.Root {...props} />
}

export function SheetTrigger(
  props: ComponentProps<typeof SheetPrimitive.Trigger>,
) {
  return <SheetPrimitive.Trigger {...props} />
}

export function SheetPortal(
  props: ComponentProps<typeof SheetPrimitive.Portal>,
) {
  return <SheetPrimitive.Portal {...props} />
}

export function SheetOverlay({
  className,
  ...props
}: ComponentProps<typeof SheetPrimitive.Overlay>) {
  return (
    <SheetPrimitive.Overlay
      className={twMerge("fixed inset-0 z-50 bg-black/60", className)}
      {...props}
    />
  )
}

export function SheetContent({
  className,
  children,
  ...props
}: ComponentProps<typeof SheetPrimitive.Content>) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        className={twMerge(
          "fixed inset-y-0 right-0 z-50 flex h-full flex-col gap-10 overflow-x-auto bg-background px-8 py-12 shadow-xl transition ease-in-out sm:w-3/4 sm:max-w-[660px] sm:px-12 sm:py-16",
          className,
        )}
        {...props}
      >
        {children}
        <SheetPrimitive.Close className="absolute top-3 right-3 rounded-xs text-muted-foreground opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-hidden focus:ring-2 focus:ring-accent focus:ring-offset-2 disabled:pointer-events-none sm:top-6 sm:right-6">
          <XIcon className="size-6" />
          <span className="sr-only">Close</span>
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPortal>
  )
}

export function SheetTitle({
  className,
  ...props
}: ComponentProps<typeof SheetPrimitive.Title>) {
  return (
    <SheetPrimitive.Title
      className={twMerge(
        "font-bold text-foreground text-lg leading-snug",
        className,
      )}
      {...props}
    />
  )
}

export function SheetDescription({
  className,
  ...props
}: ComponentProps<typeof SheetPrimitive.Description>) {
  return (
    <SheetPrimitive.Description
      className={twMerge(
        "text-base text-muted-foreground leading-relaxed",
        className,
      )}
      {...props}
    />
  )
}
