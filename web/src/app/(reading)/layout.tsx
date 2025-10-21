import type { ReactNode } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider } from "@/contexts/sidebar"

export default function ReadingLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden">
        <AppSidebar />
        <div className="w-full overflow-auto px-8 py-6 md:px-24 md:py-18">
          {children}
        </div>
      </div>
    </SidebarProvider>
  )
}
