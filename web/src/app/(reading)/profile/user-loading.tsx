import { Skeleton } from "@/components/ui/skeleton"

export function UserLoading() {
  return (
    <div className="flex flex-col items-center gap-5">
      <Skeleton className="size-16 shrink-0 rounded-full" />

      <div className="flex flex-col items-center space-y-1">
        <Skeleton className="h-7 w-28" />
        <Skeleton className="h-5 w-36" />
      </div>
    </div>
  )
}
