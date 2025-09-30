"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Badge } from "@/components/badge"

interface Category {
  id: string
  name: string
}

interface CategoriesProps {
  categories: Category[]
}

export function Categories({ categories }: CategoriesProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  function handleSelectCategory(categoryId: string) {
    router.push(`/explore?categoryId=${categoryId}`)
  }

  function handleClearCategory() {
    router.push("/explore")
  }

  const selectedCategoryId = searchParams.get("categoryId")

  return (
    <div className="mt-10 flex flex-wrap items-center gap-3">
      <Badge
        className="cursor-pointer"
        selected={!selectedCategoryId}
        onClick={handleClearCategory}
      >
        Tudo
      </Badge>

      {categories.map((category) => {
        return (
          <Badge
            className="cursor-pointer"
            key={category.id}
            selected={category.id === selectedCategoryId}
            onClick={() => handleSelectCategory(category.id)}
          >
            {category.name}
          </Badge>
        )
      })}
    </div>
  )
}
