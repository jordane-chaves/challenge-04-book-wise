"use client"

import { SidebarSimpleIcon } from "@phosphor-icons/react/dist/ssr"
import { useSidebar } from "@/contexts/sidebar"
import { Button } from "./ui/button"

export function SidebarButton() {
  const { toggleSidebar } = useSidebar()

  return (
    <Button
      className="md:hidden"
      variant="ghost"
      size="icon"
      onClick={toggleSidebar}
    >
      <SidebarSimpleIcon />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  )
}
