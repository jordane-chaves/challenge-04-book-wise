"use client"

import type { ReactNode } from "react"
import { useSidebar } from "@/contexts/sidebar"

interface SidebarProps {
  children: ReactNode
}

export function Sidebar({ children }: SidebarProps) {
  const { open, toggleSidebar } = useSidebar()

  return (
    <div data-state={open ? "open" : "closed"} className="group">
      <button
        type="button"
        onClick={toggleSidebar}
        className="fixed inset-0 z-50 bg-black/60 transition-opacity group-data-[state=closed]:translate-x-[-100%] group-data-[state=closed]:opacity-0 group-data-[state=open]:opacity-100 md:hidden"
      />
      <div className="fixed inset-y-0 left-0 z-50 h-dvh shrink-0 py-5 pl-5 transition-[left] group-data-[state=closed]:left-[-100%] group-data-[state=closed]:duration-300 group-data-[state=open]:duration-500 md:relative md:group-data-[state]:left-0">
        {children}
      </div>
    </div>
  )
}
