import { CaretRightIcon } from "@phosphor-icons/react/dist/ssr"
import { Rating } from "@/components/rating"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { getTokenFromCookie } from "@/lib/sessions"

export async function LastRatingLoading() {
  const accessToken = await getTokenFromCookie()

  if (!accessToken) {
    return null
  }

  return (
    <section className="space-y-4">
      <div className="flex justify-between">
        <span>Sua última leitura</span>

        <Button disabled variant="link">
          Ver todas <CaretRightIcon />
        </Button>
      </div>

      <Card className="bg-card-hover px-5 py-4 sm:px-6 sm:py-5">
        <div className="flex gap-6">
          <Skeleton className="h-[94px] w-[64px] shrink-0 bg-muted-foreground sm:h-[152px] sm:w-[108px]" />

          <div className="flex-1 space-y-4">
            <div className="mb-3 flex justify-between">
              <Skeleton className="h-5 w-30 bg-muted-foreground" />
              <Rating />
            </div>

            <div className="w-full space-y-1">
              <Skeleton className="h-5 w-28 bg-muted-foreground" />
              <Skeleton className="h-5 w-36 bg-muted-foreground" />
            </div>

            <div className="space-y-1">
              <Skeleton className="h-5 w-full bg-muted-foreground" />
              <Skeleton className="h-5 w-2/3 bg-muted-foreground" />
            </div>
          </div>
        </div>
      </Card>
    </section>
  )
}
