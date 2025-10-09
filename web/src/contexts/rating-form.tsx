"use client"

import { createContext, type ReactNode, useContext, useState } from "react"

interface RatingFormContextProps {
  isShowingRatingForm: boolean
  showRatingForm: () => void
  hideRatingForm: () => void
}

const RatingFormContext = createContext({} as RatingFormContextProps)

export function RatingFormProvider({ children }: { children: ReactNode }) {
  const [showRatingForm, setShowRatingForm] = useState(false)

  function handleShowRatingForm() {
    setShowRatingForm(true)
  }

  function hideRatingForm() {
    setShowRatingForm(false)
  }

  return (
    <RatingFormContext.Provider
      value={{
        isShowingRatingForm: showRatingForm,
        showRatingForm: handleShowRatingForm,
        hideRatingForm,
      }}
    >
      {children}
    </RatingFormContext.Provider>
  )
}

export function useRatingForm() {
  const context = useContext(RatingFormContext)

  if (context === undefined) {
    throw new Error("useRatingForm must be used within RatingFormProvider")
  }

  return context
}
