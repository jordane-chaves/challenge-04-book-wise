"use client"

import { createContext, type ReactNode, useContext, useState } from "react"

interface SidebarContextProps {
  open: boolean
  toggleSidebar: () => void
}

const SidebarContext = createContext<SidebarContextProps | null>(null)

interface SidebarProvider {
  children: ReactNode
}

export function SidebarProvider({ children }: SidebarProvider) {
  const [open, setOpen] = useState(false)

  function toggleSidebar() {
    setOpen((state) => !state)
  }

  return (
    <SidebarContext.Provider value={{ open, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  )
}

export function useSidebar() {
  const context = useContext(SidebarContext)

  if (!context) {
    throw new Error("useSidebar must be used within SidebarProvider.")
  }

  return context
}
