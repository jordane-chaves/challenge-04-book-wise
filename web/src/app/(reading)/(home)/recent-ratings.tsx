import Image from "next/image"
import { Rating } from "@/components/rating"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"

export function RecentRatings() {
  return (
    <section className="space-y-4">
      <div className="flex justify-between">
        <span>Avaliações mais recentes</span>
      </div>

      <div className="space-y-3">
        <Card className="space-y-8">
          <header className="flex items-start gap-4">
            <Avatar>
              <AvatarImage src="https://github.com/jordane-chaves.png" />
              <AvatarFallback>JC</AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <p className="leading-relaxed">Jordane Chaves</p>
              <span className="text-muted-foreground text-sm leading-relaxed">
                Hoje
              </span>
            </div>

            <Rating rating={4} />
          </header>

          <div className="flex gap-5">
            <div className="h-[152px] w-[108px] shrink-0 overflow-hidden rounded-sm">
              <Image
                className="size-full"
                src="http://localhost:3333/public/books/o-hobbit.png"
                alt=""
                height={152}
                width={108}
              />
            </div>

            <div>
              <div>
                <h3 className="line-clamp-2 font-bold text-base leading-snug">
                  O Hobbit
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  J.R.R. Tolkien
                </p>
              </div>

              <p className="mt-5 line-clamp-4">
                Semper et sapien proin vitae nisi. Feugiat neque integer donec
                et aenean posuere amet ultrices. Cras fermentum id pulvinar
                varius leo a in. Amet libero pharetra nunc elementum fringilla
                velit ipsum. Sed vulputate massa velit nibh...{" "}
                <span className="font-bold text-primary">ver mais</span>
              </p>
            </div>
          </div>
        </Card>

        <Card className="space-y-8">
          <header className="flex items-start gap-4">
            <Avatar>
              <AvatarImage src="https://github.com/jordane-chaves.png" />
              <AvatarFallback>JC</AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <p className="leading-relaxed">Jordane Chaves</p>
              <span className="text-muted-foreground text-sm leading-relaxed">
                Hoje
              </span>
            </div>

            <Rating rating={4} />
          </header>

          <div className="flex gap-5">
            <div className="h-[152px] w-[108px] shrink-0 overflow-hidden rounded-sm">
              <Image
                className="size-full"
                src="http://localhost:3333/public/books/o-guia-do-mochileiro-das-galaxias.png"
                alt=""
                height={152}
                width={108}
              />
            </div>

            <div>
              <div>
                <h3 className="line-clamp-2 font-bold text-base leading-snug">
                  O guia do mochileiro das galáxias
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Douglas Adams
                </p>
              </div>

              <p className="mt-5 line-clamp-4">
                Nec tempor nunc in egestas. Euismod nisi eleifend at et in
                sagittis. Penatibus id vestibulum imperdiet a at imperdiet
                lectus leo. Sit porta eget nec vitae sit vulputate eget
              </p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
