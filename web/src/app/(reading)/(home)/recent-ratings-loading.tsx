import { Rating } from "@/components/rating"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function RecentRatingsLoading() {
  return (
    <section className="space-y-4">
      <div className="flex justify-between">
        <span>Avaliações mais recentes</span>
      </div>

      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, index) => {
          return (
            <Card key={String(index)} className="space-y-8">
              <header className="flex items-start gap-4">
                <Skeleton className="size-10 rounded-full" />

                <div className="flex-1 space-y-1">
                  <Skeleton className="h-5 w-28" />
                  <Skeleton className="h-5 w-24" />
                </div>

                <Rating />
              </header>

              <div className="flex gap-5">
                <Skeleton className="h-[94px] w-[64px] shrink-0 sm:h-[152px] sm:w-[108px]" />

                <div className="w-full space-y-4">
                  <div className="space-y-1">
                    <Skeleton className="h-5 w-40" />
                    <Skeleton className="h-5 w-24" />
                  </div>

                  <div className="space-y-1">
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-2/3" />
                  </div>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
