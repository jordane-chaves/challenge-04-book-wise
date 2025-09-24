"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import type { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"

interface NavLinkProps extends ComponentProps<typeof Link> {}

export function NavLink({ className, children, ...props }: NavLinkProps) {
  const pathname = usePathname()

  return (
    <Link
      data-active={props.href === pathname}
      className={twMerge(
        "group relative flex items-center gap-3 rounded-xs py-2 font-bold text-base text-gray-400 leading-relaxed outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-accent data-[active=true]:text-foreground [&_svg]:pointer-events-none [&_svg]:size-6",
        className,
      )}
      {...props}
    >
      <div className="-translate-y-1/2 -left-4 absolute top-1/2 h-6 w-1 rounded-full bg-transparent from-gradient-1 to-gradient-2 group-data-[active=true]:bg-gradient-to-b" />
      {children}
    </Link>
  )
}
