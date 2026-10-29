import type { Profile } from "@/types"

interface PersonJsonLd {
  "@context": "https://schema.org"
  "@type": "Person"
  name: string
  jobTitle: string
  url?: string
  sameAs: string[]
}

export function createPersonJsonLd(
  profile: Profile,
  siteOrigin?: string,
): PersonJsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.headline,
    ...(siteOrigin ? { url: siteOrigin } : {}),
    sameAs: profile.contact.links
      .filter((link) => link.href.startsWith("https://"))
      .map((link) => link.href),
  }
}

export function serializeJsonLd(value: PersonJsonLd): string {
  return JSON.stringify(value).replace(/</g, "\\u003c")
}
