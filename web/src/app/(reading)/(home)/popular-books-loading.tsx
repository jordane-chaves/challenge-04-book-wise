import { CaretRightIcon } from "@phosphor-icons/react/dist/ssr"
import { Rating } from "@/components/rating"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function PopularBooksLoading() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <span>Livros populares</span>

        <Button disabled variant="link">
          Ver todos <CaretRightIcon />
        </Button>
      </div>

      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, index) => {
          return (
            <Card key={String(index)} className="px-5 py-4">
              <div className="flex gap-5">
                <Skeleton className="h-[94px] w-[64px] shrink-0" />

                <div className="flex w-full flex-col gap-1">
                  <Skeleton className="h-5" />
                  <Skeleton className="h-4 w-32" />

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
