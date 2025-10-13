import { CaretRightIcon } from "@phosphor-icons/react/dist/ssr"
import Image from "next/image"
import Link from "next/link"
import { Rating } from "@/components/rating"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export function PopularBooks() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <span>Livros populares</span>
        <Link href="/explore">
          <Button variant="link">
            Ver todos <CaretRightIcon />
          </Button>
        </Link>
      </div>

      <div className="space-y-3">
        <Card className="px-5 py-4">
          <div className="flex gap-5">
            <div className="h-[94px] w-[64px] shrink-0 overflow-hidden rounded-sm">
              <Image
                className="size-full"
                src="http://localhost:3333/public/books/a-revolucao-dos-bichos.png"
                alt=""
                height={94}
                width={64}
              />
            </div>

            <div className="flex w-full flex-col">
              <h3 className="line-clamp-2 font-bold text-base leading-snug">
                A revolução dos bichos
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                George Orwell
              </p>

              <Rating className="mt-auto" rating={4} />
            </div>
          </div>
        </Card>

        <Card className="px-5 py-4">
          <div className="flex gap-5">
            <div className="h-[94px] w-[64px] shrink-0 overflow-hidden rounded-sm">
              <Image
                className="size-full"
                src="http://localhost:3333/public/books/14-habitos-de-desenvolvedores-altamente-produtivos.png"
                alt=""
                height={94}
                width={64}
              />
            </div>

            <div className="flex w-full flex-col">
              <h3 className="line-clamp-2 font-bold text-base leading-snug">
                14 Hábitos de Desenvolvedores Altamente Produtivos
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Zeno Rocha
              </p>

              <Rating className="mt-auto" rating={4} />
            </div>
          </div>
        </Card>

        <Card className="px-5 py-4">
          <div className="flex gap-5">
            <div className="h-[94px] w-[64px] shrink-0 overflow-hidden rounded-sm">
              <Image
                className="size-full"
                src="http://localhost:3333/public/books/o-fim-da-eternidade.png"
                alt=""
                height={94}
                width={64}
              />
            </div>

            <div className="flex w-full flex-col">
              <h3 className="line-clamp-2 font-bold text-base leading-snug">
                O Fim da Eternidade
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Isaac Asimov
              </p>

              <Rating className="mt-auto" rating={4} />
            </div>
          </div>
        </Card>

        <Card className="px-5 py-4">
          <div className="flex gap-5">
            <div className="h-[94px] w-[64px] shrink-0 overflow-hidden rounded-sm">
              <Image
                className="size-full"
                src="http://localhost:3333/public/books/entendendo-algoritmos.png"
                alt=""
                height={94}
                width={64}
              />
            </div>

            <div className="flex w-full flex-col">
              <h3 className="line-clamp-2 font-bold text-base leading-snug">
                Entendendo Algoritmos
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Aditya Bhargava
              </p>

              <Rating className="mt-auto" rating={4} />
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
