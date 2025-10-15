import Image from "next/image"
import { Rating } from "@/components/rating"
import { Card } from "@/components/ui/card"

export function BookList() {
  return (
    <div className="space-y-6">
      <section className="space-y-2">
        <div>
          <span className="text-muted-foreground text-sm leading-relaxed">
            Há 2 dias
          </span>
        </div>

        <div className="space-y-4">
          <Card className="space-y-6">
            <div className="flex gap-6">
              <div className="h-[134px] w-[98px] shrink-0 overflow-hidden rounded-sm">
                <Image
                  className="size-full"
                  src="http://localhost:3333/public/books/entendendo-algoritmos.png"
                  alt=""
                  height={134}
                  width={98}
                />
              </div>

              <div className="flex w-full flex-col">
                <h3 className="line-clamp-2 font-bold text-lg leading-snug">
                  Entendendo Algoritmos
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Aditya Bhargava
                </p>

                <Rating className="mt-auto" rating={4} />
              </div>
            </div>

            <p className="text-sm leading-relaxed">
              Tristique massa sed enim lacinia odio. Congue ut faucibus nunc
              vitae non. Nam feugiat vel morbi viverra vitae mi. Vitae fringilla
              ut et suspendisse enim suspendisse vitae. Leo non eget lacus
              sollicitudin tristique pretium quam. Mollis et luctus amet sed
              convallis varius massa sagittis. Proin sed proin at leo quis ac
              sem. Nam donec accumsan curabitur amet tortor quam sit. Bibendum
              enim sit dui lorem urna amet elit rhoncus ut. Aliquet euismod
              vitae ut turpis. Aliquam amet integer pellentesque.
            </p>
          </Card>
        </div>
      </section>

      <section className="space-y-2">
        <div>
          <span className="text-muted-foreground text-sm leading-relaxed">
            Há 4 meses
          </span>
        </div>

        <div className="space-y-4">
          <Card className="space-y-6">
            <div className="flex gap-6">
              <div className="h-[134px] w-[98px] shrink-0 overflow-hidden rounded-sm">
                <Image
                  className="size-full"
                  src="http://localhost:3333/public/books/o-hobbit.png"
                  alt=""
                  height={134}
                  width={98}
                />
              </div>

              <div className="flex w-full flex-col">
                <h3 className="line-clamp-2 font-bold text-lg leading-snug">
                  O Hobbit
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  J.R.R. Tolkien
                </p>

                <Rating className="mt-auto" rating={4} />
              </div>
            </div>

            <p className="text-sm leading-relaxed">
              Nec tempor nunc in egestas. Euismod nisi eleifend at et in
              sagittis. Penatibus id vestibulum imperdiet a at imperdiet.
            </p>
          </Card>
        </div>
      </section>
    </div>
  )
}
