import type { Metadata } from "next"
import type { PropsWithChildren } from "react"
import { ThemeProvider } from "@/components/providers/ThemeProvider"
import { ThemeToggle } from "@/components/theme/ThemeToggle"
import "./globals.css"

export const metadata: Metadata = {
  title: "Senior Full-Stack Engineer",
  description: "Portfolio of a Senior Full-Stack Engineer.",
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <a className="skip-link" href="#main-content">
            Skip to main content
          </a>
          <header className="site-header">
            <a className="site-brand" href="#main-content">
              Portfolio
            </a>
            <ThemeToggle />
          </header>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
