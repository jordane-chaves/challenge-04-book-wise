import { CaretRightIcon } from "@phosphor-icons/react/dist/ssr"
import Image from "next/image"
import Link from "next/link"
import { auth } from "@/auth/auth"
import { Rating } from "@/components/rating"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export async function LastRating() {
  const { user } = await auth()

  const isAuthenticated = !!user

  if (!isAuthenticated) {
    return null
  }

  return (
    <section className="space-y-4">
      <div className="flex justify-between">
        <span>Sua última leitura</span>
        <Link href="/profile">
          <Button variant="link">
            Ver todas <CaretRightIcon />
          </Button>
        </Link>
      </div>

      <Card className="bg-card-hover px-6 py-5">
        <div className="flex gap-6">
          <div className="h-[152px] w-[108px] shrink-0 overflow-hidden rounded-sm">
            <Image
              className="size-full"
              src="http://localhost:3333/public/books/entendendo-algoritmos.png"
              alt=""
              height={152}
              width={108}
            />
          </div>

          <div className="w-full">
            <div className="mb-3 flex justify-between">
              <span>Há 2 dias</span>
              <Rating rating={4} />
            </div>

            <div>
              <h3 className="line-clamp-2 font-bold text-base leading-snug">
                Entendendo Algoritmos
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Aditya Bhargava
              </p>
            </div>

            <p className="mt-6 line-clamp-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
              nulla debitis pariatur vero, omnis earum consectetur eum error nam
              saepe architecto libero, distinctio praesentium incidunt
              doloremque! Fugiat voluptates voluptas nesciunt!
            </p>
          </div>
        </div>
      </Card>
    </section>
  )
}
