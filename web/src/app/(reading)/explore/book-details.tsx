import {
  BookmarkSimpleIcon,
  BookOpenIcon,
} from "@phosphor-icons/react/dist/ssr"
import Image from "next/image"
import { auth } from "@/auth/auth"
import { Rating } from "@/components/rating"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import {
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet"
import { RatingFormProvider } from "@/contexts/rating-form"
import { RateButton } from "./rate-button"
import { RatingCard } from "./rating-card"
import { RatingForm } from "./rating-form"
import { SignInDialog } from "./sign-in-dialog"

export async function BookDetails() {
  const { user } = await auth()

  const isAuthenticated = !!user

  return (
    <SheetContent>
      <Card className="min-h-max space-y-10 px-8 py-6">
        <div className="flex gap-8">
          <div className="size-full max-h-[242px] max-w-[172px] overflow-hidden rounded-[10px]">
            <Image
              className="size-auto object-cover"
              src="http://localhost:3333/public/books/14-habitos-de-desenvolvedores-altamente-produtivos.png"
              alt=""
              height={242}
              width={172}
            />
          </div>

          <div className="flex flex-col justify-between">
            <header>
              <SheetTitle>
                14 Hábitos de Desenvolvedores Altamente Produtivos
              </SheetTitle>
              <SheetDescription>Zeno Rocha</SheetDescription>
            </header>

            <div>
              <Rating className="-ml-1" rating={4} size="md" />
              <p className="text-muted-foreground text-sm">3 avaliações</p>
            </div>
          </div>
        </div>

        <footer className="flex gap-14 border-border border-t pt-6">
          <div className="flex items-center gap-4 px-1">
            <BookmarkSimpleIcon className="size-6 text-accent" />
            <div>
              <p className="text-sm">Categoria</p>
              <strong className="leading-snug">Computação, educação</strong>
            </div>
          </div>

          <div className="flex items-center gap-4 px-1">
            <BookOpenIcon className="size-6 text-accent" />
            <div>
              <p className="text-sm">Páginas</p>
              <strong className="leading-snug">160</strong>
            </div>
          </div>
        </footer>
      </Card>

      <RatingFormProvider>
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <span>Avaliações</span>

            {isAuthenticated ? (
              <RateButton />
            ) : (
              <Dialog>
                <DialogTrigger asChild>
                  <Button type="button" variant="link">
                    Avaliar
                  </Button>
                </DialogTrigger>
                <SignInDialog />
              </Dialog>
            )}
          </div>

          <div className="space-y-3">
            {isAuthenticated && <RatingForm />}
            <RatingCard isAuthor />
            <RatingCard />
            <RatingCard />
          </div>
        </div>
      </RatingFormProvider>
    </SheetContent>
  )
}
