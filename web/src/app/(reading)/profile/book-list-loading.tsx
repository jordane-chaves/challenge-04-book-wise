import { Rating } from "@/components/rating"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function BookListLoading() {
  return (
    <div className="space-y-6">
      {Array.from({ length: 2 }).map((_, index) => {
        return (
          <section key={String(index)} className="space-y-2">
            <div>
              <Skeleton className="h-4 w-16" />
            </div>

            <div className="space-y-4">
              <Card className="space-y-6">
                <div className="flex gap-6">
                  <Skeleton className="h-[134px] w-[98px] shrink-0" />

                  <div className="flex w-full flex-col gap-1">
                    <Skeleton className="h-5 w-28" />
                    <Skeleton className="h-4 w-24" />

                    <Rating className="mt-auto" />
                  </div>
                </div>

                <div className="space-y-1">
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-5 w-2/3" />
                </div>
              </Card>
            </div>
          </section>
        )
      })}
    </div>
  )
}
