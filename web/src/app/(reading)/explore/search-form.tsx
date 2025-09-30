"use client"

import { MagnifyingGlassIcon } from "@phosphor-icons/react/dist/ssr"
import { useRouter, useSearchParams } from "next/navigation"
import type { FormEvent } from "react"
import { Input } from "@/components/input"

export function SearchForm() {
  const router = useRouter()
  const searchParams = useSearchParams()

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData)

    const query = data.q

    if (!query) {
      return router.push("/explore")
    }

    router.push(`/explore?q=${query}`)
  }

  const query = searchParams.get("q")

  return (
    <form className="group relative w-full max-w-sm" onSubmit={handleSearch}>
      <Input
        name="q"
        className="w-full"
        placeholder="Buscar livro ou autor"
        defaultValue={query ?? ""}
      />

      <MagnifyingGlassIcon className="-translate-y-1/2 absolute top-1/2 right-5 size-5 select-none text-input group-has-[input:focus]:text-input-hover" />
    </form>
  )
}
