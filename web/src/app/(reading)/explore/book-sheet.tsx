"use client"

import { useRouter, useSearchParams } from "next/navigation"
import type { ReactNode } from "react"
import { Sheet } from "@/components/ui/sheet"

interface BookSheetProps {
  bookId: string
  children: ReactNode
}

export function BookSheet({ bookId, children }: BookSheetProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  function handleOpenChange(open: boolean) {
    const url = new URL(window.location.href)

    if (open) {
      url.searchParams.set("selectedBookId", bookId)
    } else {
      url.searchParams.delete("selectedBookId")
    }

    router.push(url.toString())
  }

  const selectedBookId = searchParams.get("selectedBookId")
  const isSelectedBook = selectedBookId === bookId

  return (
    <Sheet open={isSelectedBook} onOpenChange={handleOpenChange}>
      {children}
    </Sheet>
  )
}
