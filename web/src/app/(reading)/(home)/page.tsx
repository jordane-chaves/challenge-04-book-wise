import { ChartLineUpIcon } from "@phosphor-icons/react/dist/ssr"
import { LastRating } from "./last-rating"
import { PopularBooks } from "./popular-books"
import { RecentRatings } from "./recent-ratings"

export default function Home() {
  return (
    <div>
      <header className="flex justify-between">
        <div className="flex items-center gap-3">
          <ChartLineUpIcon className="size-8 shrink-0 text-accent" />
          <h1 className="font-bold text-2xl leading-snug">Início</h1>
        </div>
      </header>

      <div className="mt-10 grid grid-cols-[1fr_324px] gap-16">
        <main className="space-y-10">
          <LastRating />
          <RecentRatings />
        </main>

        <PopularBooks />
      </div>
    </div>
  )
}
