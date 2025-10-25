import { SignInIcon } from "@phosphor-icons/react/dist/ssr"
import Image from "next/image"
import Link from "next/link"
import logoImg from "@/assets/logo.svg"
import sidebarBackgroundImg from "@/assets/sidebar-background.png"
import { auth } from "@/auth/auth"
import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"
import { Sidebar } from "./sidebar"
import { Button } from "./ui/button"

export async function AppSidebar() {
  const { user } = await auth()

  const isAuthenticated = !!user

  return (
    <Sidebar>
      <div className="relative h-full w-[232px] overflow-hidden rounded-xl">
        <Image
          className="object-cover"
          src={sidebarBackgroundImg}
          alt=""
          sizes="100%"
          quality={100}
          priority
          fill
        />

        <aside className="absolute inset-y-0 z-10 flex w-full flex-col">
          <header className="mx-6 mt-10">
            <Image
              className="mx-auto"
              src={logoImg}
              alt=""
              height={32}
              width={128}
            />
          </header>

          <div className="flex h-full flex-col items-center overflow-y-auto px-6 py-16">
            <NavMain />
          </div>

          <footer className="m-6 mt-auto flex justify-center">
            {isAuthenticated ? (
              <NavUser user={user} />
            ) : (
              <Link
                href="/sign-in"
                className="rounded-xs outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <Button type="button" variant="ghost">
                  Fazer login <SignInIcon className="text-accent" />
                </Button>
              </Link>
            )}
          </footer>
        </aside>
      </div>
    </Sidebar>
  )
}
