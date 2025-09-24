import type { ReactNode } from "react"
import { AppSidebar } from "@/components/app-sidebar"

export default function ReadingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <AppSidebar />
      <div className="w-full overflow-auto px-24 py-18">{children}</div>
    </div>
  )
}
