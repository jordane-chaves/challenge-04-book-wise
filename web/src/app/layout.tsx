import type { Metadata } from "next"
import { Nunito_Sans } from "next/font/google"
import "./globals.css"

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    template: "%s | BookWise",
    default: "BookWise",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html className={nunitoSans.variable} lang="pt">
      <body className="bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  )
}
