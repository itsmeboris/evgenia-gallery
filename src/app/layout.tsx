import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Cormorant_Garamond } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Evgenia Portnov | Healing Through Art",
  description: "Discover the transformative power of art. Original paintings capturing hope, resilience, and the beauty of life's journey.",
  keywords: "art, healing, paintings, flowers, towns, birds, contemporary art, original artwork",
  authors: [{ name: "Evgenia Portnov" }],
  openGraph: {
    title: "Evgenia Portnov | Healing Through Art",
    description: "Original paintings that capture the journey of healing and hope",
    type: "website",
    locale: "en_US",
    siteName: "Evgenia Portnov Art Gallery",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={cn(inter.variable, cormorant.variable)}>
      <body className={cn(
        inter.className,
        "min-h-screen bg-gallery-white text-gray-900 antialiased"
      )}>
        {children}
      </body>
    </html>
  )
}
