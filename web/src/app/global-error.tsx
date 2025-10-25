"use client"

import { Card } from "@/components/ui/card"
import "./globals.css"
import { FileXIcon } from "@phosphor-icons/react/dist/ssr"
import { Button } from "@/components/ui/button"

export default function GlobalError() {
  return (
    <html lang="pt-BR">
      <body className="flex min-h-screen w-full items-center justify-center bg-background p-8 text-foreground">
        <Card className="space-y-8 text-center">
          <div className="space-y-2">
            <FileXIcon className="mx-auto size-16 text-destructive" />
            <h2 className="font-medium text-2xl">
              Opss.. um erro inesperado aconteceu!
            </h2>
          </div>
          <a href="/">
            <Button type="button">Ir para o início</Button>
          </a>
        </Card>
      </body>
    </html>
  )
}
