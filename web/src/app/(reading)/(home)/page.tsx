import { ChartLineUpIcon } from "@phosphor-icons/react/dist/ssr"
import { SidebarButton } from "@/components/sidebar-button"
import { LastRating } from "./last-rating"
import { PopularBooks } from "./popular-books"
import { RecentRatings } from "./recent-ratings"

export default function Home() {
  return (
    <div>
      <header className="flex justify-between">
        <div className="flex items-center gap-3">
          <SidebarButton />
          <ChartLineUpIcon className="size-8 shrink-0 text-accent" />
          <h1 className="font-bold text-2xl leading-snug">Início</h1>
        </div>
      </header>

      <div className="mt-10 grid grid-cols-1 gap-16 lg:grid-cols-[1fr_324px]">
        <main className="order-2 space-y-10 lg:order-none">
          <LastRating />
          <RecentRatings />
        </main>

        <PopularBooks />
      </div>
    </div>
  )
}
