import { BinocularsIcon } from "@phosphor-icons/react/dist/ssr"
import { Suspense } from "react"
import { Rating } from "@/components/rating"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Categories } from "./categories"
import { SearchForm } from "./search-form"

export default function ExploreLoading() {
  return (
    <div>
      <header className="flex flex-wrap justify-between gap-5">
        <div className="flex items-center gap-3">
          <BinocularsIcon className="size-8 shrink-0 text-accent" />
          <h1 className="font-bold text-2xl leading-snug">Explorar</h1>
        </div>

        <Suspense fallback={null}>
          <SearchForm />
        </Suspense>
      </header>

      <Suspense fallback={null}>
        <Categories categories={[]} />
      </Suspense>

      <div className="mt-12 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5">
        {Array.from({ length: 12 }).map((_, index) => {
          return (
            <Card key={String(index)} className="px-5 py-4">
              <div className="flex w-full gap-5">
                <Skeleton className="h-[94px] w-[64px] shrink-0 sm:h-[152px] sm:w-[108px]" />
                <div className="flex flex-1 flex-col gap-1 overflow-hidden">
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-4 w-24" />

                  <Rating className="mt-auto" />
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
