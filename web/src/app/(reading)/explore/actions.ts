"use server"

import { revalidateTag } from "next/cache"
import z from "zod"
import { rateBook } from "@/http/rate-book"
import { getTokenFromCookie } from "@/lib/sessions"

const rateBookSchema = z.object({
  description: z
    .string()
    .min(1, { error: "Preencha com sua avaliação" })
    .max(450),
  rating: z
    .string({ error: "Selecione uma nota" })
    .pipe(z.coerce.number())
    .pipe(z.number().min(0.5).max(5)),
})

export async function rateBookAction(
  bookId: string,
  _: unknown,
  formData: FormData,
) {
  const data = Object.fromEntries(formData)

  const parsedFormData = rateBookSchema.safeParse(data)

  if (!parsedFormData.success) {
    return {
      errors: z.flattenError(parsedFormData.error).fieldErrors,
    }
  }

  const accessToken = await getTokenFromCookie()

  if (!accessToken) {
    return { message: "Para avaliar um livro é necessário estar autenticado." }
  }

  const { description, rating } = parsedFormData.data

  await rateBook({
    accessToken,
    bookId,
    description,
    rating,
  })

  revalidateTag("rate-book")
}
