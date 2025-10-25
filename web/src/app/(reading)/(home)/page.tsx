import { ChartLineUpIcon } from "@phosphor-icons/react/dist/ssr"
import type { Metadata } from "next"
import { Suspense } from "react"
import { SidebarButton } from "@/components/sidebar-button"
import { LastRating } from "./last-rating"
import { LastRatingLoading } from "./last-rating-loading"
import { PopularBooks } from "./popular-books"
import { PopularBooksLoading } from "./popular-books-loading"
import { RecentRatings } from "./recent-ratings"
import { RecentRatingsLoading } from "./recent-ratings-loading"

export const metadata: Metadata = {
  title: "Início",
}

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
          <Suspense fallback={<LastRatingLoading />}>
            <LastRating />
          </Suspense>
          <Suspense fallback={<RecentRatingsLoading />}>
            <RecentRatings />
          </Suspense>
        </main>

        <Suspense fallback={<PopularBooksLoading />}>
          <PopularBooks />
        </Suspense>
      </div>
    </div>
  )
}
