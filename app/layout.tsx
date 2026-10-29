import type { Metadata } from "next"
import type { PropsWithChildren } from "react"
import { ThemeProvider } from "@/components/providers/ThemeProvider"
import { SiteNavigation } from "@/components/portfolio/sections/SiteNavigation"
import { profile } from "@/data/profile"
import { createPersonJsonLd, serializeJsonLd } from "@/lib/seo/person-json-ld"
import { getSiteOrigin } from "@/lib/seo/site-origin"
import "./globals.css"

const siteOrigin = getSiteOrigin()
const title = `${profile.name} — ${profile.headline}`
const description = `${profile.name} is a ${profile.headline} based in ${profile.location}.`

export const metadata: Metadata = {
  title,
  description,
  robots: siteOrigin
    ? { index: true, follow: true }
    : {
        index: false,
        follow: false,
        googleBot: { index: false, follow: false },
      },
  ...(siteOrigin
    ? {
        metadataBase: new URL(siteOrigin),
        alternates: { canonical: "/" },
        openGraph: {
          type: "website",
          title,
          description,
          url: siteOrigin,
          images: [
            {
              url: `${siteOrigin}/og/portfolio.svg`,
              width: 1200,
              height: 630,
              alt: `Portfolio of ${profile.name}`,
            },
          ],
        },
        twitter: {
          card: "summary_large_image",
          title,
          description,
          images: [`${siteOrigin}/og/portfolio.svg`],
        },
      }
    : {}),
}

const personJsonLd = serializeJsonLd(createPersonJsonLd(profile, siteOrigin))

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <script
            type="application/ld+json"
            // biome-ignore lint/security/noDangerouslySetInnerHtml: serialized JSON-LD escapes '<' and has a dedicated injection-safety test.
            dangerouslySetInnerHTML={{ __html: personJsonLd }}
          />
          <a className="skip-link" href="#main-content">
            Skip to main content
          </a>
          <SiteNavigation name={profile.name} />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
