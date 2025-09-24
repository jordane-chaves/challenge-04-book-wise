import {
  BinocularsIcon,
  ChartLineUpIcon,
  UserIcon,
} from "@phosphor-icons/react/dist/ssr"
import { NavLink } from "./nav-link"

export function NavMain() {
  const isAuthenticated = true

  return (
    <nav className="flex flex-col gap-4">
      <NavLink href="/">
        <ChartLineUpIcon />
        Início
      </NavLink>
      <NavLink href="/explore">
        <BinocularsIcon />
        Explorar
      </NavLink>
      {isAuthenticated && (
        <NavLink href="/profile">
          <UserIcon />
          Perfil
        </NavLink>
      )}
    </nav>
  )
}
