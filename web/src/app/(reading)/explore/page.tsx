import {
  BinocularsIcon,
  MagnifyingGlassIcon,
} from "@phosphor-icons/react/dist/ssr"
import Image from "next/image"
import { auth } from "@/auth/auth"
import { Badge } from "@/components/badge"
import { Card } from "@/components/card"
import { Input } from "@/components/input"
import { Rating } from "@/components/rating"

interface Book {
  id: string
  coverUrl: string
  name: string
  author: string
  rating: number
}

export const books: Book[] = [
  {
    id: "1",
    name: "A revolução dos bichos",
    author: "George Orwell",
    coverUrl: "/images/a-revolucao-dos-bichos.png",
    rating: 4,
  },
  {
    id: "2",
    name: "14 Hábitos de Desenvolvedores Altamente Produtivos",
    author: "Zeno Rocha",
    coverUrl: "/images/14-habitos-de-desenvolvedores-altamente-produtivos.png",
    rating: 4,
  },
  {
    id: "3",
    name: "O Fim da Eternidade",
    author: "Isaac Asimov",
    coverUrl: "/images/o-fim-da-eternidade.png",
    rating: 4,
  },
  {
    id: "4",
    name: "Entendendo Algoritmos",
    author: "Aditya Bhargava",
    coverUrl: "/images/entendendo-algoritmos.png",
    rating: 4,
  },
  {
    id: "5",
    name: "Código limpo",
    author: "Robert C. Martin",
    coverUrl: "/images/codigo-limpo.png",
    rating: 4,
  },
  {
    id: "6",
    name: "O poder do hábito",
    author: "Charles Duhigg",
    coverUrl: "/images/o-poder-do-habito.png",
    rating: 4,
  },
]

export default async function Explore() {
  const { user } = await auth()

  const isAuthenticated = !!user
  const readBooksIds = [books[1].id, books[3].id]

  return (
    <div>
      <header className="flex justify-between">
        <div className="flex items-center gap-3">
          <BinocularsIcon className="size-8 shrink-0 text-accent" />
          <h1 className="font-bold text-2xl leading-snug">Explorar</h1>
        </div>

        <div className="group relative w-full max-w-sm">
          <Input className="w-full" placeholder="Buscar livro ou autor" />
          <MagnifyingGlassIcon className="-translate-y-1/2 absolute top-1/2 right-5 size-5 select-none text-input group-has-[input:focus]:text-input-hover" />
        </div>
      </header>

      <div className="mt-10 flex flex-wrap items-center gap-3">
        <Badge selected>Tudo</Badge>
        <Badge>Computação</Badge>
        <Badge>Educação</Badge>
        <Badge>Fantasia</Badge>
        <Badge>Ficção científica</Badge>
        <Badge>Horror</Badge>
        <Badge>HQs</Badge>
        <Badge>Suspense</Badge>
      </div>

      <div className="mt-12 grid grid-cols-3 gap-5">
        {books.map((book) => {
          const isReadBook = readBooksIds.includes(book.id)

          return (
            <Card key={book.id} className="px-5 py-4">
              <div className="flex w-full gap-5">
                <div className="h-[152px] w-[108px] shrink-0 overflow-hidden rounded-sm">
                  <Image
                    className="size-full"
                    src={book.coverUrl}
                    alt=""
                    height={152}
                    width={108}
                  />
                </div>
                <div className="flex flex-col overflow-hidden">
                  <h1 className="line-clamp-2 font-bold text-base leading-snug">
                    {book.name}
                  </h1>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {book.author}
                  </p>

                  <Rating className="mt-auto" rating={book.rating} />
                </div>
              </div>

              {isAuthenticated && isReadBook && (
                <span className="absolute top-0 right-0 rounded-bl-sm bg-tag px-3 py-1 font-bold text-tag-foreground text-xs uppercase leading-tight">
                  Lido
                </span>
              )}
            </Card>
          )
        })}
      </div>
    </div>
  )
}
