import type { MetadataRoute } from "next"

export function createRobots(siteOrigin?: string): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    ...(siteOrigin ? { sitemap: `${siteOrigin}/sitemap.xml` } : {}),
  }
}

export function createSitemap(siteOrigin?: string): MetadataRoute.Sitemap {
  return siteOrigin ? [{ url: siteOrigin }] : []
}
